using Microsoft.EntityFrameworkCore;
using StonkRocket.API.Services;
using System.Data.Common;
using System.Security.Cryptography.X509Certificates;
using StonkRocket.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Runtime.InteropServices;

namespace StonkRocket.API
{
    public class Program
    {
        public record UserResponse(int Id, string Name, IEnumerable<StockResponse> Stocks);
        public record StockResponse(int Id, string Ticker, double Open);
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.MapGet("/dashboard/user/{id}", (AppDbContext db, int id) =>
            {
                var user = db.Users
                    .Include(user => user.UserStocks)
                    .ThenInclude(userStocks => userStocks.Stock)
                    .FirstOrDefault(user => user.Id == id);

                if (user == null) return Results.NotFound();

                var response = new UserResponse(user.Id, user.Name, user.UserStocks.Select(
                    us => new StockResponse(
                        us.Stock.Id, 
                        us.Stock.Ticker, 
                        us.Stock.Open)
                    ).ToList());

                return Results.Ok(response);
            });

            app.UseAuthorization();

            app.Run();
        }
    }
}
