using System.ComponentModel.DataAnnotations;

namespace todoList.DTOs
{
    public class LoginDto
    {
        
    


        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
