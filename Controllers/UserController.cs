using BookShop.Model;
using BookShop.Model.Server;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserReponsitory reponsitory;

        public UserController(IUserReponsitory reponsitory) 
        {
            this.reponsitory = reponsitory;
        }
        [HttpGet("{UserID}")]
        [Authorize]
        public async Task<IActionResult> GetUser(string UserID)
        {
            try
            {
                var user = await reponsitory.GetUser(UserID);
                if (user == null)
                {
                    return Ok(BaseResponse<string>.Error("Khong tim thay", 404));
                }
                return Ok(BaseResponse<UserVM>.WithData(user));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("All")]
        [Authorize(Roles = AppRole.Admin)]
        public async Task<IActionResult> GetAllUser(string?search,int take=25,int page=1)
        {
            try
            {
                var user = await reponsitory.GetAllUser(search);
                int totalPage = (int)Math.Ceiling((double)user.Count / take);
                user=user.Skip((page-1)*take).Take(take).ToList();
                return Ok(BaseResponse<PageUserVM>.WithData(new PageUserVM
                {
                    User=user,
                    TotalPage=totalPage,
                }));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var validation =await reponsitory.ValidationUser(id);
                if (!string.IsNullOrEmpty(validation))
                {
                    return Ok(BaseResponse<string>.Error(validation, 400));

                }
               await reponsitory.DeleteUser(id);
                return Ok(BaseResponse<string>.Success("Thanh cong"));

                
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(string id,[FromForm]UserModel user)
        {
            try
            {
                var validation = await reponsitory.ValidationUser(id);
                if (!string.IsNullOrEmpty(validation))
                {
                    return Ok(BaseResponse<string>.Error(validation, 400));

                }
                await reponsitory.UpdateUser(id,user);
                return Ok(BaseResponse<string>.Success("Thanh cong"));


            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
