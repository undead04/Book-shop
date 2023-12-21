using BookShop.Model;
using BookShop.Model.Server;
using BookShop.Validation;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
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
                var validation =await reponsitory.IsvalidComment(commentModel.BookId, commentModel.UserId);
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
                var validation = await reponsitory.IsvalidComment(BookID,null);
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
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateComment( CommentModel commentModel)
        {
            try
            {

               
                var validation = await reponsitory.IsvalidComment(commentModel.BookId,commentModel.UserId);
                if (!string.IsNullOrEmpty(validation))
                {
                    return Ok(BaseResponse<string>.Error(validation, 400));
                }
                await reponsitory.UpdateComment( commentModel);
                return Ok(BaseResponse<string>.Success("Thanh cong"));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("replay")]
        [Authorize(Roles = AppRole.Admin)]
        public async Task<IActionResult> CreateAdminCommnet(ReplayModel replayModel)
        {
            try
            {
                var validation = await reponsitory.IsvalidComment(null, null);
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
