using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BookReadingListAPI.Models
{
  public class AppDbContext : IdentityDbContext<User> // Use IdentityDbContext<User> for Identity support
  {
    public DbSet<Book> Books { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<Author> Authors { get; set; }
    public DbSet<Publisher> Publishers { get; set; }
    public DbSet<User> Users { get; set; }  // The Users table is automatically handled by Identity

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Configure relationships between Book and other entities
      modelBuilder.Entity<Book>()
          .HasOne(b => b.Genre)
          .WithMany(g => g.Books)
          .HasForeignKey(b => b.GenreId)
          .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

      modelBuilder.Entity<Book>()
          .HasOne(b => b.Author)
          .WithMany(a => a.Books)
          .HasForeignKey(b => b.AuthorId)
          .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

      modelBuilder.Entity<Book>()
          .HasOne(b => b.Publisher)
          .WithMany(p => p.Books)
          .HasForeignKey(b => b.PublisherId)
          .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

      // Optional: Add unique constraints or indexes if needed
      modelBuilder.Entity<Genre>()
          .HasIndex(g => g.Name)
          .IsUnique();

      modelBuilder.Entity<Author>()
          .HasIndex(a => a.Name)
          .IsUnique();

      modelBuilder.Entity<Publisher>()
          .HasIndex(p => p.Name)
          .IsUnique();



      // Optional: Configure custom table names for other entities (if needed)
      modelBuilder.Entity<User>().ToTable("aspnetusers");  // If you want to map to the 'users' table
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        optionsBuilder.UseMySql("Server=localhost;Database=BookReadingListDB;User=root;Password=your_password;",
            new MySqlServerVersion(new Version(15, 0, 27))); // Ensure MySQL version matches your environment
      }
    }
  }
}
