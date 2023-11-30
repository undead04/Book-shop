using BookShop.Model;
using BookShop.Model.Reponsitory;
using BookShop.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookReponsitory _reponsitory;
        private readonly BookModelValidation _validation;

        public BookController(IBookReponsitory reponsitory,BookModelValidation validation) 
        {
            _reponsitory = reponsitory;
            _validation = validation;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] BookModel bookModel)
        {
            try
            {
                var resultValidion = _validation.Validate(bookModel);
                if(!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new {e.PropertyName,e.ErrorMessage}).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(response);
                   
                }
                return Ok(await _reponsitory.Create(bookModel));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _reponsitory.getAll());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(int id)
        {
            try
            {
                var book=await _reponsitory.getById(id);
                if (book == null)
                {
                    return NotFound();
                }
                return Ok(book);
            }
            catch
            {
                return BadRequest();
            }
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var book = await _reponsitory.Delete(id);
                if(book == null)
                {
                    return NotFound();
                }
                return Ok(book);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,[FromForm]BookModel bookModel)
        {
            try
            {

                var resultValidion = _validation.Validate(bookModel);
                if (!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(response);

                }
                var book = await _reponsitory.Update(id, bookModel);
                if (book == null)
                {
                    return NotFound();
                }
                return Ok(book);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
