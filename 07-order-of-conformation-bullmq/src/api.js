import express from "express"
import {emailqueue}from "./queue"
import { Backoffs } from "bullmq";
const app = express();
app.use(express.json());

app.post("/welcome-email",async(req,res)=>{
const job = emailqueue.add("welcome-to-evenjo",
{
to:req.body.to,
name:req.body.name||"madhav"
},{
    attempts:3,
    Backoffs:{
        type:"exponential",
        delay:1000,
    },
});
res.json({message:"welcome to job added to the queue!",jobId:job.id})
});
app.listen(3000,()=>{
    console.log("port is runing on 3000")
})