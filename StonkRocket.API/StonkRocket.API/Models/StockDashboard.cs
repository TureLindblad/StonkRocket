namespace StonkRocket.API.Models
{
    public record StockDashboard
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<Stock> Stocks { get; set; }
    }
}
