using System.ComponentModel.DataAnnotations.Schema;

namespace BookShop.Data
{
    [Table("OrderDetails")]
    public class OrderDetail
    {
        public int OrderID { get; set; }
        public int BookID { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public Order? Order { get; set; }
        public Book? Book { get; set; }
    }
}
