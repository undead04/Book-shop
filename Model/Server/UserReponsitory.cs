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
                    ID = user.Id
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
                ID=user.Id
            }).ToListAsync();
        }
    }
}
