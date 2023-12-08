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
        public string UserName { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public int ID { get; set; }

        public int Star { get; set; }
        public string replay { get; set; } = string.Empty;


    }
    public class UpdateComment
    {
       

        public string Comment { get; set; } = string.Empty;

        [Range(0,5)]
        public int Star { get; set; }
    }
    public class ReplayModel
    {
        public int CommentUserId { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
