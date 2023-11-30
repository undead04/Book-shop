using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookShop.Data
{
    [Table("Categorys")]
    public class Category
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public ICollection<BookCategorys>? bookCategories { get; set; }
       
       

    }
}
