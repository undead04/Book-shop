namespace BookShop.Model.Server
{
    public interface ICommentReponsitory
    {
        Task Comment(CommentModel comment);
        Task UpdateComment(CommentModel commentModel);
        Task ReplyAdmin(ReplayModel replay);
        Task<List<CommentVM>> GetCommentBook(int bookID);
        Task<string> IsvalidComment(int? bookID,string? userID);
        
        

    }
}
