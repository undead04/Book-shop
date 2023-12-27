namespace BookShop.Model
{
    public class FilterBookVM
    {
       public IList<FilterBook>? Book { get; set; }
        public double TotalPage { get; set; }
    }
    public class FilterBenefit
    {
        public string Month { get; set; } = string.Empty;
        public double Price { get; set; }
    }
    public class FilterCategory
    {
        public IList<CategoryVM>? Categorys { get; set; }
        public int TotalPage { get; set; }
    }
    public class FilterBook
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public double TotalStar { get;set; }
        public double OldPrice { get; set; }
        public double NewPrice { get; set; }
        public IList<string>? NameCategory { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
