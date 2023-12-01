using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Data
{
    public class MyDBContext:IdentityDbContext<IdentityUser>
    {
        public MyDBContext(DbContextOptions<MyDBContext> options):base(options) { }
        public DbSet<Book> books { get; set; }
        public DbSet<Images> images { get; set; }
        public DbSet<BookCategorys> bookCategories { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<Serie> serie { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<BookCategorys>(e =>
            {
                e.HasKey(e => new { e.BookID, e.CategoryID });
                e.HasOne(e=>e.Book)
                .WithMany(e=>e.bookCategories)
                .HasForeignKey(e=>e.BookID)
                .OnDelete(DeleteBehavior.Cascade);
                e.HasOne(e=>e.Category)
                .WithMany(e=>e.bookCategories)
                .HasForeignKey(e=>e.CategoryID)
                .OnDelete(DeleteBehavior.Cascade);
            });
            modelBuilder.Entity<Book>(e =>
            {
                e.HasIndex(e => e.Name).IsUnique();
                e.HasMany(e => e.images)
                .WithOne(e => e.book)
                .HasForeignKey(e => e.BookID)
                .OnDelete(DeleteBehavior.Cascade);
            });
            modelBuilder.Entity<Category>(e =>
            {
                e.HasIndex(e=>e.Name).IsUnique();
            });
        }
    }
}
