namespace BookShop.Model.Reponsitory
{
    public interface IFilterReponsitory
    {
      List<BookVM> GetFilter(
     string search,
      string? categoryId,int?from,int?to,string?sortby );
    

     
     

    }
}
