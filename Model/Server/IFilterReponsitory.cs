namespace BookShop.Model.Reponsitory
{
    public interface IFilterReponsitory
    {
      List<BookVM> GetFilter(
     string search,
      string? categoryId,int?from,int?to,string?sortby );
        Task<List<CommentVM>> GetFilterComment(int BookID, int Star);
        Task<List<FilterBenefit>> GetFilterBenefit(int Year);
        

     
     

    }
}
