import { useSelector } from "react-redux";
import Header from "../../components/header";
import Left from "../../components/home/left";
import RightHome from "../../components/home/right";

function Home() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <div>
      <Header />
      <Left user={user} />
      <RightHome user={user} />
    </div>
  );
}

export default Home;
