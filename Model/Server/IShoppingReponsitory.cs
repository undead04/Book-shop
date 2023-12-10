﻿using BookShop.Data;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace BookShop.Model.Server
{
    public interface IShoppingReponsitory
    {
        
       
        Task<string> ValidationShopping(List<ShoppingBook> bookModel);
        Task<string> ValidationUser(string UserID);
        Task<string> Buy(ShoppingModel shopping);
        Task<string> CheckOut(List<ShoppingBook> Books, string thisApiUrl,string s_wasmClientURL);
        Task CheckoutSuccess(ShoppingModel bookModel,Session sessionId);


    }
}
