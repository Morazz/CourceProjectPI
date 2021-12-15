using CPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PassDataController : ControllerBase
    {
        private readonly DBContext db;

        public PassDataController(DBContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<PassData> Get()
        {
            return db.PassData.ToArray();
        }

        [HttpGet("{id}")]
        public PassData Get(string id)
        {
            return db.PassData.Find(id);
        }

        [HttpGet("ByLog/{log}")]
        public IEnumerable<PassData> GetByLog(string log)
        {
            return db.PassData.Where(pd => pd.login.Contains(log));
        }

        [HttpPost]
        public void Insert(PassData passData)
        {
            var identity = GetIdentity(passData);
            //if (identity == null)
            //{
            //    return BadRequest(new { errorText = "Invalid username or password." });
            //}
            db.PassData.Add(passData);
            db.SaveChanges();
        }

        private ClaimsIdentity GetIdentity(PassData passData)
        {
            PassData pd = db.PassData.FirstOrDefault(x => x.login == passData.login && x.password == passData.password);
            if (pd != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, pd.login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, pd.status)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }

        [HttpDelete]
        public void Delete(string login)
        {
            PassData passd = Get(login);
            if (passd != null)
            {
                db.PassData.Remove(passd);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Update(PassData newPassData)
        {
            PassData passData = Get(newPassData.login);
            if (passData != null)
            {
                passData.password = newPassData.password;
                passData.status = newPassData.status;
                db.PassData.Update(passData);
                db.SaveChanges();
            }
        }
    }
}
