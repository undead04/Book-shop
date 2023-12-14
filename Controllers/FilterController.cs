using BookShop.Model;
using BookShop.Model.Reponsitory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly IFilterReponsitory _reponsitory;

        public FilterController(IFilterReponsitory reponsitory) 
        {
            _reponsitory = reponsitory;
        }
        [HttpGet]
        public IActionResult FilterBook(string search,
      string? categoryId, int? from, int? to, string? sortby, int page = 1, int take = 25)
        {
            try
            {
                var book=_reponsitory.GetFilter(search,categoryId,from,to,sortby);
                double totalPage=Math.Ceiling((double)book.Count/take);
                book = book.Skip((page - 1) * take).Take(take).ToList();
                return Ok(BaseResponse<FilterBookVM>.WithData(new FilterBookVM { Book = book, TotalPage = totalPage }));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("Comment/{BookID}/{Star}")]
        public async Task<IActionResult> FilterComment(int BookID,int Star)
        {
            try
            {
                var comments = await _reponsitory.GetFilterComment(BookID,Star);
                
                return Ok(BaseResponse<List<CommentVM>>.WithData(comments));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("Benefit/{Year}")]
        public async Task<IActionResult> FilterComment(int Year)
        {
            try
            {
                var benefit = await _reponsitory.GetFilterBenefit(Year);

                return Ok(BaseResponse<List<FilterBenefit>>.WithData(benefit));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
