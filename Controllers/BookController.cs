using BookShop.Model;
using BookShop.Model.Reponsitory;
using BookShop.Validation;
using Microsoft.AspNetCore.Authorization;
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
        [HttpPost,Authorize(Roles =AppRole.Admin)]
        public async Task<IActionResult> Create([FromForm] BookModel bookModel)
        {
            try
            {
                var CreateBook = new BookVMvalidation
                {
                    id=0,
                    Name = bookModel.Name,
                    Supplier = bookModel.Supplier,
                    Publisher = bookModel.Publisher,
                    OldPrice = bookModel.OldPrice,
                    NewPrice = bookModel.NewPrice,
                    CategoryID = bookModel.CategoryID,
                    Quantity = bookModel.Quantity,
                    Author = bookModel.Author,
                    Image = bookModel.Image,
                    SecondaryImage = bookModel.SecondaryImage,
                    Description = bookModel.Description,
                   
                    Create=bookModel.Create,
                };
                var resultValidion = _validation.Validate(CreateBook);
                if(!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new {e.PropertyName,e.ErrorMessage}).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(BaseResponse<Dictionary<string,string>>.Error(response,400));
                   
                }
                return Ok( BaseResponse<string>.Success(await _reponsitory.Create(bookModel)));
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
                return Ok(BaseResponse<List<BookVM>>.WithData(await _reponsitory.getAll()));
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
                    return Ok(BaseResponse<string>.Error("khong tim thay",404));
                }
                return Ok(BaseResponse<BookVM>.WithData(book));
            }
            catch
            {
                return BadRequest();
            }
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = AppRole.Admin)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var book = await _reponsitory.Delete(id);
                if(book == null)
                {
                    return Ok(BaseResponse<string>.Error("khong tim thay", 404));
                }
                return Ok(BaseResponse<string>.Success("Xóa thành công"));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = AppRole.Admin)]
        public async Task<IActionResult> Update(int id,[FromForm]BookModel bookModel)
        {
            try
            {
                var updateBook = new BookVMvalidation
                {
                    id=id,
                    Name = bookModel.Name,
                    Supplier = bookModel.Supplier,
                    Publisher = bookModel.Publisher,
                    OldPrice = bookModel.OldPrice,
                    NewPrice = bookModel.NewPrice,
                    CategoryID = bookModel.CategoryID,
                    Quantity = bookModel.Quantity,
                    Author = bookModel.Author,
                    Image = bookModel.Image,
                    SecondaryImage = bookModel.SecondaryImage,
                    Description = bookModel.Description,
                    
                    Create = bookModel.Create,
                };
                var resultValidion = _validation.Validate(updateBook);
                if (!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(BaseResponse<Dictionary<string, string>>.Error(response, 400));
                }
                var book = await _reponsitory.Update(id, bookModel);
                if (book == null)
                {
                    return Ok(BaseResponse<string>.Error("Khong tìm thấy cuốn sách này", 404));
                }
                return Ok(BaseResponse<string>.Success(book));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
