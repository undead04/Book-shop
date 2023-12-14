using BookShop.Data;
using BookShop.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using AutoMapper;
namespace BookShop.Helps
{
    public class BookMapper:Profile
    {
        public BookMapper() 
        {
            CreateMap<BookVM, Book>().ReverseMap();
            CreateMap<BookModel, BookVMvalidation>().ReverseMap();
        }

    }
}
