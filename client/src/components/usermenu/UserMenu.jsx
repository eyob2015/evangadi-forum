import { Link } from "react-router-dom";
import { IoMdArrowDropup } from "react-icons/io";
import "./usermenu.css";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { uploadImage } from "../../api";
function UserMenu({ refresh }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user?.userid);
    try {
      await uploadImage(formData, token).then((data) => {
        refresh();
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <IoMdArrowDropup className="user-menu-arrow" />
      <div className="user-menu">
        <ul>
          <li>
            <label htmlFor="upload-photo">
              change photo
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link
              to={`${token} ? "./" :"/signin"`}
              onClick={() => {
                if (token) {
                  localStorage.removeItem("token");
                }
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserMenu;
