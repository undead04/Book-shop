using Microsoft.AspNetCore.Identity;

namespace BookShop.Model.Reponsitory
{
    public interface IAccountReponsitory
    {
        public Task<IdentityResult> SignUpAysc(SignUpModel model);
        public Task<string> CreateToken(SignInModel model);
        public Task<UserSignInVM> SignInAsync(SignInModel model);
        
    }
}
