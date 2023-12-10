using BookShop.Data;
using Microsoft.EntityFrameworkCore;
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
       

        public  List<BookVM> GetFilter(string search, string? categoryId, int? from, int? to, string? sortby)
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
            
            return book.Select(x => new BookVM
            {
                ID = x.ID,
                Quantity = x.Quantity,
                Name = x.Name,
                Publisher = x.Publisher,
                Supplier = x.Supplier,
                OldPrice = x.OldPrice,
                NewPrice = x.NewPrice,
                Author = x.Author,
                Image = x.Image,
                NameCategory=x.bookCategories!.Select(x=>x.Category.Name).ToList(),
                SecondaryImage = x.images!.Select(x => x.Image).ToList(),
                TotalStar = x.comments.Any() ? Math.Round((double)x.comments.Select(x => x.Star).Sum() / x.comments.Select(x => x.Star).Count(), 2) : 0

            }).ToList();
        }
    }

}

