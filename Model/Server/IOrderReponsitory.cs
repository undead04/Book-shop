using BookShop.Data;

namespace BookShop.Model.Server
{
    public interface IOrderReponsitory
    {
        Task<List<OrderModel>> OrderDetail(InvoiceStatus? status);
        Task<string> confirmationOrder(int orderID);
        Task<string> GiveOrder(int orderID);
        
        Task<string> ValidationOrder(int orderID);
        Task<OrderDetailModel> GetOrderDetail(int orderID);
        Task<List<OrderModel>> OrderDetailUser(InvoiceStatus? status,string UserID);
        Task<string> ValidationUser(string UserID);
        Task<string> CancelOrder(int orderID);
    }
}
