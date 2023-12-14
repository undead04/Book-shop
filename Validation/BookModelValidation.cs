using BookShop.Data;
using BookShop.Model;
using FluentValidation;

namespace BookShop.Validation
{
    public class BookModelValidation:AbstractValidator<BookVMvalidation>
    {
        private readonly MyDBContext _context;

        public BookModelValidation(MyDBContext context) 
        {
            _context = context;
            RuleFor(x => x.Name).NotEmpty().WithMessage("Khong dc trong")
                 .Custom((name, context) =>
                 {
                     var model = (BookVMvalidation)context.InstanceToValidate;

                     if (!IsNameUnchanged(model) && !IsNameUneque(name))
                     {
                         context.AddFailure("Ten bi trung");
                     }
                 });

            RuleFor(x => x.Publisher).NotEmpty().WithMessage("khong dc trong");
            RuleFor(x=>x.Supplier).NotEmpty().WithMessage("khong dc trong");
            RuleFor(x => x.Author).NotEmpty().WithMessage("khong dc trong");
            RuleFor(x => x.NewPrice).NotEmpty().WithMessage("khong dc trong")
                .InclusiveBetween(0, double.MaxValue).WithMessage("Lon hon 0")
                .Must(IsNumber).WithMessage("Phải là số");
            RuleFor(x => x.OldPrice).NotEmpty().WithMessage("khong dc trong")
                .InclusiveBetween(0, double.MaxValue).WithMessage("Lon hon 0")
                .Must(IsNumber).WithMessage("Phải là số");
            RuleFor(x=>x.Quantity).NotEmpty().WithMessage("khong dc trong")
                 .InclusiveBetween(0, int.MaxValue).WithMessage("Lon hon 0")
                .Must(IsNumber).WithMessage("Phải là số");
            RuleFor(x => x.CategoryID).NotNull().WithMessage("khong dc trong");
            RuleFor(x => x.Description).NotEmpty().WithMessage("Khong dc trong");


        }
        
        private bool IsNumber<T>(T number)
        {
            return double.TryParse(number.ToString(), out _);
        }
        private bool IsNameUnchanged(BookVMvalidation bookModel)
        {
            var book = _context.books.FirstOrDefault(bo => bo.ID == bookModel.id);
            
           if(book!=null)
            {
                return book.Name == bookModel.Name;
            }
            return false;
        }
        private bool IsNameUneque(string name)
        {
            var book = _context.books.Select(x => x.Name).ToList().Contains(name);
            return !book;
        }
    }
}
