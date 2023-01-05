using Microsoft.EntityFrameworkCore;
using todoList.Model;
using Task = todoList.Model.Task;

namespace todoList.Data
{
    public class ToDoContext : DbContext
    {

        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        {
            
        }

        DbSet<Task> Tasks { get; set; }

       DbSet<Category> Categories { get; set; }
    }
}
