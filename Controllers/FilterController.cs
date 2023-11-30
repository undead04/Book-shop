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
                return Ok(new {Book= book,TotalBook= totalPage });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
