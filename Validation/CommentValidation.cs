using BookShop.Model;
using FluentValidation;

namespace BookShop.Validation
{
    public class CommentValidation:AbstractValidator<CommentModel>
    {
        public CommentValidation() 
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage("vui long nhap");
            RuleFor(x => x.BookId).NotEmpty().WithMessage("vui long nhap");
            RuleFor(x => x.Comment).NotEmpty().WithMessage("vui long nhap");
            RuleFor(x => x.Star).NotNull().WithMessage("vui long nhap")
                .InclusiveBetween(1, 5).WithMessage("nhap tu 1 den 5");
        }
    }
}
