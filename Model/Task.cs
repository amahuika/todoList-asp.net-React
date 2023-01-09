using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todoList.Model
{
    public class Task
    {
       
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public bool IsComplete { get; set; }

        public Guid CategoryId { get; set; }

        public Category? Category { get; set; }
    }
}
