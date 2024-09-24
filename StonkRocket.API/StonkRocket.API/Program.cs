using Microsoft.EntityFrameworkCore;
using StonkRocket.API.Services;

namespace StonkRocket.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            /*var d = new ApplicationDbContextFactory();*/
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
                var user = db.Users.FirstOrDefault(u => u.Id == $"{id}");

                if (user == null) return Results.NotFound();

                var dashboard = db.StockDashboards
                                  .Include(sd => sd.Stocks)
                                  .FirstOrDefault(st => st.Id == 1);

                if (dashboard == null) return Results.NotFound("Dashboard not found");

                var stocks = dashboard.Stocks.Select(stock => new Models.Stock
                {
                    Id = stock.Id,
                    Ticker = stock.Ticker,
                    Open = stock.Open,
                    High = stock.High,
                    Low = stock.Low,
                    Close = stock.Close,
                    Volume = stock.Volume,
                    VolumeWeightedAveragePrice = stock.VolumeWeightedAveragePrice,
                    Transactions = stock.Transactions
                }).ToList();

                user.StockDashboard = new Models.StockDashboard
                {
                    Stocks = stocks
                };

                return Results.Ok(user);
            });

            app.UseAuthorization();

            app.Run();
        }
    }
}
