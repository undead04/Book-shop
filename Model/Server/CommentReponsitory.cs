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
                Star=comment.Star

            };
            await context.comments.AddAsync(review);
            await context.SaveChangesAsync();
        }

        public async Task<List<CommentVM>> GetCommentBook(int  bookID)
        {
            var commnet = await context.comments.Include(f=>f.User).Include(f=>f.replyAdmin).Where(x => x.BookID == bookID).ToListAsync();
            return commnet.Select(x => new CommentVM
            {
                UserName=x.User?.UserName,
                Star=x.Star,
                Comment=x.UserComment,
                replay=x.replyAdmin?.AdminComment,
                ID=x.Id
                
            }).ToList();
        }

        public async Task<string> IsvalidComment(int? bookID,string? userID,int? reviewID)
        {
            if (bookID.HasValue)
            {
                var book = await context.books.Include(f=>f.orderDetail).FirstOrDefaultAsync(x => x.ID == bookID);
                if (book == null)
                {
                    return "Khong tim thay id nay";
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
            if(reviewID.HasValue)
            {
                var review = await context.comments.FirstOrDefaultAsync(x => x.Id == reviewID);
                if(review == null)
                {
                    return "Khong tim thay comment nay";
                }
            }
            if (bookID.HasValue && !string.IsNullOrEmpty(userID))
            {
                var order = await context.ordersDetails.FirstOrDefaultAsync(x => x.BookID == bookID && x.Order.UserID == userID);
                if (order == null)
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
                CommentID = replay.CommentUserId,
            };
            await context.replyAdmins.AddAsync(comment);
           await context.SaveChangesAsync();
        }

        public async Task UpdateComment(int ID,UpdateComment commentMD)
        {
            var comment = await context.comments.FirstOrDefaultAsync(x => x.Id==ID);
            comment.Star = commentMD.Star;
            comment.UserComment = commentMD.Comment;
           await context.SaveChangesAsync();
        }
    }
}
