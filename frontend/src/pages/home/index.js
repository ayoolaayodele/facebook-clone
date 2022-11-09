import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import Left from "../../components/home/left";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import Post from "../../components/posts";
import "./style.css";

function Home({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((user) => ({ ...user }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading]);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" getAllPosts={getAllPosts} />
      <Left user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        {loading ? (
          <div className="sekelton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {posts.map((post, i) => (
              <Post key={i} post={post} user={user} />
            ))}
          </div>
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
}

export default Home;
