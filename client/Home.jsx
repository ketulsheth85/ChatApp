import React from 'react';

import ChatroomPreview from './ChatroomPreview'

export default ({
  chatrooms,
  onEnterChatroom
}) => (
  <div>
     <h1 style={{color : '#CCCCCC'}}>Select Room</h1>
    {
      chatrooms.map(chatroom => (
        <ChatroomPreview
          key={chatroom.name}
          chatroom={chatroom}
          onEnter={() => onEnterChatroom(chatroom.name)}
        />
      ))
    }
  </div>
)
