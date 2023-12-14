
using BookShop.Model;
using BookShop.Model.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Hosting.Server;

using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using Microsoft.Extensions.Options;
using BookShop.Validation;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly IShoppingReponsitory reponsitory;
        private static string s_wasmClientURL = string.Empty;
        private readonly IConfiguration configuration;
        private readonly ShoppingValidation validations;

        public ShoppingController(IShoppingReponsitory reponsitory, IConfiguration configuration,ShoppingValidation validations)
        {
            this.reponsitory = reponsitory;
            this.configuration = configuration;
            this.validations = validations;
        }
        [HttpPost("Buy")]
        public async Task<IActionResult> Buy(ShoppingModel shopping, IServiceProvider sp)
        {
            try
            {
                var resultValidion = validations.Validate(shopping);
                if (!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(BaseResponse<Dictionary<string, string>>.Error(response, 400));

                }
                var validationBook = await reponsitory.ValidationShopping(shopping.Books);
                if (!string.IsNullOrEmpty(validationBook))
                {
                    return Ok(BaseResponse<string>.Error(validationBook, 400));
                }
                var validationUser = await reponsitory.ValidationUser(shopping.UserID);
                if (!string.IsNullOrEmpty(validationUser))
                {
                    return Ok(BaseResponse<string>.Error(validationUser, 400));
                }
                var referer = Request.Headers.Referer;
                s_wasmClientURL = referer[0];
                var server = sp.GetRequiredService<IServer>();

                var serverAddressesFeature = server.Features.Get<IServerAddressesFeature>();

                string? thisApiUrl = null;

                if (serverAddressesFeature is not null)
                {
                    thisApiUrl = serverAddressesFeature.Addresses.FirstOrDefault();
                }

                if (thisApiUrl is not null)
                {
                    var sessionId = await reponsitory.CheckOut(shopping.Books, thisApiUrl, s_wasmClientURL);
                    var pubKey = configuration["Stripe:PubKey"];
                    var sessionService = new SessionService();
                    var options = new SessionGetOptions
                    {
                        Expand = new List<string> { "line_items.data.price.product" }

                    };
                    Session session = sessionService.Get(sessionId, options);
                    await reponsitory.CheckoutSuccess(shopping, session);
                    var checkoutOrderResponse = new CheckoutOrderResponse()
                    {
                        SessionId = sessionId,
                        PubKey = pubKey
                    };

                    return Ok(BaseResponse<CheckoutOrderResponse>.WithData(checkoutOrderResponse));
                }
                else
                {
                    return StatusCode(500);
                }
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("success")]
        public async Task<IActionResult> CheckoutSuccess(string sessionId)
        {
            try
            {


                return Redirect(s_wasmClientURL + "success");
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("BuyOffline")]
        public async Task<IActionResult> Buy(ShoppingModel shopping)
        {
            try
            {
                var resultValidion = validations.Validate(shopping);
                if (!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(BaseResponse<Dictionary<string, string>>.Error(response, 400));

                }
                var validationUser = await reponsitory.ValidationUser(shopping.UserID);
                if (!string.IsNullOrEmpty(validationUser))
                {
                    return Ok(BaseResponse<string>.Error(validationUser, 400));
                }
                var validationShopping = await reponsitory.ValidationShopping(shopping.Books);
                if (!string.IsNullOrEmpty(validationShopping))
                {
                    return Ok(BaseResponse<string>.Error(validationShopping, 400));
                }
                return Ok(BaseResponse<string>.Success(await reponsitory.Buy(shopping)));
            }
            catch
            {
                return BadRequest();
            }
        }



    }
}
