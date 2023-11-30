using BookShop.Data;

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

            }).ToList();
        }
    }

}

