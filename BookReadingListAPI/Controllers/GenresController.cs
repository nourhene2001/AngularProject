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
  public class GenresController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;

    public GenresController(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    // GET: api/Genres
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Genre>>> GetGenres()
    {
      var genres = await _unitOfWork.Genres.GetAllIncludingAsync(g => g.Books);  // Eager loading Books
      return Ok(genres);
    }

    // GET: api/Genres/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Genre>> GetGenre(int id)
    {
      var genre = await _unitOfWork.Genres.GetByIdIncludingAsync(id, query => query);

      if (genre == null)
      {
        return NotFound();
      }

      return Ok(genre);
    }

    // PUT: api/Genres/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutGenre(int id, Genre genre)
    {
      if (id != genre.Id)
      {
        return BadRequest();
      }

      _unitOfWork.Genres.Update(genre);

      try
      {
        await _unitOfWork.SaveAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!GenreExists(id))
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

    // POST: api/Genres
    [HttpPost]
    public async Task<ActionResult<Genre>> PostGenre(Genre genre)
    {
      if (string.IsNullOrEmpty(genre.Name))
      {
        return BadRequest("Genre name is required.");
      }

      await _unitOfWork.Genres.AddAsync(genre);
      await _unitOfWork.SaveAsync();

      return CreatedAtAction("GetGenre", new { id = genre.Id }, genre);
    }

    // DELETE: api/Genres/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGenre(int id)
    {
      var genre = await _unitOfWork.Genres.GetByIdAsync(id);
      if (genre == null)
      {
        return NotFound();
      }

      // Before deleting, check if any books are associated with this genre
      if (genre.Books.Any())
      {
        return BadRequest("Cannot delete genre because books are associated with it.");
      }

      _unitOfWork.Genres.Delete(genre);
      await _unitOfWork.SaveAsync();

      return NoContent();
    }

    private bool GenreExists(int id)
    {
      return _unitOfWork.Genres.Any(e => e.Id == id);
    }
  }
}
