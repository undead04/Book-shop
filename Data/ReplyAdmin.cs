using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookShop.Data
{
    [Table("replayAdmins")]
    public class ReplyAdmin
    {
        public string AdminID { get; set; } = string.Empty;
        public string UserID { get; set; } = string.Empty;
        public int BookID { get; set; }
        public string AdminComment { get; set; } = string.Empty;
        public Comment?comment { get; set; }
        public ApplicationUser? User { get; set; }


    }
}
