using BookShop.Data;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Resources;

namespace BookShop.Model.Reponsitory
{
    public class BookRepository : IBookReponsitory
    {
        private readonly MyDBContext _context;

        public BookRepository(MyDBContext context) { _context = context; }

        
        public async Task<string> Create(BookModel bookModel)
        {
            var book = new Book
            {
                Name = bookModel.Name,
                Publisher=bookModel.Publisher,
                Supplier=bookModel.Supplier,
                OldPrice=bookModel.OldPrice,
                NewPrice=bookModel.NewPrice,
                Author=bookModel.Author,
                SeriesID=bookModel.SeriesID,
                Quantity=bookModel.Quantity,
                Description=bookModel.Description,
                Create_at=bookModel.Create
            };
            await _context.books.AddAsync(book);
            await _context.SaveChangesAsync();
            string[] imageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".svg", ".webp", ".ico" };

            if (bookModel.Image!=null)
            {
                var extension = Path.GetExtension(bookModel.Image.FileName);
                var nameImage=Path.GetFileNameWithoutExtension(bookModel.Image.FileName);
                string timeStamp = DateTime.Now.ToString("dd-MM-yyyy-HH-mm-ss");
                if (imageExtensions.Contains(extension))
                {
                    string newNameImage = $"{book.ID}_{nameImage}_{timeStamp}{extension}";
                    string PathImage = Path.Combine(Directory.GetCurrentDirectory(), "Resources", newNameImage);
                    using (var fileStream = new FileStream(PathImage, FileMode.Create))
                    {
                        await bookModel.Image.CopyToAsync(fileStream);
                    }
                    book.Image = newNameImage;
                }
            }
            if (bookModel.SecondaryImage != null)
            {
                
                foreach(var file in bookModel.SecondaryImage)
                {
                    var extension = Path.GetExtension(file.FileName);
                    string timeStamp = DateTime.Now.ToString("dd-MM-yyyy-HH-mm-ss");
                    var nameImage = Path.GetFileNameWithoutExtension(file.FileName);
                    if (imageExtensions.Contains(extension))
                    {
                        string newNameImage = $"{book.ID}_{nameImage}_{timeStamp}{extension}";
                        string PathImage = Path.Combine(Directory.GetCurrentDirectory(), "Resources", newNameImage);
                        using (var fileStream = new FileStream(PathImage, FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);
                        }
                      
                        var imagebook = new Images
                        {
                            BookID = book.ID,
                            Image = newNameImage,
                        };
                        await _context.images.AddAsync(imagebook);
                        
                    }
                }
               
            }
            foreach(var category in bookModel.CategoryID)
            {
                var categoryBook = new BookCategorys
                {
                    BookID = book.ID,
                    CategoryID = category,
                };
                _context.bookCategories.Add(categoryBook);
            }
            

           await _context.SaveChangesAsync();
            return "Thanh cong";
        }

        public async Task<string> Delete(int id)
        {
            var book= await _context.books.Include(x=>x.images).FirstOrDefaultAsync(x=>x.ID==id);
           
            if (book == null)
            {
                return null;
               
            }
            var PathImage = Path.Combine(Directory.GetCurrentDirectory(), "Resources", book.Image);
            if (File.Exists(PathImage))
            {
                File.Delete(PathImage);
            }
            foreach (var pathimage in book.images)
            {
                var pathImageSecond=Path.Combine(Directory.GetCurrentDirectory(),"Resources",pathimage.Image);
                if (File.Exists(pathImageSecond))
                {
                    File.Delete(pathImageSecond);
                }
            }
            _context.books.Remove(book);
            await _context.SaveChangesAsync();
            return "Thanh cong";


        }

        public async Task<List<BookVM>> getAll()
        {
            
            var book = await _context.books.Select(x => new BookVM
            {
                ID = x.ID,
                Supplier = x.Supplier,
               Description=x.Description,
                Image = x.Image,
                Name = x.Name,
                Author = x.Author,
                Publisher = x.Publisher,
                NewPrice = x.NewPrice,
                OldPrice = x.OldPrice,
                SecondaryImage=x.images!.Select(x=>x.Image).ToList(),
                NameCategory = x.bookCategories!.Select(x => x.Category!.Name).ToList(),
                Quantity=x.Quantity,
                
                Create_at =x.Create_at.ToString(),
                TotalStar = x.comments.Any()? Math.Round((double)x.comments.Select(x => x.Star).Sum() / x.comments.Select(x => x.Star).Count(),2):0

            }).ToListAsync();
            return book;
        }

        public async Task<BookVM> getById(int id)
        {
            var book = await _context.books.Include(x=>x.bookCategories)!.ThenInclude(x=>x.Category).Include(x=>x.comments).Include(f=>f.images).FirstOrDefaultAsync(x=>x.ID==id);

            if (book != null)
            {
                return new BookVM
                {
                    ID = book.ID,
                    Supplier = book.Supplier,
                    Create_at=book.Create_at.ToString(),
                    Image = book.Image,
                    Name = book.Name,
                    Author = book.Author,
                    Publisher = book.Publisher,
                    NewPrice = book.NewPrice,
                    OldPrice = book.OldPrice,
                    SecondaryImage = book.images!.Select(x => x.Image).ToList(),
                    NameCategory = book.bookCategories!.Select(x => x.Category!.Name).ToList(),
                    Quantity = book.Quantity,
                    Description=book.Description,
                   
                    TotalStar = book.comments.Any() ? Math.Round((double)book.comments.Select(x => x.Star).Sum() / book.comments.Select(x => x.Star).Count(), 2) : 0
                };
            }
            return null;
           
         }

        public async Task<string> Update(int id, BookModel bookModel)
        {
            var book = await _context.books.Include(x=>x.bookCategories).Include(x=>x.images).Where(x => x.ID == id).FirstOrDefaultAsync();
            if (book == null)
            {
                return null;
            }
            
            book.Supplier = bookModel.Supplier;
            book.Name = bookModel.Name;
            book.OldPrice = bookModel.OldPrice;
            book.NewPrice = bookModel.NewPrice;
            book.Quantity = bookModel.Quantity; 
            book.Author = bookModel.Author;
            book.Publisher = bookModel.Publisher;
            book.SeriesID = bookModel.SeriesID;
            book.Description = bookModel.Description;
            book.Create_at = bookModel.Create;
            string[] imageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".svg", ".webp", ".ico" };

            if (bookModel.Image != null)
            {
                var extension = Path.GetExtension(bookModel.Image.FileName);
                string timeStamp = DateTime.Now.ToString("dd-MM-yyyy-HH-mm-ss");
                if (imageExtensions.Contains(extension))
                {
                    string PathImageOld = Path.Combine(Directory.GetCurrentDirectory(), "Resources", book.Image);
                    if (File.Exists(PathImageOld))
                    {
                        File.Delete(PathImageOld);
                    }
                    var imageName = Path.GetFileNameWithoutExtension(bookModel.Image.FileName);
                    string newNameImage = $"{book.ID}_{imageName}_{timeStamp}{extension}";
                    string PathImage = Path.Combine(Directory.GetCurrentDirectory(), "Resources", newNameImage);
                    using (var fileStream = new FileStream(PathImage, FileMode.Create))
                    {
                        await bookModel.Image.CopyToAsync(fileStream);
                    }
                    book.Image = newNameImage;
                }
            }
            if (bookModel.SecondaryImage != null)
            {
               
                foreach (var file in bookModel.SecondaryImage)
                {

                    var extension = Path.GetExtension(file.FileName);
                    string timeStamp = DateTime.Now.ToString("dd-MM-yyyy-HH-mm-ss");
                    if (imageExtensions.Contains(extension))
                    {

                        var imageName = Path.GetFileNameWithoutExtension(file.FileName);
                        string newNameImage = $"{book.ID}_{imageName}_{timeStamp}{extension}";
                        string PathImage = Path.Combine(Directory.GetCurrentDirectory(), "Resources", newNameImage);
                        using (var fileStream = new FileStream(PathImage, FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);
                        }
                        
                        foreach (var imageOld in book.images!)
                        {
                            string PathImageOld = Path.Combine(Directory.GetCurrentDirectory(), "Resources", imageOld.Image);
                            if (File.Exists(PathImageOld))
                            {
                                File.Delete(PathImageOld);
                            }
                            imageOld.Image = newNameImage;
                            
                        }
                    }
                }
              

            }
            foreach (var category in book.bookCategories)
            {
                _context.bookCategories.Remove(category);
            }
            foreach (var category in bookModel.CategoryID)
            {
                var categoryBook = new BookCategorys
                {
                    BookID = book.ID,
                    CategoryID = category,
                };
                _context.bookCategories.Add(categoryBook);
            }

            await _context.SaveChangesAsync();
            return "Thanh cong";
        }
    }
}
