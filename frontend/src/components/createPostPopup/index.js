import { useRef, useState } from "react";
import "./style.css";

import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import { useClickOutside } from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";

export default function CreatePostPopup({
  user,
  setVisible,
  posts,
  dispatch,
  profile,
}) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const textRef = useRef(null);
  const popup = useRef(null);

  useClickOutside(popup, () => {
    setVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (response.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
        setLoading(false);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await uploadImages(formData, path, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res.status === "ok") {
        dispatch({
          type: "POSTS_SUCCESS",
          payload: [res.data, ...posts],
        });
        setText("");
        setImages([]);
        setVisible(false);
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (response.status === "ok") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [response.data, ...posts],
        });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
        setLoading(false);
      }
    } else {
      console.log("nothing");
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              user={user}
              setText={setText}
              textRef={textRef}
              text={text}
              background={background}
              setBackground={setBackground}
            />
          </>
        ) : (
          <ImagePreview
            user={user}
            setText={setText}
            textRef={textRef}
            text={text}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button className="post_submit" onClick={postSubmit}>
          {loading ? (
            <PulseLoader color="#fff" size={5} disabled={loading} />
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
}
