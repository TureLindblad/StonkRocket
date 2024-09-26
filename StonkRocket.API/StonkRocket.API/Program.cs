using Microsoft.EntityFrameworkCore;
using StonkRocket.API.Services;
using System.Data.Common;
using System.Security.Cryptography.X509Certificates;
using StonkRocket.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Builder;
using static StonkRocket.API.DTO.DTO;
using Microsoft.AspNetCore.Mvc;

namespace StonkRocket.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IUsersService, UsersService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("allowAll", policy => policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("allowAll");

            app.UseHttpsRedirection();

            app.MapGet("/user/{id}", (IUsersService usersService, int id) 
                => usersService.GetUserByID(id));

            app.MapPost("/user/stocks/{id}", (IUsersService userService, 
                int id, 
                [FromBody] PostUserStockRequest stockRequest) 
                => userService.PostUserStock(stockRequest.Ticker, id));

            app.MapPost("/stock/{ticker}", (IUsersService userService, string ticker)
                => userService.PostStock(ticker));

            app.MapDelete("/user/stocks/{id}", (IUsersService userService,
                int id,
                HttpContext httpContext)
                => 
                {
                    var ticker = httpContext.Request.Query["ticker"].ToString();
                    userService.DeleteUserStock(ticker, id);
                });

            app.UseAuthorization();

            app.Run();
        }
    }
}
