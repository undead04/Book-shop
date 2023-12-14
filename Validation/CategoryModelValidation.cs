using BookShop.Data;
using BookShop.Model;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Validation
{
    public class CategoryModelValidation:AbstractValidator<CategoryVM>
    {
        private readonly MyDBContext _context;
       
        public CategoryModelValidation(MyDBContext context) 
        {
            _context = context;
            RuleFor(x => x.Name).NotEmpty().WithMessage("khong dc trung")
                .Custom((name,context) =>
                {
                    var model = (CategoryVM)context.InstanceToValidate;

                    if (!IsNameUnchanged(model) && !IsNameUneque(name))
                    {
                        context.AddFailure("Ten bi trung");
                    }
                });




        }
        private bool IsNameUnchanged(CategoryVM categoryModel)
        {
            var category = _context.categories.FirstOrDefault(bo => bo.ID == categoryModel.ID);
            if(category!=null) {
                return category.Name == categoryModel.Name;
            }
            return false;
            
        }
        private bool IsNameUneque(string name)
        {
            var category = _context.categories.Select(x => x.Name).ToList().Contains(name);
            return !category;
        }


    }
}
