using Azure.Core;
using BookShop.Data;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Stripe;

using Stripe.Checkout;

namespace BookShop.Model.Server
{
    public class ShoppingReponsitory : IShoppingReponsitory
    {
        private readonly MyDBContext context;
       

        public ShoppingReponsitory(MyDBContext context, IConfiguration configuration)
        {
            this.context = context;
            
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
        public async Task<string>ValidationShopping(List<ShoppingBook> shoppingModel)
        {
            
           
            foreach (var item in shoppingModel )
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


        public async Task<string> CheckOut(List<ShoppingBook> Books, string thisApiUrl,string s_wasmClientURL)
        {
            var options = new SessionCreateOptions
            {
                // Stripe calls the URLs below when certain checkout events happen such as success and failure.
                SuccessUrl = $"{thisApiUrl}/api/Shopping/success?sessionId=" + "{CHECKOUT_SESSION_ID}", // Customer paid.
                CancelUrl = s_wasmClientURL + "failed",  // Checkout cancelled.
                PaymentMethodTypes = new List<string> // Only card available in test mode?
            {
                "card"
            },
                LineItems = new List<SessionLineItemOptions>(),


                Mode = "payment",
                // One-time payment. Stripe supports recurring 'subscription' payments.
            };
            foreach (var book in Books)
            {
                var BookModel = await context.books.FirstOrDefaultAsync(x => x.ID == book.ID);
                var order = new SessionLineItemOptions
                {
                    
                    PriceData = new SessionLineItemPriceDataOptions()
                    {
                        UnitAmount = (long)BookModel.NewPrice,
                        Currency = "VND",
                        ProductData = new SessionLineItemPriceDataProductDataOptions()
                        {
                            Name = BookModel.Name,
                            Metadata = new Dictionary<string, string> { { "BookId", BookModel.ID.ToString() } }
                        }


                    },
                    
                    Quantity = book.Quantity,
                    



                };
                options.LineItems.Add(order);
            }

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return session.Id;
        }

        public async Task CheckoutSuccess(ShoppingModel shoppingModel,Session session)
        {
            

            // Here you can save order and customer details to your database.
            var total = session.AmountTotal.Value;
            
            var order = new Data.Order
            {
                UserName = shoppingModel.UserName,
                UserID = shoppingModel.UserID,
                Address = shoppingModel.Address,
                Phone = shoppingModel.Phone,
                OrderDate = DateTime.Now,
                status = InvoiceStatus.WaitingConfirmation,
                Price = total,
                StatusPayment=StatusPayment.Pay
                
                
            };
            await context.orders.AddAsync(order);
            await context.SaveChangesAsync();
            foreach (var item in session.LineItems.Data )
            {
                var bookId = item.Price.Product.Metadata["BookId"];
                var book = await context.books.FirstOrDefaultAsync(bo => bo.ID == Convert.ToInt32(bookId));
                var OrderDetail = new OrderDetail
                {
                    OrderID = order.ID,
                    BookID = book.ID,
                    Quantity =Convert.ToInt32(item.Quantity),
                    Price = book.NewPrice,

                };
                book.Quantity -= Convert.ToInt32(item.Quantity);
                
                await context.ordersDetails.AddAsync(OrderDetail);
            }
           
            //order.Status = InvoiceStatus.WaitingConfirmation;
            await context.SaveChangesAsync();
            

        }
        public  async Task<string> Buy(ShoppingModel shopping)
        {
            double totalPrice = 0;
            var order = new Data.Order
            {
                UserName = shopping.UserName,
                UserID = shopping.UserID,
                Address = shopping.Address,
                Phone = shopping.Phone,
                OrderDate = DateTime.Now,
                status = InvoiceStatus.WaitingConfirmation,
                StatusPayment=StatusPayment.unpaid
               


            };
            await context.orders.AddAsync(order);
            await context.SaveChangesAsync();
            foreach (var item in shopping.Books)
            {
                var book = await context.books.FirstOrDefaultAsync(x => x.ID == item.ID);
                var OrderDetail = new OrderDetail
                {
                    OrderID = order.ID,
                    BookID = item.ID,
                    Quantity = item.Quantity,
                    Price = book.NewPrice,

                };
                book.Quantity -= Convert.ToInt32(item.Quantity);
                totalPrice += book.NewPrice*item.Quantity;
                await context.ordersDetails.AddAsync(OrderDetail);
            }
            order.Price=totalPrice;
            //order.Status = InvoiceStatus.WaitingConfirmation;
            await context.SaveChangesAsync();
            return "Thanh cong";
           
        }

        
    }

    
}
    

