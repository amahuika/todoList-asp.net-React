namespace todoList.Model
{
    public class TodoList
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }

        public Guid AppUserId { get; set; }


        public List<Category>? Categories { get; set; }
    }
}
