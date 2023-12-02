namespace BookShop.Model.Reponsitory
{
    public interface ICategoryReponsitory
    {
        Task<List<CategoryVM>> GetAll();
        Task<CategoryVM> GetById(int id);
        Task<string> Create(CategoryModel categoryModel);
        Task<string> Update(int id,CategoryModel categoryModel);
        Task<string> Delete(int id);
    }
}
