import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined} from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic';
import React ,{useState}from 'react'
import axios from "axios"
import "./Chat.css"

const Chat = ({messages}) => {
  const [input,setInput]=useState("")

  const sendMessage= async(e)=>{

    e.preventDefault()

   await axios.post("http://localhost:4000/messages/new",{
      message:input,
      name:"Demo",
     timestamp:"Just now.....",
     received:false,
    });
    setInput("")

  }
  return (
    <div className='chat'>
        <div className='chat-header'>
          <Avatar/>
          <div className='chat-headerInfo'>
            <h2>Room name</h2>
            <p>last seen at...</p>

          </div>
          <div className='chat-headerRight'>
            <IconButton>
              <SearchOutlined/>

            </IconButton>
            <IconButton>
              <AttachFile/>
            </IconButton>
            <IconButton>
              <MoreVert/>
            </IconButton>


          </div>


        </div>
        <div className='chat-body'>
          {messages.map((message)=>(
             <p className={`chat-message ${!message.received && "chat-reciever"}`}>
            
             <span className='chat-name'>{message.name}</span>
             {message.message}
             <span className='chat-timestamp'>
               {message.timestamp}
             </span>
             </p>
          ))}
         
         
          
           

        </div>
        <div className='chat-footer'>
          <InsertEmoticon/>
          <form>
          <input value={input}  onChange={(e)=>setInput(e.target.value)}
           placeholder='Type message' type="text" autoComplete="off"/>
          <button onClick={sendMessage} type="submit"> Send message</button>
          </form>
          
          <MicIcon/>
          
            
          
         
         

        </div>
    </div>
  )
}

export default Chat