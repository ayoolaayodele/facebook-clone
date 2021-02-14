import React from 'react'
import './Feed.css'
import MessageSender from './MessageSender'
import Post from './Post'
import StoryReel from './StoryReel'

function Feed() {
  return (
    <div className = "feed">
      <StoryReel />
      <MessageSender />
<Post  
 profilePic="img/pics.jpg"
        message="WOW ths works"
        timestamp="Some timestamp"
        username="Bub"
        image="img/ds_logo.jpg"/>

<Post         profilePic="ds_logo.jpg"
        message="WOW ths works"
        timestamp="Some timestamp"
        username="Bub"
      />
<Post     profilePic="ds_logo.jpg"
        message="WOW ths works"
        timestamp="Some timestamp"
        username="Bub"
        image="img/jones.jpg"/>
    </div>
  )
}

export default Feed
