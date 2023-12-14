using BookShop.Data;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;
using System.Net;

namespace BookShop.Model.Server
{
    public class OrderRepository : IOrderReponsitory
    {
        private readonly MyDBContext context;

        public OrderRepository(MyDBContext context) 
        {
            this.context = context;
        }

        public async Task<string> confirmationOrder(int OrderID)
        {
            var orderUser = await context.orders.Include(f=>f.Details).FirstOrDefaultAsync(x => x.ID==OrderID);
            if (orderUser.status == InvoiceStatus.WaitingConfirmation)
            {
                orderUser.status = InvoiceStatus.WaitingForDelivary;
                await context.SaveChangesAsync();
                return "Chap nhan hon hang";
            }
            return string.Empty;
        }
          public async Task<string> GiveOrder(int OrderID)
          {
            var orderUser = await context.orders.Include(f=>f.Details).FirstOrDefaultAsync(x => x.ID == OrderID);
            if(orderUser.status==InvoiceStatus.WaitingForDelivary)
            {
                orderUser.status = InvoiceStatus.Complete;
                orderUser.StatusPayment = StatusPayment.Pay;
                orderUser.DateOfReceiptOfGoods = DateTime.Now.Date;
                await context.SaveChangesAsync();
                return "Giao hàng thành công";
            }
            return string.Empty;
            


          }
        public async Task<List<OrderModel>> OrderDetail(InvoiceStatus? status)
        {
            var order = await context.orders.AsQueryable().ToListAsync();
            if (status.HasValue)
            {
                order =  order.Where(x => x.status == status).ToList();
            }
           
            return order.Select(x => new OrderModel
            {
               
                OrderDate = x.OrderDate.ToString(),
                DateOfReceiptOfGoods=x.DateOfReceiptOfGoods.ToString(),
                Price =x.Price,
                OrderID=x.ID,
                Status=x.status.ToString(),
                StatusPayment=x.StatusPayment.ToString()
                
            })
            .ToList();
        }

        public async Task<OrderDetailModel> GetOrderDetail(int orderID)
        {
            var order = await context.orders.Include(x => x.Details).ThenInclude(x => x.Book).Include(x => x.User).FirstOrDefaultAsync(x => x.ID == orderID);
            return new OrderDetailModel
            {
                UserName = order.UserName,
                Phone = order.Phone,
                Address = order.Address,
                Items = order.Details.Select(x => new OrderBookDetailModel
                {
                    Name = x.Book.Name,
                    Quantity = x.Quantity,
                    OldPrice = x.Book.OldPrice,
                    NewPrice = x.Book.NewPrice,
                    TotalPrice = x.Quantity * x.Book.NewPrice,
                }).ToList()

            };
        }
        public async Task<List<OrderModel>> OrderDetailUser(InvoiceStatus? status, string UserID)
        {
            var order = await context.orders.AsQueryable().ToListAsync();
            if(status.HasValue)
            {
                order =order.Where(x => x.UserID == UserID && x.status == status).ToList();
            }
            return order.Select(x => new OrderModel
            {
                OrderID = x.ID,
                Status = x.status.ToString(),
                OrderDate = x.OrderDate.ToString(),
                DateOfReceiptOfGoods = x.DateOfReceiptOfGoods.ToString(),
                Price=x.Price,
                StatusPayment = x.StatusPayment.ToString()

            }).ToList();
        }
        public async Task<string> CancelOrder(int orderID)
        {
            var order = await context.orders.Include(f=>f.Details).ThenInclude(f=>f.Book).FirstOrDefaultAsync(x => x.ID == orderID);
            if(order.status==InvoiceStatus.WaitingConfirmation)
            {
                order.status = InvoiceStatus.Cancel;
                foreach (var orderDetail in order.Details)
                {
                    var book = await context.books.FirstOrDefaultAsync(bo => bo.ID == orderDetail.BookID);
                    book.Quantity += orderDetail.Quantity;
                }
                await context.SaveChangesAsync();
                return "Thanh cong";
            }
            return null;
            
        }
        public async Task<string> ValidationOrder(int orderID)
        {
            var orderDetail = await context.orders.SingleOrDefaultAsync(or => or.ID == orderID);
            if(orderDetail == null)
            {
                return "khong tìm thấy order này";
            }
            return string.Empty;
        }
        public async Task<string> ValidationUser(string userID)
        {
            var user = await context.Users.SingleOrDefaultAsync(user => user.Id == userID);
            if (user == null)
            {
                return "Khong co User nay";
            }
            return string.Empty;
        }
        
    }
}
