import "./style.css";
import { Link } from "react-router-dom";

import {
  ArrowDown,
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import { useClickOutside } from "../../helpers/clickOutside";
import UserMenu from "./userMenu";
function Header({ page, getAllPosts }) {
  const [showSeachMenu, setShowSeachMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useSelector((user) => ({ ...user }));

  const allMenu = useRef(null);
  const userMenu = useRef(null);

  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });
  const color = "#65676b";

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSeachMenu(true)}>
          <Search color={color} />{" "}
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSeachMenu && (
        <SearchMenu
          color={color}
          setShowSeachMenu={setShowSeachMenu}
          token={user.token}
        />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          onClick={() => getAllPosts()}
        >
          {page === "home" ? (
            <HomeActive color={color} />
          ) : (
            <Home color={color} />
          )}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {page === "friends" ? (
            <FriendsActive color={color} />
          ) : (
            <Friends color={color} />
          )}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && "active_header"} 
          }`}
          ref={allMenu}
        >
          <div onClick={() => setShowAllMenu((prev) => !prev)}>
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>

          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"} 
          }`}
          ref={userMenu}
        >
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
