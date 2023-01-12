using System.ComponentModel.DataAnnotations;

namespace todoList.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must include a lowercase letter, uppercase letter, a number and be between 4-8 characters long")]
        public string? Password { get; set; }
    }
}
