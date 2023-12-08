namespace BookShop.Model.Server
{
    public interface IUserReponsitory
    {
        Task<UserVM>GetUser(string UserID);
        Task<List<UserVM>> GetAllUser();
        Task DeleteUser(string UserID);
        Task UpdateUser(string UserID, UserModel user);
        Task<string> ValidationUser(string userID);
    }
}
