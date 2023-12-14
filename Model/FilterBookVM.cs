namespace BookShop.Model
{
    public class FilterBookVM
    {
        public List<BookVM> Book { get; set; }
        public double TotalPage { get; set; }
    }
    public class FilterBenefit
    {
        public string Month { get; set; } = string.Empty;
        public double Price { get; set; }
    }
}
