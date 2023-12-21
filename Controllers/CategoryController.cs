﻿using BookShop.Model.Reponsitory;
using BookShop.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Azure.Core;
using BookShop.Validation;
using FluentValidation.Internal;
using FluentValidation;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize(Roles = AppRole.Admin)]
        public async Task<IActionResult> Create(CategoryModel categoryModel)
        {
            try
            {
                var createCategory = new CategoryVM
                {
                    ID=0,
                    Name=categoryModel.Name
                };
                var resultValidion = _validation.Validate(createCategory);
                if (!resultValidion.IsValid)
                {
                    var errors = resultValidion.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(BaseResponse<Dictionary<string,string>>.Error(response,400));

                }

                return Ok(BaseResponse<string>.Success(await _reponsitory.Create(categoryModel)));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(string? name, int page = 1, int take = 25)
        {
            try
            {
                var category = await _reponsitory.GetAll(name);
                int totalPage=(int)Math.Ceiling((double)category.Count/take);
                category = category.Skip((page - 1) * take).Take(take).ToList();
                return Ok(BaseResponse<FilterCategory>.WithData(new FilterCategory
                {
                    Categorys=category,
                    TotalPage=totalPage
                }));
               
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
                    return Ok(BaseResponse<string>.Error("Khong tim thay",404));
                }
                return Ok(BaseResponse<CategoryVM>.WithData(await _reponsitory.GetById(id)));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = AppRole.Admin)]
        public async Task<IActionResult> Update(int id, CategoryModel categoryModel)
        {
            try
            {

                var updateCategory = new CategoryVM
                {
                    ID = id,
                    Name = categoryModel.Name
                };
                
                var resultValidation = _validation.Validate(updateCategory);
                if (!resultValidation.IsValid)
                {
                    var errors = resultValidation.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToList();
                    var response = errors
                    .ToDictionary(x => $"{x.PropertyName}", x => x.ErrorMessage);

                    return Ok(BaseResponse<Dictionary<string, string>>.Error(response, 400));

                }
                var book = await _reponsitory.Update(id,categoryModel);
                if(book==null)
                {
                    return Ok(BaseResponse<string>.Error("khong tim thay",404));
                }
                return Ok(BaseResponse<string>.Success(book));
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
                if (book == null)
                {
                    return Ok(BaseResponse<string>.Error("khong tim thay", 404));
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
