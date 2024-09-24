namespace StonkRocket.API.Models
{
    public record Stock
    {
        public int Id { get; set; }
        public string? Ticker { get; set; }
        public double Open { get; set; }
        public double High { get; set; }
        public double Low { get; set; }
        public double Close { get; set; }
        public double Volume { get; set; }
        public double VolumeWeightedAveragePrice { get; set; }
        public int Transactions { get; set; }
        public ICollection<StockDashboard> StockDashboards { get; set; }
    }
}
