using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BookShop.Data
{
    public enum InvoiceStatus
    {
        Waiting=0, Payment = 1, Complete = 2, Cancel = -1
    }
    public class Order
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string UserID { get; set; }
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;
        [Required]
        public string Address { get; set; } = string.Empty;
        [Required]
        [Range(0,double.MaxValue)]
        public double Price { get; set; }
        [Required]
        public DateTime OrderDate { get; set; }
        [Required]
        public DateTime DateOfReceiptOfGoods { get; set; }
        public InvoiceStatus Status { get; set; }=InvoiceStatus.Waiting;

        public ApplicationUser? User { get; set; }
        public ICollection<OrderDetail>? Details { get; set; }

    }
}
