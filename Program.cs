using BookShop.Data;

using BookShop.Model;
using BookShop.Model.Reponsitory;
using BookShop.Model.Server;
using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Stripe;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
                .AddFluentValidation(options =>
                {
                    // Validate child properties and root collection elements
                    options.ImplicitlyValidateChildProperties = true;
                    options.ImplicitlyValidateRootCollectionElements = true;

                    // Automatic registration of validators in assembly
                    options.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
                });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
    });

    option.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(option =>
{
    option.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<MyDBContext>();
    
builder.Services.AddDbContext<MyDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("MyDB"));
});

builder.Services.AddScoped<IBookReponsitory, BookRepository>();
builder.Services.AddScoped<ICategoryReponsitory, CategoryReponsitory>();
builder.Services.AddScoped<IFilterReponsitory, FilterReponsitory>();
builder.Services.AddScoped<IAccountReponsitory, AccountReponsitory>();
builder.Services.AddScoped<IShoppingReponsitory, ShoppingReponsitory>();
builder.Services.AddScoped<IUserReponsitory, UserReponsitory>();
builder.Services.AddScoped<IOrderReponsitory, OrderRepository>();
builder.Services.AddScoped<ICommentReponsitory, CommentReponsitory>();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
{
    option.SaveToken = true;
    option.RequireHttpsMetadata = false;
    option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration["JWT:Secret"]))
    };
});
StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder
                    .WithOrigins("http://localhost:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();
app.MapControllers();

app.Run();
