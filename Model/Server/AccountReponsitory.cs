using BookShop.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookShop.Model.Reponsitory
{
    public class AccountReponsitory : IAccountReponsitory
    {
        private readonly UserManager<ApplicationUser> userManger;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;

        public AccountReponsitory(UserManager<ApplicationUser>userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration,RoleManager<IdentityRole> roleManager)
        { 
            this.userManger=userManager;
            this.signInManager=signInManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
        }
        public async Task<string> CreateToken(SignInModel model)
        {
            var user = await userManger.FindByEmailAsync(model.Email);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,model.Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())

            };
            var userRoles = await userManger.GetRolesAsync(user);
            foreach(var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }
            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(50),
                claims:authClaims,
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<IdentityResult> SignUpAysc(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                Create_at=DateTime.Now,

            };
            var result= await userManger.CreateAsync(user, model.Password);
            if(result.Succeeded)
            {
                if(! await roleManager.RoleExistsAsync(AppRole.Customer))
                {
                    await roleManager.CreateAsync(new IdentityRole(AppRole.Customer));
                }
                await userManger.AddToRoleAsync(user, AppRole.Customer);
            }
            return result;

        }
       

        public async Task<UserSignInVM> SignInAsync(SignInModel model)
        {
            var user = await userManger.FindByEmailAsync(model.Email);
            var passwordValid = await userManger.CheckPasswordAsync(user, model.Password);
          

            if (user == null || !passwordValid)
            {
                return null;
            }
            var userRoles = await userManger.GetRolesAsync(user);
            return new UserSignInVM
            {
                UserID = user.Id,
                UserName = user.UserName,
                Role = userRoles,
                Token=await CreateToken(model)
            };
        }
       
    }
}
