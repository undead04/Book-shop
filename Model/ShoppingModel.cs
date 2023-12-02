using System.ComponentModel.DataAnnotations;

namespace BookShop.Model
{
    public class ShoppingModel
    {

        public string UserID { get; set; } = string.Empty;
        
        public List<ShoppingBook>? Books { get; set; }
       
        public string UserName { get; set; } = string.Empty;
       
        public string Phone { get; set; } = string.Empty;
     
        public string Address { get; set; } = string.Empty;
    }
    public class ShoppingBook
    {
        public int ID { get; set; }
        public int Quantity { get; set; }
        
    }
}
