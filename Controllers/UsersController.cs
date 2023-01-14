using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todoList.Data;
using todoList.DTOs;
using todoList.Model;
using todoList.Services;
using Task = todoList.Model.Task;

namespace todoList.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;



        public UsersController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;

        }



        // Get current user sent with token in header
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);


        }




        // POST: /users/login

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //find email
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            // chaeck if null
            if (user == null) {
                return Unauthorized("No matching email");
            }

            // check password matches with email
            var results = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            // set new dto if it matches returning username and token
            if (results)
            {
                return CreateUserObject(user);
            } else
            {
                return Unauthorized("Incorrect password");
            }

           

        }

        // post new user
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await _userManager.Users.AnyAsync(u => u.UserName == registerDto.UserName))
            {
                return BadRequest("*Username is already taken");
            }

            if (await _userManager.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return BadRequest("*Email is already taken");
            }

            var user = new AppUser
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");


        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
            };
        }
    }
}
