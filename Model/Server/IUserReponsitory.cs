namespace BookShop.Model.Server
{
    public interface IUserReponsitory
    {
        Task<UserVM>GetUser(string userID);
        Task<List<UserVM>> GetAllUser(string? search);
        Task DeleteUser(string UserID);
        Task UpdateUser(string UserID, UserModel user);
        Task<string> ValidationUser(string userID);
    }
}
