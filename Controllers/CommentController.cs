using BookShop.Model;
using BookShop.Model.Server;
using BookShop.Validation;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentReponsitory reponsitory;
        private CommentValidation validations;

        public CommentController(ICommentReponsitory comment,CommentValidation validations) 
        {
            this.reponsitory = comment;
            this.validations = validations;
        }
        [HttpPost]
        public async Task<IActionResult> CreateComment(CommentModel commentModel)
        {
            try
            {
                var resultValidion = validations.Validate(commentModel);
                if (!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(BaseResponse<Dictionary<string, string>>.Error(response, 400));

                }
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
