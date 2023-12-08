using BookShop.Model;
using BookShop.Model.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentReponsitory reponsitory;

        public CommentController(ICommentReponsitory comment) 
        {
            this.reponsitory = comment;
        }
        [HttpPost]
        public async Task<IActionResult> CreateComment(CommentModel commentModel)
        {
            try
            {
                var validation =await reponsitory.IsvalidComment(commentModel.BookId, commentModel.UserId,null);
                if(!string.IsNullOrEmpty(validation))
                {
                    return Ok(BaseResponse<string>.Error(validation, 400));
                }
                await reponsitory.Comment(commentModel);
                return Ok(BaseResponse<string>.Success("Thanh cong"));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("bookID/{BookID}")]
        public async Task<IActionResult> getCommentBook(int BookID)
        {
            try
            {
                var validation = await reponsitory.IsvalidComment(BookID,null, null);
                if (!string.IsNullOrEmpty(validation))
                {
                    return Ok(BaseResponse<string>.Error(validation, 400));
                }
                
                return Ok(BaseResponse<List<CommentVM>>.WithData(await reponsitory.GetCommentBook(BookID)));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{CommentID}")]
        public async Task<IActionResult> UpdateComment(int CommentID,UpdateComment commentModel)
        {
            try
            {
                var validation = await reponsitory.IsvalidComment(null, null, CommentID);
                if (!string.IsNullOrEmpty(validation))
                {
                    return Ok(BaseResponse<string>.Error(validation, 400));
                }
                await reponsitory.UpdateComment(CommentID, commentModel);
                return Ok(BaseResponse<string>.Success("Thanh cong"));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("replay")]
        public async Task<IActionResult> CreateAdminCommnet(ReplayModel replayModel)
        {
            try
            {
                var validation = await reponsitory.IsvalidComment(null, null, replayModel.CommentUserId);
                if (!string.IsNullOrEmpty(validation))
                {
                    return Ok(BaseResponse<string>.Error(validation, 400));
                }
                await reponsitory.ReplyAdmin(replayModel);
                return Ok(BaseResponse<string>.Success("Thanh cong"));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
