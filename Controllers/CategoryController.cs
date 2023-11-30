using BookShop.Model.Reponsitory;
using BookShop.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Azure.Core;
using BookShop.Validation;
using FluentValidation.Internal;
using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryReponsitory _reponsitory;
        private readonly CategoryModelValidation _validation;

        public CategoryController(ICategoryReponsitory reponsitory, CategoryModelValidation validations)
        {
            _reponsitory = reponsitory;
            _validation = validations;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CategoryModel categoryModel)
        {
            try
            {
                var resultValidion = _validation.Validate(categoryModel);
                if (!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(response);

                }

                return Ok(await _reponsitory.Create(categoryModel));
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
                return Ok(await _reponsitory.GetAll());
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
                var book = await _reponsitory.GetById(id);
                if(book==null)
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
        public async Task<IActionResult> Update(int id, CategoryModel categoryModel)
        {
            try
            {


                var resultValidation = _validation.Validate(categoryModel);
                if (!resultValidation.IsValid)
                {
                    var errors = resultValidation.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return BadRequest(response);

                }
                var book = await _reponsitory.Update(id,categoryModel);
                if(book==null)
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
