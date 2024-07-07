using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EMedicine.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace EMedicine.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EmedicineContext context;
        public UsersController(EmedicineContext context)
        {
            this.context = context;
        }

        [HttpPost]
        [Route("registration")]
        public async Task<ActionResult<User>> Registration(User std)
        {
            await context.Users.AddAsync(std);
            await context.SaveChangesAsync();
            return Ok(std);
        }

        [HttpGet]
        [Route("ReadUser/email/{email}")]

        public async Task<ActionResult<List<User>>> GetMedbyid(string email)
        {
            var user = await context.Users.Where(e => e.Email == email).ToListAsync();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<List<User>>> GetMedbyid(User  user)
        {
            var myUser = await context.Users.Where(e => e.Email == user.Email).FirstOrDefaultAsync();
            if (myUser != null)
            {
                HttpContext.Session.SetString("Email", myUser.Email);
                HttpContext.Session.SetString("Id", myUser.Id.ToString());
                HttpContext.Session.SetString("Password", myUser.Password);
                HttpContext.Session.SetString("firstName", myUser.FirstName);
                HttpContext.Session.SetString("lastName", myUser.LastName);
                return Ok(new {Message = "Login Successful"});
            }
            return Unauthorized(new {Message = "Invalid Credentials"});
        }

        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
           HttpContext.Session.Clear();

            return Ok(new {Message = "Logout Successful."});
        }

        [HttpGet]
        [Route("profile")]
        public IActionResult GetProfile()
        {
            var email = HttpContext.Session.GetString("Email");
            var id = HttpContext.Session.GetString("Id");
            var password = HttpContext.Session.GetString("Password");
            var firstname = HttpContext.Session.GetString("firstName");
            var lastname = HttpContext.Session.GetString("lastName");

            if(string.IsNullOrEmpty(email))
            {
                return Unauthorized(new { Messaage = "Not Loggeg In" });
            }

            return Ok(new {Email = email, Id = id, Password = password, FirstName = firstname, LastName = lastname});
        }

        [HttpGet]
        [Route("ReadUser/{id}")]
        public async Task<ActionResult<List<User>>> GetUserById(int id)
        {
            var user = await context.Users.FindAsync(id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPatch]
        [Route("updateUser/{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            context.Entry(user).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(user);
        }


        [HttpGet]
        [Route("ReadUser")]
        public async Task<ActionResult<List<User>>> GetUser()
        {
            var myuser = await context.Users.ToListAsync();
            if (myuser == null)
            {
                return NotFound();
            }
            return Ok(myuser);
        }






    }
}
