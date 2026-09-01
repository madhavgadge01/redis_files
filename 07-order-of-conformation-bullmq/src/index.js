import express from "express"
import Redis from "ioredis"


const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL||'redis://localhost:6379');

const QUEUE_KEY = 'queue:emails';

app.post('/email',async (req,res)=>{
  const job ={
    to:req.body.to,
    subject:req.body.subject||'no subject',
    body:req.body.body,
    createdAt: new Date().toISOString()

  }

  await redis.lpush(QUEUE_KEY,JSON.stringify(job));
  req.json({queud:true,job});
})
app.get('/email/process-one',async(req,res)=>{
  const rawjob= await redis.rpop(QUEUE_KEY);
  if(!rawjob){
    return res.json({message:'no job in queue'})
  }
  const job =JSON.parse(rawjob);
  res.status(200).json({message:'emial sent',job})
})































app.listen(3000,()=>{
    console.log("sever id runing on port 3000")
})