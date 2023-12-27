using BookShop.Data;
using Microsoft.EntityFrameworkCore;
using System.Text;
using static System.Reflection.Metadata.BlobBuilder;

namespace BookShop.Model.Reponsitory
{
    public class FilterReponsitory : IFilterReponsitory
    {
        private readonly MyDBContext _context;

        public FilterReponsitory(MyDBContext context)
        {
            _context = context;
        }
       

        public async Task<List<FilterBook>> GetFilter(string search, string? categoryId, int? from, int? to, string? sortby)
        {
            var book = _context.books.AsQueryable();
            if (search != null)
            {
                book = book.Where(book => book.Name.Contains(search));
            }
            if (categoryId != null)
            {
                
                var category = categoryId.Split(',');
                foreach (var itemcategory in category)
                {
                    book = book.Where(x => x.bookCategories!.Any(x => x.CategoryID == Convert.ToInt32(itemcategory)));
                }
            }
            if (from.HasValue)
            {
                book = book.Where(bo => bo.NewPrice >= from);
            }
            if (to.HasValue)
            {
                book = book.Where(bo => bo.NewPrice <= to);
            }
            book = book.OrderBy(bo => bo.Name).ThenByDescending(bo => bo.NewPrice);
            if (!string.IsNullOrEmpty(sortby))
            {
                switch (sortby)
                {
                    case "book-desc":
                        book = book.OrderByDescending(bo => bo.Name);
                        break;
                    case "price-asc":
                        book = book.OrderBy(x => x.NewPrice).ThenBy(x => x.Name);
                        break;
                    case "price-desc":
                        book = book.OrderByDescending(x => x.NewPrice).ThenBy(x => x.Name);
                        break;
                    case "sale-price":
                        book = book.Where(bo => bo.NewPrice != bo.OldPrice);
                        break;
                    case "best-seller":
                        var groupBookBestSeller = _context.ordersDetails
                        .GroupBy(od => od.BookID)
                        .OrderByDescending(g => g.Sum(od => od.Quantity))
                        .Select(g => g.Key)
                        .ToList();

                        // Lọc sách dựa trên danh sách ID của sách bán chạy nhất

                        var bookid = groupBookBestSeller.Where(x => book.FirstOrDefault(bo => bo.ID == x) != null).ToList();
                        List<Book> BestSeller = new List<Book>();
                        foreach(var booksid in bookid)
                        {
                            BestSeller.Add(book.Include(f=>f.images).Include(f=>f.comments).Include(f=>f.bookCategories).ThenInclude(f=>f.Category).FirstOrDefault(x => x.ID == booksid));
                        }
                        book = BestSeller.AsQueryable();
                        break;
                       

                }
            }
            
            return book.Select(x => new FilterBook
            {
                ID = x.ID,
              
                Name = x.Name,
                Quantity=x.Quantity,
                NameCategory = x.bookCategories!.Select(x => x.Category!.Name).ToList(),
                OldPrice = x.OldPrice,
                NewPrice = x.NewPrice,
               
                Image = x.Image,
                
                TotalStar = x.comments.Any() ? Math.Round((double)x.comments.Select(x => x.Star).Sum() / x.comments.Select(x => x.Star).Count(), 2) : 0

            }).ToList();
        }
        public async Task<List<CommentVM>> GetFilterComment(int BookID, int Star)
        {
            var comment = await _context.comments.Include(f => f.User)
                
                .Where(co => co.BookID == BookID && co.Star == Star).ToListAsync();
            return comment.Select(co => new CommentVM
            {
                UserName=co.User.UserName,
                Comment=co.UserComment,
                //ID=co.Id,
                Star=co.Star,
               

            }).ToList();
            
        }
        public async Task<List<FilterBenefit>> GetFilterBenefit(int Year)
        {
            Dictionary<int, string> MonthYear = new Dictionary<int, string>
            {
                {1, "January"}, {2, "February"}, {3, "March"}, {4, "April"},
                {5, "May"}, {6, "June"}, {7, "July"}, {8, "August"},
                {9, "September"}, {10, "October"}, {11, "November"}, {12, "December"}
            };

            Dictionary<string, double> TotalPriceMonth = new Dictionary<string, double>();


            var order = await _context.orders.Where(x => x.DateOfReceiptOfGoods.Year == Year).ToListAsync();
            for (int i = 1; i <= 12; i++)
            {
                var orderMonth = order.Where(x => x.DateOfReceiptOfGoods.Month == i).ToList();
                double totalPrice = orderMonth.Select(x => x.Price).Sum();
                TotalPriceMonth.Add(MonthYear[i], totalPrice);
            }
            return TotalPriceMonth.Select(x => new FilterBenefit
            {
                Month = x.Key,
                Price = x.Value
            }).ToList();

        }
    }

}

