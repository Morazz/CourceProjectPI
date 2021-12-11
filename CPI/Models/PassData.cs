using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CPI.Models
{
    public class PassData
    {
        [Key]
        public string login { get; set; }
        public string password { get; set; }
        public string status { get; set; }

        public PassData(string login, string password, string status)
        {
            this.login = login;
            this.password = password;
            this.status = status;
        }

        public PassData(string login, string password)
        {
            this.login = login;
            this.password = password;
            this.status = "Пациент";
        }

        public PassData() { } 
    }
}
