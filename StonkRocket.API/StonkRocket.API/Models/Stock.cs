namespace StonkRocket.API.Models
{
    public record Stock
    {
        public int Id { get; set; }
        public string? Ticker { get; set; }
        public ICollection<UserStock> UserStocks { get; set; }
    }
}
