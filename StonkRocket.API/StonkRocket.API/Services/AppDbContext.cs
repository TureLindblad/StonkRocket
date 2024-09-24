using Microsoft.EntityFrameworkCore;
using StonkRocket.API.Models;
using System;

namespace StonkRocket.API.Services
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<StockDashboard> StockDashboards { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
