using BookReadingListAPI.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace BookReadingListAPI.Repositories
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly AppDbContext _context;
    private readonly UserManager<User> _userManager; // Inject UserManager for user-related operations

    public IAuthorRepository Authors { get; }
    public IBookRepository Books { get; }
    public IGenreRepository Genres { get; }
    public IPublisherRepository Publishers { get; }
    public IUserRepository Users { get; }

    // Constructor accepts UserManager for user-related functionality
    public UnitOfWork(AppDbContext context, UserManager<User> userManager)
    {
      _context = context;
      _userManager = userManager;

      // Initialize repositories
      Authors = new AuthorRepository(context);
      Books = new BookRepository(context);
      Genres = new GenreRepository(context);
      Publishers = new PublisherRepository(context);
      Users = new UserRepository(userManager); // Corrected: Pass UserManager into UserRepository
    }

    // Save changes asynchronously
    public async Task SaveAsync()
    {
      await _context.SaveChangesAsync();
    }

    // Dispose context when done
    public void Dispose()
    {
      _context.Dispose();
    }
  }
}
