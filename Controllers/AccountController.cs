using BookShop.Model;
using BookShop.Model.Reponsitory;
using BookShop.Model.Server;
using BookShop.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountReponsitory reponsitory;
        private readonly SignUpModelValidation validations;

        public AccountController(IAccountReponsitory reponsitory, SignUpModelValidation validations) 
        {
            this.reponsitory = reponsitory;
            this.validations = validations;
        }
        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpModel model)
        {
            try
            {
                var resultValidion = validations.Validate(model);
                if (!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(BaseResponse<Dictionary<string, string>>.Error(response, 400));

                }
                var result = await reponsitory.SignUpAysc(model);
                if (result.Succeeded)
                {
                    return Ok(BaseResponse<string>.Success("tao thanh cong"));
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
