using BookShop.Data;
using BookShop.Migrations;
using BookShop.Model;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace BookShop.Validation
{
    public class SignUpModelValidation:AbstractValidator<SignUpModel>
    {
        private readonly MyDBContext context;

        public SignUpModelValidation(MyDBContext context)
        {
            this.context = context;

            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("khong dc trong")
                .Must(IsUniqueName)
                .WithMessage("Tên người dùng đã tồn tại");
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("khong dc trong")
                .EmailAddress().WithMessage("Day ko phải la email")
                .Must(IsUniqueEmail)
                .WithMessage(" Email đã tồn tại");
            RuleFor(x => x.Password).Cascade(CascadeMode.Stop).NotEmpty().WithMessage("Khong dc trong")
                .Must(CheckLengthPasswor).WithMessage("phai co du 8 ki tu tro len")
                .Must(CheckUpperPasswor).WithMessage("phai co it nhat 1 ki tu viet hoa")
                .Must(CheckLowerPasswor).WithMessage("phai co ki tu tu a-z")
                .Must(CheckDigitPasswor).WithMessage("phai co it nhat 1 ki tu la so")
                .Must(CheckSpecialPasswor).WithMessage("phai co it nhat 1 ki tu dac biet")
                .Custom((Password, context) =>
                {
                    var model = (SignUpModel)context.InstanceToValidate;
                    if (!CheckPasswordComform(model))
                    {
                        context.AddFailure("PasswordComfrom ko dung");
                    }

                });
           
            
        }

        private bool IsUniqueName(string name)
        {
            return !context.Users.Select(x => x.UserName).Contains(name);
           
        }
        private bool CheckPasswordComform(SignUpModel model)
        {
            return model.Password == model.ComformPassword;
        }
        private bool IsUniqueEmail(string email)
        {
            return !context.Users.Select(x => x.Email).Contains(email);
           
        }
        private bool CheckUpperPasswor(string password)
        {
            foreach (char c in password)
            {
                if (char.IsUpper(c))
                {
                    return true;
                }
            }
            return false;
        }
        private bool CheckLengthPasswor(string password)
        {
            
            return password.Length>=8?true:false;
        }
        private bool CheckLowerPasswor(string password)
        {
            foreach (char c in password)
            {
                if (char.IsLower(c))
                {
                    return true;
                }
            }
            return false;
        }
        private bool CheckDigitPasswor(string password)
        {
            foreach (char c in password)
            {
                if (char.IsDigit(c))
                {
                    return true;
                }
            }
            return false;
        }
        private bool CheckSpecialPasswor(string password)
        {
            foreach (char c in password)
            {
                if (!char.IsLetterOrDigit(c))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
