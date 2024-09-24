namespace StonkRocket.API.Models
{
    public record UserStock
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int StockId { get; set; }
        public Stock Stock { get; set; }
    }
}
