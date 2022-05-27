import "../App.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as ProfileButton } from "../assets/profile.svg";
import { ReactComponent as LogoutButton } from "../assets/logout.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BannerPage() {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logOut();
    } catch {
      console.log("Failed to log out");
    }
    if (currentUser == null) {
      navigate("/");
    }
  }

  return (
    <div className="mainNav">
      <Logo style={{ height: "3.5rem" }} className="logo" />
      <div className="categoryNav">
        <NavLink className="navList" to="/voilin">
          Violin
        </NavLink>
        <NavLink className="navList" to="/flute">
          Flute
        </NavLink>
        <NavLink className="navList" to="/trumpet">
          Trumpet
        </NavLink>
      </div>
      <div className="rightNav">
        <ProfileButton className="navLogoutButton" />
        <LogoutButton onClick={handleLogout} className="navLogoutButton" />
      </div>
    </div>
  );
}
