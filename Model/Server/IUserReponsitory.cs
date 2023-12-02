namespace BookShop.Model.Server
{
    public interface IUserReponsitory
    {
        Task<UserVM>GetUser(string UserID);
        Task<List<UserVM>> GetAllUser();
    }
}
