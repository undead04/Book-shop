
using BookShop.Model;
using BookShop.Model.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Hosting.Server;

using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly IShoppingReponsitory  reponsitory;
        private static string s_wasmClientURL = string.Empty;
        private readonly IConfiguration configuration;

        public ShoppingController(IShoppingReponsitory reponsitory, IConfiguration configuration) 
        {
            this.reponsitory=reponsitory;
            this.configuration = configuration;
        }
        [HttpPost("Buy")]
        public async Task<IActionResult>Buy(List<ShoppingBook> book, IServiceProvider sp)
        {
            try
            {
                var validationBook = await reponsitory.ValidationShopping(book);
                if(!string.IsNullOrEmpty(validationBook))
                {
                    return Ok(BaseResponse<string>.Error(validationBook,400));
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
                    var sessionId = await reponsitory.CheckOut(book, thisApiUrl, s_wasmClientURL);
                    var pubKey = configuration["Stripe:PubKey"];

                    var checkoutOrderResponse = new CheckoutOrderResponse()
                    {
                        SessionId = sessionId,
                        PubKey = pubKey
                    };

                    return Ok(BaseResponse<CheckoutOrderResponse>.WithData(checkoutOrderResponse));
                }
                else
                {
                    return  StatusCode(500);
                }
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("success")]
        public async Task<IActionResult> CheckoutSuccess(ShoppingModel bookModel, string sessionId)
        {
            try
            {
                var user =await reponsitory.ValidationUser(bookModel.UserID);
                if(!string.IsNullOrEmpty(user))
                {
                    return Ok(BaseResponse<string>.Error(user, 400));
                }
                var sessionService = new SessionService();
                var options = new SessionGetOptions
                {
                    Expand = new List<string> { "line_items.data.price.product" }

                };
                Session session = sessionService.Get(sessionId,options);
                var order = await reponsitory.CheckoutSuccess(bookModel, session);
                return Ok(BaseResponse<string>.Success(order));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("BuyOffline")]
        public async Task<IActionResult> Buy(ShoppingOflineModel shopping)
        {
            try
            {
                var validationUser =await reponsitory.ValidationUser(shopping.UserID);
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
