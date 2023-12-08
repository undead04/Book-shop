using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BookShop.Data
{
    public enum InvoiceStatus
    {
        WaitingConfirmation = 0, WaitingForDelivary = 1, Payment = 2, Complete = 3, Cancel = -1
    }
    public enum StatusPayment
    {
        unpaid=0,Pay=1,
    }
    public class Order
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string UserID { get; set; } = string.Empty;
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
        public InvoiceStatus status { get; set; } = InvoiceStatus.WaitingConfirmation;
        public StatusPayment StatusPayment { get; set; } = StatusPayment.unpaid;
        public ApplicationUser? User { get; set; }
        public ICollection<OrderDetail>? Details { get; set; }

    }
}
