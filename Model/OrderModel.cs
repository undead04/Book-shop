using BookShop.Data;
using System.Drawing.Printing;

namespace BookShop.Model
{
    public class OrderBookDetailModel
    {

        public string Name { get; set; } = string.Empty;
        
        public double OldPrice { get; set; }
        public double NewPrice { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public int BookID { get;set; }
       

    }
    public class OrderDetailModel
    {
        public string UserName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public List<OrderBookDetailModel>? Items { get; set; }
    }
    
    public class OrderModel
    {

        public double Price { get; set; }
        public string OrderDate { get; set; } = string.Empty;
        public string DateOfReceiptOfGoods { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int OrderID { get; set; }
        public string StatusPayment { get; set; } = string.Empty;

        
    }
    public class PageOrder
    {
        public IList<OrderModel>? Order { get; set; }
        public int TotalPage { get; set; }
    }

}
