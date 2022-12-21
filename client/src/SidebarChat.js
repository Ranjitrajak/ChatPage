import { Avatar } from '@mui/material'
import React from 'react'
import "./SidebarChat.css"

const SidebarChat = () => {
  return (
    <div className='sidebarchat'>
        
        <Avatar/>
        <div className='chatInfo'>
            <h2>Room name</h2>
            <p>last seen msg</p>


        </div>
        
        </div>
  )
}

export default SidebarChat