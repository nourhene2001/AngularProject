using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookReadingListAPI.Models;
using BookReadingListAPI.Repositories;

namespace BookReadingListAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BooksController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;

    public BooksController(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    // GET: api/Books
    // GET: api/Books
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetBooks()
    {
      var books = await _unitOfWork.Books.GetAllWithDetailsAsync();

      // Debugging: Log the books retrieved
      Console.WriteLine($"Books Count: {books.Count}");

      foreach (var book in books)
      {
        Console.WriteLine($"Book: {book.Title}, Author: {book.Author?.Name}, Genre: {book.Genre?.Name}, Publisher: {book.Publisher?.Name}");
      }

      return Ok(books.Select(b => new
      {
        b.Id,
        b.Title,
        b.Description,
        b.Status,
        GenreId = b.Genre?.Id,
        GenreName = b.Genre?.Name ?? "Unknown",
        AuthorId = b.Author?.Id,
        AuthorName = b.Author?.Name ?? "Unknown",
        PublisherId = b.Publisher?.Id,
        PublisherName = b.Publisher?.Name ?? "Unknown"
      }));
    }



    // GET: api/Books/5
    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetBook(int id)
    {
      var book = await _unitOfWork.Books.GetByIdWithDetailsAsync(id);

      if (book == null)
      {
        return NotFound();
      }

      return Ok(new
      {
        book.Id,
        book.Title,
        book.Description,
        book.Status,
        Genre = book.Genre?.Name ?? "Unknown",
        Author = book.Author?.Name ?? "Unknown",
        Publisher = book.Publisher?.Name ?? "Unknown"
      });
    }
    // POST: api/Books
    
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook([FromBody] BookDto bookDto)
    {
      if (bookDto == null)
      {
        return BadRequest("Book data is null.");
      }

      // Validate related entities
      var genre = await _unitOfWork.Genres.GetByIdAsync(bookDto.GenreId);
      var author = await _unitOfWork.Authors.GetByIdAsync(bookDto.AuthorId);
      var publisher = await _unitOfWork.Publishers.GetByIdAsync(bookDto.PublisherId);
      Console.WriteLine($"Author: {author?.Name}, Genre: {genre?.Name}, Publisher: {publisher?.Name}");
      if (genre == null || author == null || publisher == null)
      {
        return BadRequest("Invalid Genre, Author, or Publisher.");
      }

      // Map DTO to Book entity
      var book = new Book
{
    Title = bookDto.Title,
    Description = bookDto.Description,
    Status = bookDto.Status,
    GenreId = bookDto.GenreId,
    AuthorId = bookDto.AuthorId,
    PublisherId = bookDto.PublisherId,
    Genre = genre, // Populate navigation property
    Author = author, // Populate navigation property
    Publisher = publisher // Populate navigation property
};

      await _unitOfWork.Books.AddAsync(book);
      await _unitOfWork.SaveAsync();

      return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    // DELETE: api/Books/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
      var book = await _unitOfWork.Books.GetByIdAsync(id);
      if (book == null)
      {
        return NotFound();
      }

      _unitOfWork.Books.Delete(book);
      await _unitOfWork.SaveAsync();

      return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDto bookDto)
    {
      if (bookDto == null)
      {
        return BadRequest("Book data is null.");
      }

      var book = await _unitOfWork.Books.GetByIdAsync(id);

      if (book == null)
      {
        return NotFound("Book not found.");
      }

      // Validate related entities
      var genre = await _unitOfWork.Genres.GetByIdAsync(bookDto.GenreId);
      var author = await _unitOfWork.Authors.GetByIdAsync(bookDto.AuthorId);
      var publisher = await _unitOfWork.Publishers.GetByIdAsync(bookDto.PublisherId);

      if (genre == null || author == null || publisher == null)
      {
        return BadRequest("Invalid Genre, Author, or Publisher.");
      }

      // Update the book properties
      book.Title = bookDto.Title;
      book.Description = bookDto.Description;
      book.Status = bookDto.Status;

      // Update the foreign keys if they have changed
      if (book.GenreId != bookDto.GenreId)
      {
        book.GenreId = bookDto.GenreId;
        book.Genre = genre; // Update the Genre navigation property
      }

      if (book.AuthorId != bookDto.AuthorId)
      {
        book.AuthorId = bookDto.AuthorId;
        book.Author = author; // Update the Author navigation property
      }

      if (book.PublisherId != bookDto.PublisherId)
      {
        book.PublisherId = bookDto.PublisherId;
        book.Publisher = publisher; // Update the Publisher navigation property
      }

      // Save the updated book
      _unitOfWork.Books.Update(book);
      await _unitOfWork.SaveAsync();

      return Ok(book);
    }
  }
  }
