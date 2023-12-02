using BookShop.Model;
using BookShop.Model.Server;
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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            try
            {
                var user = await reponsitory.GetUser(id);
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
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            try
            {
               
                return Ok(BaseResponse<List<UserVM>>.WithData(await reponsitory.GetAllUser()));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
