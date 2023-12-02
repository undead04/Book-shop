using BookShop.Model;
using BookShop.Model.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly IShoppingReponsitory  reponsitory;

        public ShoppingController(IShoppingReponsitory reponsitory) 
        {
            this.reponsitory=reponsitory;
        }
        [HttpPost("Buy")]
        public async Task<IActionResult>Buy(ShoppingModel shopping)
        {
            try
            {
                var error=await reponsitory.ValidationShopping(shopping);
                if (!string.IsNullOrEmpty(error))
                {
                    return Ok(BaseResponse<string>.Error(error,400));
                }
                var buy=await reponsitory.Buy(shopping);
                return Ok(BaseResponse<string>.Success(buy));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}
