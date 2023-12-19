using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookShop.Data
{
    [Table("Books")]
    public class Book
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }=string.Empty;
        [Required]
        public string Supplier { get; set; }=string.Empty;
        [Required]
        public string Publisher { get; set; } = string.Empty;
        [Required, Range(0, double.MaxValue)]
        public double OldPrice { get; set; }
        [Required, Range(0, double.MaxValue)]
        public double NewPrice { get; set; }
        [Required,Range(0,int.MaxValue)]
        public int Quantity { get; set; }
        [Required]
        public string Author { get; set; } = string.Empty;
        [Required]
        public string Image { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        public int SeriesID { get; set; }
        public DateTime Create_at { get;set; }
        public ICollection<Images>? images { get; set; }
        public ICollection<BookCategorys>? bookCategories { get; set; }
        public ICollection<OrderDetail>? orderDetail { get; set; }
        public Serie? serie { get; set; }
        public ICollection<Comment>? comments { get; set; }
        
       

    }
}
