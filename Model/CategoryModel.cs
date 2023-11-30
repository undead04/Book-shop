using BookShop.Data;
using System.ComponentModel.DataAnnotations;

namespace BookShop.Model
{
    public class CategoryModel
    {
       
        public string Name { get; set; } = string.Empty;
       
    }
    public class CategoryVM
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        
    }
}
