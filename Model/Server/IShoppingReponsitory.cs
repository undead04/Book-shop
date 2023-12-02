namespace BookShop.Model.Server
{
    public interface IShoppingReponsitory
    {
        Task<string> BuyOnline(ShoppingModel bookModel);
        Task<string> Buy(ShoppingModel bookModel);
        Task<string> ValidationShopping(ShoppingModel bookModel);
        
    }
}
