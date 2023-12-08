using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookShop.Data
{
    [Table("replayAdmins")]
    public class ReplyAdmin
    {
        [Key]
        public int Id { get; set; }
        public int CommentID { get; set; }
        public string AdminComment { get; set; } = string.Empty;
        public Comment?comment { get; set; }


    }
}
