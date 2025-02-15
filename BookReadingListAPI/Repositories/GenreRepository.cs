using BookReadingListAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BookReadingListAPI.Repositories
{
  public interface IGenreRepository : IRepository<Genre>
  {
  }

  public class GenreRepository : Repository<Genre>, IGenreRepository
  {
    public GenreRepository(AppDbContext context) : base(context) { }

  }
}
