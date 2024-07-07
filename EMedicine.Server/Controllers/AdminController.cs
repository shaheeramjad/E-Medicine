using EMedicine.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMedicine.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly EmedicineContext context;
        public AdminController(EmedicineContext context)
        {
            this.context = context;
        }

        [HttpPost]
        [Route("medicine")]
        public async Task<ActionResult<Medicine>> AddMedicine(Medicine med)
        {
            await context.Medicines.AddAsync(med);
            await context.SaveChangesAsync();
            return Ok(med);
        }

        [HttpGet]

        public async Task<ActionResult<List<Medicine>>> GetMedicine()
        {
            var user = await context.Medicines.ToListAsync();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPatch]
        [Route("updateMed/{id}")]
        public async Task<ActionResult<Medicine>> UpdateMed(int id, Medicine med)
        {
            if (id != med.Id)
            {
                return BadRequest();
            }
            context.Entry(med).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(med);
        }

        [HttpDelete]
        [Route("deleteMed/{id}")]
        public bool DeleteMed(int id)
        {
            bool deleted = false;
            var std = context.Medicines.Find(id);
            if (std != null)
            {
                deleted = true;
                context.Medicines.Remove(std);
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
