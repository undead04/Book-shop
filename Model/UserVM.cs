namespace BookShop.Model
{
    public class UserVM
    {
        public string UserName { get; set; } = string.Empty;
        public string Address { get; set; }=string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string ID { get; set; } = string.Empty;
        public string About { get; set; } = string.Empty;
        public string Create_at { get; set; } = string.Empty;   
    }
    public class PageUserVM
    {
        public List<UserVM>? User { get; set; }
        public int TotalPage { get; set; }
    }
    public class UserModel
    {
        public string Address { get; set; } = string.Empty;
        public IFormFile? Avatar { get; set; }
        public string Phone { get; set; } = string.Empty;
        public string About { get; set; } = string.Empty;
    }
}
