namespace BookShop.Model.Server
{
    public interface ICommentReponsitory
    {
        Task Comment(CommentModel comment);
        Task UpdateComment(int ID,UpdateComment commentMD);
        Task ReplyAdmin(ReplayModel replay);
        Task<List<CommentVM>> GetCommentBook(int bookID);
        Task<string> IsvalidComment(int? bookID,string? userID,int? reviewID);
        
        

    }
}
