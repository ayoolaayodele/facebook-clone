import React from "react";

function Story({ profile_picture, profile_name, image }) {
  return (
    <div className="story">
      <img src={image} alt="" className="story_img" />
      <div className="story_profile_pic">
        <img src={profile_picture} alt="" />
      </div>
      <div className="story_profile_name">{profile_name}</div>
    </div>
  );
}

export default Story;
