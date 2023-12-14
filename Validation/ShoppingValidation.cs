using BookShop.Model;
using FluentValidation;

namespace BookShop.Validation
{
    public class ShoppingValidation:AbstractValidator<ShoppingModel>
    {
        public ShoppingValidation() 
        {
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Vui long nhập");
            RuleFor(user => user.Phone).Matches(@"^[0-9]*$").WithMessage("Số điện thoại không hợp lệ.");
            RuleFor(x => x.Address).NotEmpty().WithMessage("vui long nhập");
        }
    }
}
