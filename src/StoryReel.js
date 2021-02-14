import React from 'react'
import './StoryReel.css'
import Story from "./Story"

function StoryReel() {
  return (
    <div className="storyReel">
      {/** Story */}
      <Story image="img/ds3.jpg" profileSrc="img/pics.jpg" title="Ayodele"/>
      <Story image="img/ds1.jpg" profileSrc="img/pics.jpg" title="Aina"/>
      <Story image="img/ds3.jpg" profileSrc="img/pics.jpg" title="Samuel"/>
      <Story image="img/ds3.jpg" profileSrc="img/pics.jpg" title="Ayodeji"/>
    </div>
  ) 
}

export default StoryReel