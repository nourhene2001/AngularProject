using BookReadingListAPI.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace BookReadingListAPI.Repositories
{
  public class UserRepository : IUserRepository
  {
    private readonly UserManager<User> _userManager;

    public UserRepository(UserManager<User> userManager)
    {
      _userManager = userManager;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
      return await _userManager.FindByNameAsync(username);
    }

    public async Task<bool> UserExistsAsync(string username)
    {
      return await _userManager.FindByNameAsync(username) != null;
    }

    public async Task<bool> RegisterUserAsync(User user, string password)
    {
      var result = await _userManager.CreateAsync(user, password);
      return result.Succeeded;
    }
  }
}
