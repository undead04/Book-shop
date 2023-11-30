using BookShop.Data;
using BookShop.Model;
using FluentValidation;

namespace BookShop.Validation
{
    public class BookModelValidation:AbstractValidator<BookModel>
    {
        private readonly MyDBContext _context;

        public BookModelValidation(MyDBContext context) 
        {
            _context = context;
            RuleFor(x => x.Name).NotEmpty().WithMessage("Khong dc trong");
               
            RuleFor(x => x.Publisher).NotEmpty().WithMessage("khong dc trong");
            RuleFor(x=>x.Supplier).NotEmpty().WithMessage("khong dc trong");
            RuleFor(x => x.Author).NotEmpty().WithMessage("khong dc trong");
            RuleFor(x => x.NewPrice).NotEmpty().WithMessage("khong dc trong")
                .InclusiveBetween(0, double.MaxValue)
                .Must(IsNumber).WithMessage("Phải là số");
            RuleFor(x => x.OldPrice).NotEmpty().WithMessage("khong dc trong")
                .InclusiveBetween(0, double.MaxValue)
                .Must(IsNumber).WithMessage("Phải là số");
            RuleFor(x=>x.Quantity).NotEmpty().WithMessage("khong dc trong")
                 .InclusiveBetween(0, int.MaxValue)
                .Must(IsNumber).WithMessage("Phải là số");
            RuleFor(x => x.CategoryID).NotNull().WithMessage("khong dc trong");


        }
        
        private bool IsNumber<T>(T number)
        {
            return double.TryParse(number.ToString(), out _);
        }
    }
}
