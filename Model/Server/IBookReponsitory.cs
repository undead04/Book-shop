namespace BookShop.Model.Reponsitory
{
    public interface IBookReponsitory
    {
       Task<List<BookVM>> getAll();
       Task<BookVM> getById(int id);
       Task<string> Create(BookModel bookModel);
       Task<string> Update(int id,BookModel bookModel);
       Task<string> Delete(int id);

    }
}
