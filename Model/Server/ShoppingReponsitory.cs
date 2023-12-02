using Azure.Core;
using BookShop.Data;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Model.Server
{
    public class ShoppingReponsitory : IShoppingReponsitory
    {
        private readonly MyDBContext context;
        private readonly IConfiguration configuration;

        public ShoppingReponsitory(MyDBContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }
        public async Task<string>ValidationShopping(ShoppingModel bookModel)
        {
            var user = await context.Users.SingleOrDefaultAsync(user => user.Id == bookModel.UserID);
            if(user== null)
            {
                return "Khong co User nay";
            }
            foreach (var item in bookModel.Books)
            {
                var book = await context.books.FirstOrDefaultAsync(bo => bo.ID == item.ID);
                if (book == null)
                {

                    return  "Không có đồ ăn này";
                }
                if (book.Quantity - item.Quantity < 0)
                {
                    
                    return string.Format("san pham {0} hang ton kho ko du chỉ còn {1}", book.Name, book.Quantity);
                }
               
            }
            return string.Empty;
        }

        public Task<string> BuyOnline(ShoppingModel bookModel)
        {
            throw new NotImplementedException();
        }
        public async Task<string> Buy(ShoppingModel bookModel)
        {
            double TotalPrice = 0;
            var user = await context.Users.SingleOrDefaultAsync(user => user.Id == bookModel.UserID);
            
                var order = new Order
                {
                    UserName = bookModel.UserName,
                    UserID = bookModel.UserID,
                    Address = bookModel.Address,
                    Phone = bookModel.Phone,
                    OrderDate = DateTime.Now.Date,
                };
                await context.orders.AddAsync(order);
                await context.SaveChangesAsync();
                foreach(var item in bookModel.Books)
                {
                    var book = await context.books.FirstOrDefaultAsync(bo => bo.ID == item.ID);
                    var OrderDetail = new OrderDetail
                    {
                        OrderID = order.ID,
                        BookID = item.ID,
                        Quantity = item.Quantity,
                        Price = book.NewPrice,
                    };
                    book.Quantity -= item.Quantity;
                    TotalPrice += (OrderDetail.Price * OrderDetail.Quantity);
                    await context.ordersDetails.AddAsync(OrderDetail);
                }
                order.Price = TotalPrice;
                order.Status = InvoiceStatus.Waiting;
                await context.SaveChangesAsync();
                return "Đã mua thành công";


            
           



        }
           

        
    }

    
}
    

