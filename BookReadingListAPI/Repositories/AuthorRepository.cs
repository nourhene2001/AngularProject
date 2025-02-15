using BookReadingListAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BookReadingListAPI.Repositories
{
  public interface IAuthorRepository : IRepository<Author> { }
  public class AuthorRepository : Repository<Author>, IAuthorRepository
  {
    public AuthorRepository(AppDbContext context) : base(context) { }
    public async Task<List<Author>> GetAllWithBooksAsync()
    {
      return await _context.Authors
          .Include(a => a.Books)
          .ToListAsync();
    }
  }
  }
  

