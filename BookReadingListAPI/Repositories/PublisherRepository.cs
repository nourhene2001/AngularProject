using BookReadingListAPI.Models;

namespace BookReadingListAPI.Repositories
{
  public interface IPublisherRepository : IRepository<Publisher> { }

  public class PublisherRepository : Repository<Publisher>, IPublisherRepository
  {
    public PublisherRepository(AppDbContext context) : base(context) { }
  }
}
