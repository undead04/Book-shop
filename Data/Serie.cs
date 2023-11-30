using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookShop.Data
{
    [Table("Series")]
    public class Serie
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }=string.Empty;
        public ICollection<Book>? Books { get; set;}

    }
}
