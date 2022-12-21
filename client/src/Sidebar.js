import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar,IconButton} from '@mui/material';
import {SearchOutlined} from '@mui/icons-material'
import SidebarChat from './SidebarChat';

const Sidebar = () => {
  return (
    <div className='sidebar'>
       
        <div className='sidebar-header'>
          <Avatar/>

          
          <div className='sidebar-headerRight'>
           
            <IconButton>
            <DonutLargeIcon/>
             <ChatIcon/>
             <MoreVertIcon/>
             </IconButton>
          
            

          </div>

        </div>
        <div className='sidebar-search'>
          <div className='sidebar-searchContainer'>
            <SearchOutlined/>
            <input placeholder='search or start new chat' type="text"/>

          </div>

        </div>
        <div className='sidebar-chat'>
          <SidebarChat/>
          <SidebarChat/>


        </div>
    </div>
  )
}

export default Sidebar