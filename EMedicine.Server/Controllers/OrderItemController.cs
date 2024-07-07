using EMedicine.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMedicine.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly EmedicineContext context;

        public OrderItemController(EmedicineContext context)
        {
                this.context = context;
        }

        [HttpPost]
        [Route("AddOrder")]
        public async Task<ActionResult<OrderItem>> AddOrder(OrderItem item)
        {
            await context.OrderItems.AddAsync(item);
            await context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpGet]
        [Route("GetOrder/{id}")]
        public async Task<ActionResult<List<OrderItem>>> GetOrders(int id)
        {
            var myorder = await context.OrderItems.Where(e => e.UserId == id).ToListAsync();
            if (myorder == null)
            {
                return NotFound();
            }
            return Ok(myorder);
        }
        
        [HttpGet]
        [Route("GetOrder")]
        public async Task<ActionResult<List<OrderItem>>> GetOrder()
        {
            var myorder = await context.OrderItems.ToListAsync();
            if (myorder == null)
            {
                return NotFound();
            }
            return Ok(myorder);
        }

        [HttpDelete]
        [Route("deleteOrder/{id}")]
        public bool DeleteItem(int id)
        {
            bool deleted = false;
            var std = context.OrderItems.Find(id);
            if (std != null)
            {
                deleted = true;
                context.OrderItems.Remove(std); 
                context.SaveChanges();
            }
            else
            {
                deleted = false;
            }

            return deleted;
        }

        [HttpPatch]
        [Route("updateOrder/{id}")]
        public async Task<ActionResult<OrderItem>> UpdateMed(int id, OrderItem order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }
            context.Entry(order).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(order);
        }
    }
}
