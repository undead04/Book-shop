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
            var commnet = await context.comments.Include(f=>f.User).Include(f=>f.replyAdmin).ThenInclude(f=>f.User).Where(x => x.BookID == bookID).ToListAsync();
            return commnet.Select(x => new CommentVM
            {
                UserName=x.User?.UserName,
                Star=x.Star,
                UserID=x.User.Id,
                CreateAt=x.Create_at.ToString(),
                Comment=x.UserComment,
                replay=x.replyAdmin?.AdminComment,
                UserNameAdmin=x.replyAdmin?.User.UserName,
                
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
       

        public async Task ReplyAdmin(ReplayModel replay)
        {
            var comment = new ReplyAdmin
            {
                AdminComment = replay.Comment,
                AdminID = replay.AdminID,
                UserID = replay.UserID,
                BookID=replay.BookID
               
            };
            await context.replyAdmins.AddAsync(comment);
           await context.SaveChangesAsync();
        }

        public async Task UpdateComment(CommentModel commentModel)
        {
            var comment = await context.comments.FirstOrDefaultAsync(x => x.UserID==commentModel.UserId && x.BookID==commentModel.BookId);
            comment.Star = commentModel.Star;
            comment.UserComment = commentModel.Comment;
            comment.Create_at = DateTime.Now;
            await context.SaveChangesAsync();
        }
    }
}
