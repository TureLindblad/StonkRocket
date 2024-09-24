namespace StonkRocket.API.Models
{
    public record User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserStock> UserStocks { get; set; }
    }
}
