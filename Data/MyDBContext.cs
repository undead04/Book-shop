using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookShop.Data
{
    public class MyDBContext:IdentityDbContext<ApplicationUser>
    {
        public MyDBContext(DbContextOptions<MyDBContext> options):base(options) { }
        public DbSet<Book> books { get; set; }
        public DbSet<Images> images { get; set; }
        public DbSet<BookCategorys> bookCategories { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<Serie> series { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<OrderDetail> ordersDetails { get; set; }
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
            modelBuilder.Entity<Order>(e =>
            {
                e.HasMany(e=>e.Details)
                .WithOne(e=>e.Order)
                .HasForeignKey(e=>e.OrderID)
                .OnDelete(DeleteBehavior.Cascade);
                e.HasOne(e => e.User)
                .WithMany(e => e.Orders)
                .HasForeignKey(e => e.UserID)
                .OnDelete(DeleteBehavior.Cascade);
            });
            modelBuilder.Entity<OrderDetail>(e =>
            {
                e.HasKey(e => new { e.OrderID, e.BookID });
                e.HasOne(e => e.Order)
                .WithMany(e => e.Details)
                .HasForeignKey(e => e.OrderID)
                .OnDelete(DeleteBehavior.Cascade);
                e.HasOne(e=>e.Book)
                .WithMany(e=>e.orderDetail)
                .HasForeignKey(e=>e.BookID)
                .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
