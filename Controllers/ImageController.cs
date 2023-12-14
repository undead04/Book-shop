using BookShop.Model;

using Microsoft.AspNetCore.Mvc;


namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
      

       
        [HttpGet("{nameImage}")]
        public IActionResult GetImage(string nameImage)
        {
            try
            {
                var pathImage=Path.Combine(Directory.GetCurrentDirectory(), "Resources", nameImage);
                if (!System.IO.File.Exists(pathImage))
                {
                    return Ok(BaseResponse<string>.Error("ko tim thay", 400)); // Trả về 404 nếu tệp tin không tồn tại
                }
                var extension = Path.GetExtension(pathImage).Substring(1);
                return PhysicalFile(pathImage, $"image/{extension}");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
