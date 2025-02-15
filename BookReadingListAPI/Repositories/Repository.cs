using BookReadingListAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BookReadingListAPI.Repositories
{
  public class Repository<T> : IRepository<T> where T : class
  {
    protected readonly AppDbContext _context;
    private readonly DbSet<T> _entities;

    public Repository(AppDbContext context)
    {
      _context = context;
      _entities = context.Set<T>();
    }

    public async Task<List<T>> GetAllIncludingAsync(params Expression<Func<T, object>>[] includeProperties)
    {
      IQueryable<T> query = _entities;
      foreach (var includeProperty in includeProperties)
      {
        query = query.Include(includeProperty);
      }
      return await query.ToListAsync();
    }

    public async Task<List<T>> GetAllAsync()
    {
      return await _entities.ToListAsync();
    }

    public async Task<T> GetByIdAsync(int id)
    {
      return await _entities.FindAsync(id);
    }
    

    public async Task<T?> GetByIdIncludingAsync(int id, Func<IQueryable<T>, IQueryable<T>> include)
    {
      IQueryable<T> query = _entities;
      query = include(query);
      return await query.FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == id);
    }

    public async Task AddAsync(T entity)
    {
      await _entities.AddAsync(entity);
    }

    public void Update(T entity)
    {
      _entities.Update(entity);
    }

    public void Delete(T entity)
    {
      _entities.Remove(entity);
    }

    public bool Any(Expression<Func<T, bool>> predicate)
    {
      return _entities.Any(predicate);
    }
    public async Task<bool> ExistsAsync(int id)
    {
      return await _context.Genres.AnyAsync(g => g.Id == id);
    }
  }
}
