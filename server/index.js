import express from "express"
// import cors from "cors"
import mongoose from "mongoose"
import cors from "cors"
import Pusher from "pusher"
import Messages from "./Messages.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
// app.use(cors())
const pusher = new Pusher({
    appId: "1527344",
    key: "ade92cd0d131d31dead9",
    secret: "090510547786dc37a9aa",
    cluster: "ap2",
    useTLS: true
  });

mongoose.connect("mongodb+srv://Ranjitmongo:ranjitmongo@cluster0.ul51s.mongodb.net/chatApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})
//Pusher connection

const db=mongoose.connection

db.once("open",()=>{
    console.log("Db connected");

    const msgCollection=db.collection("messagecontents");

    const changeStream=msgCollection.watch();

    changeStream.on("change",(change)=>{
        // console.log(change);

        if(change.operationType==="insert"){

            const messageDetails=change.fullDocument;

            pusher.trigger("message","inserted",{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received


            })
        }else{
            console.log("Error triggering Pusher")
        }
    })

})

app.post("/messages/new",(req,res)=>{
    const message=req.body
    Messages.create(message,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(`new message created:\n ${data}`)
        }
    })
})
app.get("/messages",(req,res)=>{
   
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})


app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});