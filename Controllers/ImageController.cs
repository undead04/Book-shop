using BookShop.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace BookShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IContentTypeProvider _contentTypeProvider;

       
        [HttpGet]
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
