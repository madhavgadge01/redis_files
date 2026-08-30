import express from "express"
import Redis from "ioredis"
import mongoose from "mongoose"
const app = express();

const redis = new Redis(process.env.REDIS_URL||'redis://localhost:6379');

app.get('/redis',async(req,res)=>{
    const replay = await redis.ping();
res.json({ redis: replay });
})

app.get("/mongo", async (req, res) => {
  try {
    const url =
      process.env.MONGO_URL ||
      "mongodb://localhost:27017/chai_aur_redis";

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(url);
    }

    res.json({
      mongo: "connected"
    });
  } catch (error) {
    res.status(500).json({
      message: "MongoDB connection failed",
      error: error.message
    });
  }
});

app.listen(3000,()=>{
    console.log("sever id runing on port 3000")
})