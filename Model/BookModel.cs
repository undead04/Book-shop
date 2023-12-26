using System.ComponentModel.DataAnnotations;

namespace BookShop.Model
{
    public class BookModel
    {
        public string Name { get; set; } = string.Empty;
        public string Supplier { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public double OldPrice { get; set; }
        public double NewPrice { get; set; }
        public List<int>? CategoryID { get; set; }
        public int Quantity { get; set; }
        public string Author { get; set; } = string.Empty;
        public IFormFile? Image { get; set; }
        public List<IFormFile>? SecondaryImage { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime Create { get; set; }
      

    }
    public class BookVM
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Supplier { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public double OldPrice { get; set; }
        public double NewPrice { get; set; }
        public int Quantity { get; set; }
        public string Author { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public List<string>? SecondaryImage { get; set; }
        public string Series { get; set; } = string.Empty;
        public double TotalStar { get; set; } =0;
        public List<string>? NameCategory { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Create_at { get; set; } = string.Empty;
    }
    public class BookVMvalidation : BookModel
    {
        public int id { get; set; }
    }
}
