using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPI.Models
{
    public class Moderator
    {
        [Key, ForeignKey("PassData")]
        public string login { get; set; }
        public PassData PassData { get; set; }
        [ForeignKey("hospital_id")]
        public Hospital? Hospital { get; set; }
        public string? hospital_id { get; set; }

    }
}
