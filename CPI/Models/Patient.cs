using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class Patient
    {
        [Required]
        [Key, ForeignKey("PassData")]
        public string login { get; set; }
        public PassData PassData { get; set; }
        public string firstname { get; set; }
        public string fathername { get; set; }
        public string surname { get; set; }
        public DateTime birthday { get; set; }
        public string gender { get; set; }
        public string address { get; set; }
        public string phone_number { get; set; }
        public string? mail { get; set; }

        public Patient() { }
    }
}
