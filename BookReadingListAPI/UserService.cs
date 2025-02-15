using BookReadingListAPI.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

public class UserService : IUserService
{
  private readonly UserManager<User> _userManager;

  public UserService(UserManager<User> userManager)
  {
    _userManager = userManager;
  }

  public async Task<bool> UserExistsAsync(string username)
  {
    var user = await _userManager.FindByNameAsync(username);
    return user != null;
  }

  public async Task<bool> RegisterUserAsync(string username, string email, string password)
  {
    var user = new User
    {
      UserName = username,
      Email = email
    };

    var result = await _userManager.CreateAsync(user, password);

    if (!result.Succeeded)
    {
      // Log the errors
      foreach (var error in result.Errors)
      {
        Console.WriteLine($"Error: {error.Description}");
      }
    }

    return result.Succeeded;
  }


  public async Task<User?> AuthenticateUserAsync(string username, string password)
  {
    Console.WriteLine($"🔍 Searching for user: {username}");

    var user = await _userManager.FindByNameAsync(username);

    if (user == null)
    {
      Console.WriteLine("❌ User not found.");
      return null;
    }

    Console.WriteLine($"✅ User found: {user.UserName}");

    bool passwordValid = await _userManager.CheckPasswordAsync(user, password);
    if (!passwordValid)
    {
      Console.WriteLine("❌ Incorrect password.");
      return null;
    }

    if (string.IsNullOrEmpty(user.UserName))
    {
      Console.WriteLine("❌ User exists but has NULL UserName in DB!");
    }

    return user;
  }


}
