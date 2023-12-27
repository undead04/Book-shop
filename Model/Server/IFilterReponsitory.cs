namespace BookShop.Model.Reponsitory
{
    public interface IFilterReponsitory
    {
      Task<List<FilterBook>> GetFilter(
     string search,
      string? categoryId,int?from,int?to,string?sortby );
        Task<List<CommentVM>> GetFilterComment(int BookID, int Star);
        Task<List<FilterBenefit>> GetFilterBenefit(int Year);
        

     
     

    }
}
