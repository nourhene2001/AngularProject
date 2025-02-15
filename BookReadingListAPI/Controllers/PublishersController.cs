using Microsoft.AspNetCore.Mvc;
using BookReadingListAPI.Models;
using BookReadingListAPI.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookReadingListAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PublishersController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;

    public PublishersController(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    // GET: api/Publishers
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Publisher>>> GetPublishers()
    {
      var publishers = await _unitOfWork.Publishers.GetAllAsync();
      return Ok(publishers);
    }

    // GET: api/Publishers/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Publisher>> GetPublisher(int id)
    {
      var publisher = await _unitOfWork.Publishers.GetByIdAsync(id);

      if (publisher == null)
      {
        return NotFound();
      }

      return Ok(publisher);
    }

    // PUT: api/Publishers/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPublisher(int id, Publisher publisher)
    {
      if (id != publisher.Id)
      {
        return BadRequest();
      }

      _unitOfWork.Publishers.Update(publisher);

      try
      {
        await _unitOfWork.SaveAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!PublisherExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Publishers
    [HttpPost]
    public async Task<ActionResult<Publisher>> PostPublisher(Publisher publisher)
    {
      if (string.IsNullOrEmpty(publisher.Name))
      {
        return BadRequest("Publisher name is required.");
      }

      await _unitOfWork.Publishers.AddAsync(publisher);
      await _unitOfWork.SaveAsync();

      return CreatedAtAction("GetPublisher", new { id = publisher.Id }, publisher);
    }

    // DELETE: api/Publishers/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePublisher(int id)
    {
      var publisher = await _unitOfWork.Publishers.GetByIdAsync(id);
      if (publisher == null)
      {
        return NotFound();
      }

      _unitOfWork.Publishers.Delete(publisher);
      await _unitOfWork.SaveAsync();

      return NoContent();
    }

    private bool PublisherExists(int id)
    {
      return _unitOfWork.Publishers.Any(e => e.Id == id);
    }
  }
}
