import { connection } from "./queue.js"

const worker = new Worker("email",async(job)=>{
    console.log("email is prosseing",job.id,job.data,job.name);
    (await new Promise((resolve)=>setTimeout(resolve,1500)),
console.log("email is prossecing",job.id,job.data,job.name));
},{connection}
)
worker.on("completed",(job)=>{
    console.log("job completed",job.id,job.name,job.data);
})
worker.on("failed",(job,err)=>{
    console.log("job failed",job.id,job.name,job.data);
})