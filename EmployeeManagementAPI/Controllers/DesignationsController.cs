using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DesignationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DesignationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDesignations()
        {
            return Ok(await _context.Designations.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddDesignation(
            Designation designation)
        {
            _context.Designations.Add(designation);

            await _context.SaveChangesAsync();

            return Ok(designation);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDesignation(int id)
        {
            var des =
                await _context.Designations.FindAsync(id);

            if (des == null)
                return NotFound();

            _context.Designations.Remove(des);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}