using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookShop.Data
{
    [Table("Images")]
    public class Images
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int BookID { get; set; }
        [Required]
        public string Image { get; set; } = string.Empty;
        public Book? book { get; set; }

    }
}
