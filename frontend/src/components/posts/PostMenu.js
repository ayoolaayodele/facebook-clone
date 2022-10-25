import { useRef, useState } from "react";
import { useClickOutside } from "../../helpers/clickOutside";
import MenuItem from "./MenuItem";

export default function PostMenu({
  userId,
  postUserId,
  imagesLength,
  setShowMenu,
}) {
  const [test, setTest] = useState(userId === postUserId ? true : false);
  const menu = useRef(null);
  useClickOutside(menu, () => setShowMenu(false));

  return (
    <ul className="post_menu" ref={menu}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <MenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="  Add
        this
        to
        your
        saved
        items"
      />
      <div className="line"></div>
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {imagesLength && <MenuItem icon="download_icon" title="Download" />}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}

      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {test && <MenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <div>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
}