using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyApiProyect;
using MyApiProyect.Models;
using MyApiProyect.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

var connectionString = Environment.GetEnvironmentVariable("WhirlpoolDBConnectionString");
var encodingKey = Environment.GetEnvironmentVariable("WhirlpoolDBEncodingKey");

if(encodingKey is null || connectionString is null || encodingKey == "" || connectionString == "")
{
    throw new Exception("Environment variables not set. Please set 'WhirlpoolDBConnectionString' and 'WhirlpoolDBEncodingKey'.");
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string Audience = builder.Configuration["JwtSettings:Audience"] ?? string.Empty;
string Issuer = builder.Configuration["JwtSettings:Issuer"] ?? string.Empty;
int TokenExpirationTime = int.Parse(builder.Configuration["JwtSettings:Time"] ?? "0");

builder.Services.AddAuthentication(x => 
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience =true,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = Audience,
        ValidIssuer = Issuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(encodingKey)),
    };
});

builder.Services.AddAuthorization();


//Dependency Injection
builder.Services.AddScoped<ICursosDeAlumnoService, CursosDeAlumnosService>();
builder.Services.AddScoped<IUserLogin>(provider => 
    new UserLogin(provider.GetRequiredService<WebsiteContext>(), encodingKey, Issuer, Audience, TokenExpirationTime));
builder.Services.AddScoped<ICursosService, CursosService>();
builder.Services.AddScoped<IQuizService, QuizService>();
// Configure Entity Framework with MySQL

builder.Services.AddDbContext<WebsiteContext>(options =>
    options.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(8, 0, 32)) // Adjust MySQL version as needed
    ));


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});


builder.WebHost.UseUrls( "http://0.0.0.0:5011");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();


