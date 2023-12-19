using System.ComponentModel.DataAnnotations;

namespace BookShop.Model
{
    public class CommentModel
    {
        public int BookId { get; set; }
        public string UserId { get; set; } = string.Empty;

        public string Comment { get; set; } = string.Empty;
        [Range(0, 5)]
        public int Star { get; set; }




    }
    public class CommentVM
    {
        public string UserID { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public int Star { get; set; }
        public string CreateAt { get; set; } = string.Empty;

        public string UserNameAdmin { get; set; } = string.Empty;
        public string replay { get; set; } = string.Empty;


    }
    
    public class ReplayModel
    {
        public string UserID { get; set; } = string.Empty;
        public int BookID { get; set; }
      
        public string AdminID { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
    }
}
