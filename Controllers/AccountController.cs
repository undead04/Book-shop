using BookShop.Model;
using BookShop.Model.Reponsitory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountReponsitory reponsitory;

        public AccountController(IAccountReponsitory reponsitory) 
        {
            this.reponsitory = reponsitory;
        }
        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpModel model)
        {
            try
            {
                var result = await reponsitory.SignUpAysc(model);
                if (result.Succeeded)
                {
                    return Ok(result.Succeeded); // Use the Ok() method instead of Ok property
                }
                return Ok(result.Errors);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInModel signInModel)
        {
            try
            {
                var result=await reponsitory.SignInAsync(signInModel);
                if(result == null)
                {
                    return Ok(BaseResponse<string>.Error("Mat khau hoac email bi sai", 400));
                }
                return Ok(BaseResponse<UserSignInVM>.WithData(result));

            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
