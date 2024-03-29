import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  search,
} from "../../functions/user";
import { useClickOutside } from "../../helpers/clickOutside";
import { Return, Search } from "../../svg";

function SearchMenu({ color, setShowSeachMenu, token }) {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState();
  const [searchHistory, setSearchHistory] = useState([]);
  const [results, setResults] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSeachMenu(false);
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const res = await getSearchHistory(token);
    setSearchHistory(res);
  };

  const searchHandler = async () => {
    if (searchTerm === "") {
      setResults([]);
    } else {
      const res = await search(searchTerm, token);
      setResults(res);
    }
  };
  const addToSearchHistoryHandler = async (searchUser) => {
    const res = await addToSearchHistory(searchUser, token);
    getHistory();
  };

  const handleRemove = async (searchUser) => {
    removeFromSearch(searchUser, token);
    getHistory();
  };

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => setShowSeachMenu(false)}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}

          <input
            type="text"
            placeholder="Search Facebook"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            ref={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => setIconVisible(true)}
          />
        </div>
      </div>
      {results.length === 0 && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className="search_history">
        {searchHistory &&
          results.length === 0 &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => {
              return (
                <div className="search_user_item hover1" key={user._id}>
                  <Link
                    className="flex"
                    to={`/profile/${user.user.username}`}
                    onClick={() => addToSearchHistoryHandler(user.user._id)}
                  >
                    <img src={user.user.picture} alt="" />
                    <span>
                      {user.user.first_name} {user.user.last_name}
                    </span>
                  </Link>
                  <i
                    className="exit_icon"
                    onClick={() => {
                      handleRemove(user.user._id);
                    }}
                  ></i>
                </div>
              );
            })}
      </div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              onClick={() => addToSearchHistoryHandler(user._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchMenu;
