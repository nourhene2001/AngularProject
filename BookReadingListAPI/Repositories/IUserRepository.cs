using BookReadingListAPI.Models;

namespace BookReadingListAPI.Repositories
{
  public interface IUserRepository
  {
    Task<User?> GetByUsernameAsync(string username);
    Task<bool> UserExistsAsync(string username);
    Task<bool> RegisterUserAsync(User user, string password);
  }
}
