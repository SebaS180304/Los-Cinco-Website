using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyApiProyect;
using MyApiProyect.Models;
using MyApiProyect.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("WhirlpoolDBConnectionString");
var encodingKey = builder.Configuration["WhirlpoolDBEncodingKey"];

if (string.IsNullOrEmpty(encodingKey) || string.IsNullOrEmpty(connectionString))
{
    throw new Exception("Missing configuration. Please set 'WhirlpoolDBConnectionString' and 'WhirlpoolDBEncodingKey' in appsettings.json.");
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
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = Audience,
        ValidIssuer = Issuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(encodingKey)),
    };
});

builder.Services.AddAuthorization();

// ✅ Inyectar servicios
builder.Services.AddScoped<ICursosDeAlumnoService, CursosDeAlumnosService>();
builder.Services.AddScoped<IUserLogin>(provider =>
    new UserLogin(provider.GetRequiredService<WebsiteContext>(), encodingKey, Issuer, Audience, TokenExpirationTime));
builder.Services.AddScoped<ICursosService, CursosService>();
builder.Services.AddScoped<IQuizService, QuizService>();

// ✅ Configurar EF Core con MySQL
builder.Services.AddDbContext<WebsiteContext>(options =>
    options.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(8, 0, 32))
    ));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

builder.WebHost.UseUrls("http://0.0.0.0:5011");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();


