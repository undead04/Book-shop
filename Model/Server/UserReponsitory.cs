using BookShop.Data;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Model.Server
{
    public class UserReponsitory : IUserReponsitory
    {
        private readonly MyDBContext context;

        public UserReponsitory(MyDBContext context)
        {
            this.context = context;
        }
        public async Task<UserVM> GetUser(string UserID)
        {
            var user=await context.Users.SingleOrDefaultAsync(x=>x.Id==UserID);
            if(user != null)
            {
                return new UserVM
                {
                    UserName = user.UserName,
                    Avatar = user.Avatar,
                    Phone = user.PhoneNumber,
                    Email = user.Email,
                    ID = user.Id,
                    Password=user.PasswordHash
                    
                };
            }
            return null;
           
        }
        public async Task<List<UserVM>> GetAllUser()
        {
            return await context.Users.Select(user => new UserVM
            {
                UserName = user.UserName,
                Avatar = user.Avatar,
                Phone = user.PhoneNumber,
                Email = user.Email,
                ID=user.Id,
                Password = user.PasswordHash
            }).ToListAsync();
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
           var user = await context.Users.FirstOrDefaultAsync(x => x.Id == UserID);
            
            user.UserName = userModel.UserName;
            user.Email = userModel.Email;
            user.PhoneNumber = userModel.Phone;
            string[] imageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".svg", ".webp", ".ico" };
            
            if (userModel.Avatar.Length>0)
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
                await context.SaveChangesAsync();
            }
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
