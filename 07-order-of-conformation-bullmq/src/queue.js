import { Queue }from "bullmq"
const connection = {
    host:'localhost',
    port:6379,
};
const emailqueue = new Queue('emails',{connection});
module.export={
    emailqueue,connection
}