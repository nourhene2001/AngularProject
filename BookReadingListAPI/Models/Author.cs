namespace BookReadingListAPI.Models
{
  public class Author
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public ICollection<Book> Books { get; set; } // Navigation property
  }
}
