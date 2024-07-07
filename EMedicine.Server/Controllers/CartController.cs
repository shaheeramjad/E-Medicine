using EMedicine.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMedicine.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EmedicineContext context;
        public CartController(EmedicineContext context)
        {
            this.context = context;
        }

        [HttpPost]

        [Route("Add")]
        public async Task<ActionResult<Cart>> AddMedicine(Cart cart)
        {
            await context.Carts.AddAsync(cart);
            await context.SaveChangesAsync();
            return Ok(cart);
        }

        [HttpGet]
        [Route("CartItems/{id}")]
        public async Task<ActionResult<List<Cart>>> GetCartItems(int id)
        {
            var mycart = await context.Carts.Where(e => e.UserId == id).ToListAsync();
            if (mycart == null)
            {
                return NotFound();
            }
            return Ok(mycart);
        }

        [HttpDelete]
        [Route("deleteItem/{id}")]
        public bool DeleteItem(int id)
        {
            bool deleted = false;
            var std = context.Carts.Find(id);
            if (std != null)
            {
                deleted = true;
                context.Carts.Remove(std);
                context.SaveChanges();
            }
            else
            {
                deleted = false;
            }

            return deleted;
        }

    }
}
