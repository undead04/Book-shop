using BookShop.Data;
using BookShop.Model;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Validation
{
    public class CategoryModelValidation:AbstractValidator<CategoryModel>
    {
        private readonly MyDBContext _context;
       
        public CategoryModelValidation(MyDBContext context) 
        {
            _context = context;
            RuleFor(x => x.Name).NotEmpty().WithMessage("khong dc trong");
              
                

        }
        
        
    }
}
