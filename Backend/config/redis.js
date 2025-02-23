const redis = require("redis");

// Create Redis client
const redisClient = redis.createClient({
  host: "127.0.0.1", // Default Redis host
  port: 6379, // Default Redis port
});

// Handle Redis connection
redisClient.on("connect", () => {
  console.log("✅ Redis connected successfully!");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

// Promisify Redis for Async/Await (Optional)
const { promisify } = require("util");
redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
redisClient.setAsync = promisify(redisClient.set).bind(redisClient);

module.exports = redisClient;
