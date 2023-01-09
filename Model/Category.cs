namespace todoList.Model
{
    public class Category
    {

        public Guid Id { get; set; }

        public string? Name { get; set; }

        public List<Task>? Tasks { get; set; }
    }
}
