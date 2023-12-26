using BookShop.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BookShop.Model.Server
{
    public class UserReponsitory : IUserReponsitory
    {
        private readonly MyDBContext context;
        private UserManager<ApplicationUser> userManager;
        private readonly ClaimsPrincipal _user;
       

        public UserReponsitory(MyDBContext context,UserManager<ApplicationUser> userManager,IHttpContextAccessor httpContextAccessor)
        {
            this.context = context;
            this.userManager = userManager;
            _user = httpContextAccessor.HttpContext.User;
            
        }
       

        
    
        public async Task<UserVM> GetUser(string userID)
        {
           
            var user =await userManager.FindByIdAsync(userID);
            var role = await userManager.GetRolesAsync(user);
            if (user != null)
            {
                return new UserVM
                {
                    UserName = user.UserName,
                    Avatar = user.Avatar,
                    Phone = user.PhoneNumber,
                    Email = user.Email,
                    ID = user.Id,
                    Address = user.Address,
                    About = user.About,
                    Create_at = user.Create_at.ToString(),
                    Role = string.Concat(role)
                    
                };
            }
            return null;
           
        }
        public async Task<List<UserVM>> GetAllUser(string? search)
        {
            var user =context.Users.AsQueryable();
            if (!string.IsNullOrEmpty(search))
            {
                user = user.Where(us => us.UserName.Contains(search) || us.Email.Contains(search));
            }
            user = user.OrderBy(us => us.UserName).ThenBy(us => us.Email);

            return user.Select(user => new UserVM
            {
                UserName = user.UserName,
                Avatar = user.Avatar,
                Phone = user.PhoneNumber,
                Email = user.Email,
                ID = user.Id,
                Address = user.Address,
                About = user.About,
                Create_at = user.Create_at.ToString()

            }).ToList();
        }

        public async Task DeleteUser(string UserID)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == UserID);
            context.Remove(user);
            string[] imageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".svg", ".webp", ".ico" };
            if(!string.IsNullOrEmpty(user.Avatar))
            {
                var pathImageOld = Path.Combine(Directory.GetCurrentDirectory(), "Resources", user.Avatar);
                if (File.Exists(pathImageOld))
                {
                    File.Delete(pathImageOld);
                }
            }
            await context.SaveChangesAsync();
        }

        public async Task UpdateUser(string UserID, UserModel userModel)
        {
            var user = await userManager.FindByIdAsync(UserID);

            user.Address = userModel.Address;
            user.PhoneNumber = userModel.Phone;
            user.About = userModel.About;
            string[] imageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".svg", ".webp", ".ico" };
            
            if (userModel.Avatar!=null)
            {
                var extension = Path.GetExtension(userModel.Avatar.FileName);
                var nameImage = Path.GetFileNameWithoutExtension(userModel.Avatar.FileName);
                string timeStamp = DateTime.Now.ToString("dd-MM-yyyy-HH-mm-ss");
                if (imageExtensions.Contains(extension))
                {
                    if (!string.IsNullOrEmpty(user.Avatar))
                    {
                        var pathImageOld = Path.Combine(Directory.GetCurrentDirectory(), "Resources", user.Avatar);
                        if (File.Exists(pathImageOld))
                        {
                            File.Delete(pathImageOld);
                        }
                    }
                    string newNameImage = $"{UserID}_{nameImage}_{timeStamp}{extension}";
                    string PathImage = Path.Combine(Directory.GetCurrentDirectory(), "Resources", newNameImage);
                    using (var fileStream = new FileStream(PathImage, FileMode.Create))
                    {
                        await userModel.Avatar.CopyToAsync(fileStream);
                    }
                    user.Avatar = newNameImage;
                }
               
               
            }
            await userManager.UpdateAsync(user);
        }
        public async Task<string> ValidationUser(string userID)
        {
            var user = await context.Users.SingleOrDefaultAsync(user => user.Id == userID);
            if (user == null)
            {
                return "Khong co User nay";
            }
            return string.Empty;
        }
    }
}
