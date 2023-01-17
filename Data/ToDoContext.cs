using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using todoList.Model;
using Task = todoList.Model.Task;

namespace todoList.Data
{
    public class ToDoContext : IdentityDbContext<AppUser>
    {

        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        {
            
        }

        public DbSet<Task> Tasks { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<TodoList> TodoLists { get; set; }


        internal System.Threading.Tasks.Task FindAsync(string? email)
        {
            throw new NotImplementedException();
        }
    }
}
