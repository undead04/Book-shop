using System.ComponentModel.DataAnnotations;

namespace BookShop.Model
{
    public class SignInModel
    {
        [Required,EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required,MinLength(8)]
        public string Password { get; set; }=string.Empty;

    }
    public class SignUpModel
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required,EmailAddress]
        public string Email { get; set; }=string.Empty;
        [Required, MinLength(8)]
        public string Password { get; set; } = string.Empty;
        [Required, MinLength(8)]
        public string ComformPassword { get; set; } = string.Empty;
         
    }
    public class UserSignInVM
    {
        public string UserID { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public  IList<string>? Role { get; set; }
        public string Token { get; set; } = string.Empty;   
    }
}
