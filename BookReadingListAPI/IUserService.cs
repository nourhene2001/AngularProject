using BookReadingListAPI.Models;
using System.Threading.Tasks;

public interface IUserService
{
  Task<bool> UserExistsAsync(string username);
  Task<bool> RegisterUserAsync(string username, string email, string password);
  Task<User> AuthenticateUserAsync(string username, string password);
}
