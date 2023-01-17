using todoList.Model;

namespace todoList.DTOs
{
    public class ListDTO
    {

        public string? ListName { get; set; }

        public List<Category>? Categories { get; set; }
    }
}
