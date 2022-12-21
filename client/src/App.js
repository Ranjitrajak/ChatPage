
import './App.css';
import React,{useEffect,useState} from 'react';
import Pusher from "pusher-js"
import Chat from './Chat';
import Sidebar from './Sidebar';
import axios from "axios";

function App() {
  const [messages,setMessage]=useState([])

  useEffect(()=>{
    axios.get("http://localhost:4000/messages")
    .then(response=>{
      setMessage(response.data)
    })
  },[])

  useEffect(()=>{
    const pusher = new Pusher('ade92cd0d131d31dead9', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('message');
    channel.bind('inserted', function(data) {
      // alert(JSON.stringify(data));
      setMessage([...messages,data])
    });
    return()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }


  },[messages])
  console.log(messages)

  return (
    <div className="App">
      <div className='app-body'>
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
