using System.ComponentModel.DataAnnotations.Schema;

namespace BookShop.Data
{
    [Table("BookCategorys")]
    public class BookCategorys
    {
        public int BookID { get; set; }
        public int CategoryID { get; set; }
        public Book? Book { get; set; }
        public Category? Category { get; set; }
    }
}
