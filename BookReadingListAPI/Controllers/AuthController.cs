using BookReadingListAPI.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
  private readonly IUserService _userService;
  private readonly JwtService _jwtService;

  public AuthController(IUserService userService, JwtService jwtService)
  {
    _userService = userService;
    _jwtService = jwtService;
  }

  [HttpPost("register")]
  public async Task<ActionResult> Register([FromBody] RegisterRequest request)
  {
    if (await _userService.UserExistsAsync(request.UserName))
    {
      return BadRequest("Username is already taken.");
    }

    var success = await _userService.RegisterUserAsync(request.UserName, request.Email, request.Password);
    if (!success)
    {
      return BadRequest("Failed to register user.");
    }

    return Ok("Registration successful");
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginRequest request)
  {
    if (request == null || string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
    {
      return BadRequest("Username and password are required.");
    }

    var user = await _userService.AuthenticateUserAsync(request.UserName, request.Password);

    if (user == null)
    {
      Console.WriteLine("❌ User authentication failed.");
      return Unauthorized("Invalid username or password.");
    }

    if (string.IsNullOrEmpty(user.UserName))
    {
      Console.WriteLine("❌ User object is found but UserName is NULL!");
      return StatusCode(500, "Internal Server Error: UserName is null.");
    }

    Console.WriteLine($"✅ User authenticated: {user.UserName}");

    string token = _jwtService.GenerateJwtToken(user.UserName);
    return Ok(new { token });
  }



}
