namespace StonkRocket.API.Models
{
    public class StockDashboard
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<Stock> Stocks { get; set; }
    }
}
