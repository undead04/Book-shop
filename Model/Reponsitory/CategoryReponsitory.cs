using BookShop.Data;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Model.Reponsitory
{
    public class CategoryReponsitory : ICategoryReponsitory
    {
        private readonly MyDBContext _context;

        public CategoryReponsitory(MyDBContext context) 
        {
            _context=context;
        }
        public async Task<string> Create(CategoryModel categoryModel)
        {
            var Category = new Category
            {
               Name=categoryModel.Name,
            };
            _context.categories.Add(Category);
            await _context.SaveChangesAsync();
            return "Thanh cong";
        }

        public async Task<string> Delete(int id)
        {
            var category=await _context.categories.FindAsync(id);
            if (category == null)
            {
                return null;
            }
             _context.categories.Remove(category);
            await _context.SaveChangesAsync();
            return "Thanh cong";
        }

        public async Task<List<CategoryVM>> GetAll()
        {
            var category = await _context.categories.Select(c => new CategoryVM
            {
                ID=c.ID,
                Name=c.Name,
            }).ToListAsync();
            return category;
        }

        public async  Task<CategoryVM> GetById(int id)
        {
            var category=await _context.categories.Where(x=>x.ID==id).FirstOrDefaultAsync();
            if(category == null)
            {
                return null;
            }
            return new CategoryVM
            {
                ID = category.ID,
                Name = category.Name,
            };
        }

        public async Task<string> Update(int id, CategoryModel categoryModel)
        {
           var category= await _context.categories.FindAsync(id);
           if(category == null)
            {
                return null;
            }
            category.Name = categoryModel.Name;
            await _context.SaveChangesAsync();
            return "Thanh cong";
        }
    }
}
