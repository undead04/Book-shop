using BookShop.Data;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Model.Server
{
    public class CommentReponsitory : ICommentReponsitory
    {
        private readonly MyDBContext context;

        public CommentReponsitory(MyDBContext context) 
        {
            this.context = context;
        }

        public async Task Comment(CommentModel comment)
        {
            
            var review = new Comment
            {
                BookID = comment.BookId,
                UserID=comment.UserId,
                UserComment=comment.Comment,
                Star=comment.Star,
                Create_at=DateTime.Now,
            };
            await context.comments.AddAsync(review);
            await context.SaveChangesAsync();
        }

        public async Task<List<CommentVM>> GetCommentBook(int  bookID)
        {
            var commnet = await context.comments.Include(f=>f.User).Where(x => x.BookID == bookID).ToListAsync();
            return commnet.Select(x => new CommentVM
            {
                Avatar=x.User.Avatar,
                UserName=x.User?.UserName,
                Star=x.Star,
                UserID=x.User.Id,
                CreateAt=x.Create_at.ToString(),
                Comment=x.UserComment,
               
              
                
            }).ToList();
        }

        public async Task<string> IsvalidComment(int? bookID,string? userID)
        {
            if (bookID.HasValue)
            {
                var book = await context.books.Include(f=>f.orderDetail).FirstOrDefaultAsync(x => x.ID == bookID);
                if (book == null)
                {
                    return "Khong tim thay Bookid nay";
                }
                
            }
            if(!string.IsNullOrEmpty(userID))
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.Id == userID);

                if (user == null)
                {
                    return "Khong tim thay user nay";
                }
            }
           
            if (bookID.HasValue && !string.IsNullOrEmpty(userID))
            {
                var order = await context.ordersDetails.Include(f=>f.Order).FirstOrDefaultAsync(x => x.BookID == bookID && x.Order.UserID == userID);
                if (order == null || order.Order?.status!=InvoiceStatus.Complete)
                {
                    return "Comment That bai";
                }
            }
            
            return string.Empty;
        }
       

       
        public async Task UpdateComment(CommentModel commentModel)
        {
            var comment = await context.comments.FirstOrDefaultAsync(x => x.UserID==commentModel.UserId && x.BookID==commentModel.BookId);
            comment.Star = commentModel.Star;
            comment.UserComment = commentModel.Comment;
            comment.Create_at = DateTime.Now;
            await context.SaveChangesAsync();
        }
        public async Task<bool> IsComment(int bookID, string userID)
        {
            var order =await context.orders.Where(or =>or.status==InvoiceStatus.Complete && or.UserID == userID && or.Details.Any(de => de.BookID == bookID)).ToListAsync();
            if(order.Count() > 0)
            {
                var comment = await context.comments.FirstOrDefaultAsync(x => x.BookID == bookID && x.UserID == userID);
                if (comment == null)
                {
                    return true;
                }
            }
            return false;
        }
        public async Task<CommentVM> GetComment(int bookID, string userID)
        {
            var comment = await context.comments.FirstOrDefaultAsync(x => x.BookID == bookID && x.UserID == userID);
            return new CommentVM
            {
                CreateAt=comment.Create_at.ToString(),
                Comment=comment.UserComment,
                Star=comment.Star,
                UserID=comment.UserID,
                UserName=comment.User.UserName,
            };

        }

    }
}
