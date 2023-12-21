using BookShop.Data;
using BookShop.Model;
using BookShop.Model.Server;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Formats.Asn1;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderReponsitory reponsitory;

        public OrderController(IOrderReponsitory reponsitory) 
        {
            this.reponsitory = reponsitory;
        }
        [HttpGet]
        [Authorize(Roles = AppRole.Admin)]
        public async Task<IActionResult> GetOrder(InvoiceStatus? status,int page = 1, int take = 25)
        {
            try
            {
                var order =await  reponsitory.OrderDetail(status);
                if(order == null)
                {
                    return Ok(BaseResponse<string>.Success("Khong co don hang"));
                }
                int totalPage = (int)Math.Ceiling((double)order.Count / take);
                order = order.Skip((page - 1) * take).Take(take).ToList();
                return Ok(BaseResponse<PageOrder>.WithData(new PageOrder
                {
                    Order=order,
                    TotalPage= totalPage
                }));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("Confirmation/{OrderID}")]
        [Authorize(Roles = AppRole.Admin)]
        public async Task<IActionResult> confirmationOrder(int OrderID)
        {
            try
            {
                var order = await reponsitory.ValidationOrder(OrderID);
                if(!string.IsNullOrEmpty(order))
                {
                    return Ok(BaseResponse<string>.Error(order, 400));
                }
                if (!string.IsNullOrEmpty(await reponsitory.confirmationOrder(OrderID)))
                {
                    return Ok(BaseResponse<string>.Success("Thanh cong"));
                }
                return Ok(BaseResponse<string>.Error("That bai", 400));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("GiveOrder/{OrderID}")]
        [Authorize(Roles = AppRole.Admin)]
        public async Task<IActionResult> GiveOrder(int OrderID)
        {
            try
            {
                var order = await reponsitory.ValidationOrder(OrderID);
                if (!string.IsNullOrEmpty(order))
                {
                    return Ok(BaseResponse<string>.Error(order, 400));
                }
                if (!string.IsNullOrEmpty(await reponsitory.GiveOrder(OrderID)))
                {
                    return Ok(BaseResponse<string>.Success("Thanh cong"));
                }
                return Ok(BaseResponse<string>.Error("That bai",400));

            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{OrderID}")]
        [Authorize]
        public async Task<IActionResult> GetOrderDetail(int OrderID)
        {
            try
            {
                var validation =await reponsitory.ValidationOrder(OrderID);
                if(!string.IsNullOrEmpty(validation))
                {
                    return Ok(BaseResponse<string>.Error(validation, 404));
                }
                return Ok(BaseResponse<OrderDetailModel>.WithData(await reponsitory.GetOrderDetail(OrderID)));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("User/{UserId}")]
        [Authorize]
        public async Task<IActionResult> GetOrderUser(string UserId, InvoiceStatus? Status,int page=1,int take=25)
        {
            try
            {
                var IsvalidOrder = await reponsitory.ValidationUser(UserId);
                if(!string.IsNullOrEmpty(IsvalidOrder))
                {
                    return Ok(BaseResponse<string>.Error(IsvalidOrder, 400));
                }
                var order=await reponsitory.OrderDetailUser(Status, UserId);
                int totalPage = (int)Math.Ceiling((double)order.Count / take);
                order = order.Skip((page - 1) * take).Take(take).ToList();
                return Ok(BaseResponse<PageOrder>.WithData(new PageOrder
                {
                    Order = order,
                    TotalPage = totalPage
                }));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("cancelOrder/{orderID}")]
        [Authorize]
        public async Task<IActionResult> CancelOrder(int orderID)
        {
            try
            {

                var IsvalidOrder = await reponsitory.ValidationOrder(orderID);
                if (!string.IsNullOrEmpty(IsvalidOrder))
                {
                    return Ok(BaseResponse<string>.Error(IsvalidOrder, 400));
                }
                var order = await reponsitory.CancelOrder(orderID);
                if(order != null)
                {
                    return Ok(BaseResponse<string>.Success(order));
                }
                return Ok(BaseResponse<string>.Error("Huy don that bai", 400));
                
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
