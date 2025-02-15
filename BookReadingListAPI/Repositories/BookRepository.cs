using BookReadingListAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReadingListAPI.Repositories
{
  public interface IBookRepository : IRepository<Book>
  {
    Task<List<Book>> GetAllWithDetailsAsync();
    Task<Book?> GetByIdWithDetailsAsync(int id);
  }
  public class BookRepository : Repository<Book>, IBookRepository
  {
    public BookRepository(AppDbContext context) : base(context) { }

    public async Task<List<Book>> GetAllWithDetailsAsync()
    {
      return await _context.Books
          .Include(b => b.Author)
          .Include(b => b.Genre)
          .Include(b => b.Publisher)
          .ToListAsync();
    }

    public async Task<Book?> GetByIdWithDetailsAsync(int id)
    {
      return await _context.Books
          .Include(b => b.Genre)
          .Include(b => b.Author)
          .Include(b => b.Publisher)
          .FirstOrDefaultAsync(b => b.Id == id);
    }
  }
}
