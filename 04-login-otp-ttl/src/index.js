import express from "express"
import Redis from "ioredis"

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL||'redis://localhost:6379');

function otpkey(phone){
  return `opt:${phone}`;
}

app.post('/send-otp',async(req,res)=>{
  const { phone } = req.body;
  const otp = Math.floor(10000+Math.random()*900000).toString();
  await redis.set(otpkey(phone),otp,'EX',3000000)
  res.json({message:'otp sent',otp})
});

app.post('/otp/verify',async(req,res)=>{
  const {phone,otp}=req.body;
  const saveOtp = await redis.get(otpkey(phone));
  if(!saveOtp){
    res.status(401).json({message:'otp is expiry'})
  }
  if(saveOtp!=otp){
    res.status(401).json({message:'otp is not correct'})
  }

  await redis.del(otpkey(phone));
  res.status(200).json({message:'OTP virify successfully'})
})

app.get('/otp/:phone/ttl',async(req,res)=>{
  const ttl = await redis.ttl(otpkey(req.params.phone));
  res.json({ttl})

})

app.listen(3000,()=>{
    console.log("sever id runing on port 3000")
})