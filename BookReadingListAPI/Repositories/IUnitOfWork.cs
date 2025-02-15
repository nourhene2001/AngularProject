using System;
using System.Threading.Tasks;

namespace BookReadingListAPI.Repositories
{
  public interface IUnitOfWork : IDisposable
  {
    IAuthorRepository Authors { get; }
    IBookRepository Books { get; }
    IGenreRepository Genres { get; }
    IPublisherRepository Publishers { get; }
    IUserRepository Users { get; }
    Task SaveAsync();
  }
}
