import express from "express"
import Redis from "ioredis"

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL||'redis://localhost:6379');

const BANNER_KEY = "app.banner";

app.post("/banner",async(req,res)=>{
  await redis.set(BANNER_KEY,req.body.message||"welcom to evenjo set");
res.json({success:true});
})

app.get("/banner",async(req,res)=>{
  const message = await redis.get(BANNER_KEY);
  res.json({ message });
})

app.delete("/banner",async(req,res)=>{
  await redis.del(BANNER_KEY);
  res.json({ success:true });
})

app.get("/banner/exists",async(req,res)=>{
  const exists = await redis.exists(BANNER_KEY);
  res.json({ exists: !!exists });
  //.   !! for boolean shortcut hai vo boolean(exists) aisa bhi likh sakte the 
})

app.get('/redis',async(req,res)=>{
    const replay = await redis.ping();
res.json({ redis: replay });
})



app.listen(3000,()=>{
    console.log("sever id runing on port 3000")
})