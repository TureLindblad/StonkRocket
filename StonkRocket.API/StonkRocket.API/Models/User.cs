﻿namespace StonkRocket.API.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int StockDashboardId { get; set; }
        public StockDashboard StockDashboard { get; set; }
    }
}
