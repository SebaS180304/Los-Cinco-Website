# Use the official .NET 8.0 SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only the .csproj file(s) first to leverage Docker layer caching
COPY MyApiProyect/*.csproj ./MyApiProyect/

# Restore dependencies
WORKDIR /app/MyApiProyect
RUN dotnet restore

# Copy the rest of the project files
WORKDIR /app
COPY . .

# Build the application
WORKDIR /app/MyApiProyect
RUN dotnet publish -c Release -o /out

# Use the official .NET 8.0 runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory inside the container
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build /out .

# Coolify will override these variables
ENV WhirlpoolDBConnectionString=""
ENV WhirlpoolDBEncodingKey=""

# Expose the port the app runs on
EXPOSE 5013

# Add a health check for Coolify
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl --fail http://localhost:5013 || exit 1

# Set the entry point for the container
ENTRYPOINT ["dotnet", "MyApiProyect.dll"]