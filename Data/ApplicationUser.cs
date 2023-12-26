using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BookShop.Data
{
    public class ApplicationUser:IdentityUser
    {
        [Required]
        public string? Avatar { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string About { get; set; } = string.Empty;
        public DateTime Create_at { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<Comment>? comments { get; set; }
        
    }
}
