using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookReadingListAPI.Models;
using BookReadingListAPI.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReadingListAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthorsController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;

    public AuthorsController(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    // GET: api/Authors
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Author>>> GetAuthors()
    {
      var authors = await _unitOfWork.Authors.GetAllAsync();
      return Ok(authors);
    }

    // GET: api/Authors/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Author>> GetAuthor(int id)
    {
      var author = await _unitOfWork.Authors.GetByIdIncludingAsync(id, q => q.Include(a => a.Books));

      if (author == null)
      {
        return NotFound();
      }

      return Ok(author);
    }


    // PUT: api/Authors/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAuthor(int id, Author author)
    {
      if (id != author.Id)
      {
        return BadRequest();
      }

      _unitOfWork.Authors.Update(author);

      try
      {
        await _unitOfWork.SaveAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!AuthorExists(id))
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

    // POST: api/Authors
    [HttpPost]
    public async Task<ActionResult<Author>> PostAuthor(Author author)
    {
      if (string.IsNullOrEmpty(author.Name))
      {
        return BadRequest("Author name is required.");
      }

      await _unitOfWork.Authors.AddAsync(author);
      await _unitOfWork.SaveAsync();

      return CreatedAtAction("GetAuthor", new { id = author.Id }, author);
    }

    // DELETE: api/Authors/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAuthor(int id)
    {
      var author = await _unitOfWork.Authors.GetByIdAsync(id);
      if (author == null)
      {
        return NotFound();
      }

      // Before deleting, check for any books associated with this author
      if (author.Books.Any())
      {
        return BadRequest("Cannot delete author because books are associated with them.");
      }

      _unitOfWork.Authors.Delete(author);
      await _unitOfWork.SaveAsync();

      return NoContent();
    }

    private bool AuthorExists(int id)
    {
      return _unitOfWork.Authors.Any(e => e.Id == id);
    }
  }
}
