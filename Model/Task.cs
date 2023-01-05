using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todoList.Model
{
    public class Task
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public bool IsComplete { get; set; }
            
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
    }
}
