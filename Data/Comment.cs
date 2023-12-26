using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookShop.Data
{
    [Table("Comments")]
    public class Comment
    {
        
        public string UserID { get; set; } = string.Empty;
        public int BookID { get; set; }
        [Required,Range(0,5)]
        public int Star { get; set; }
        [Required]
        public string UserComment { get; set; }=string.Empty;
        [Required]
        public DateTime Create_at { get; set; }=DateTime.Now;
        public Book? book { get; set; }
        public ApplicationUser? User { get; set; }
       


    }
}
