using BookReadingListAPI.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class JwtService
{
  private readonly string _secretKey;

  public JwtService(IConfiguration configuration)
  {
    _secretKey = configuration["Jwt:SecretKey"]; // Store secret in appsettings.json
  }

  public string GenerateJwtToken(string username)

  {
    Console.WriteLine($"✅ User authenticated: {username}");
    if (string.IsNullOrEmpty(username))
    {
      Console.WriteLine("❌ Username is null or empty in GenerateJwtToken method.");
      throw new ArgumentNullException(nameof(username), "Username cannot be null or empty.");
    }

    var claims = new[]
    {
        new Claim(ClaimTypes.Name, username)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: "BookReadingListAPI",
        audience: "BookReadingListAPI",
        claims: claims,
        expires: DateTime.Now.AddHours(1),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
  }


}


