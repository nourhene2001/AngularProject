using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BookReadingListAPI.Repositories
{
  public interface IRepository<T> where T : class
  {
    Task<List<T>> GetAllIncludingAsync(params Expression<Func<T, object>>[] includeProperties);
    Task<List<T>> GetAllAsync();
    Task<T> GetByIdAsync(int id);
    Task<T?> GetByIdIncludingAsync(int id, Func<IQueryable<T>, IQueryable<T>> include);
    Task AddAsync(T entity);
    void Update(T entity);
    void Delete(T entity);
    bool Any(Expression<Func<T, bool>> predicate);
    Task<bool> ExistsAsync(int id);
  }
}
