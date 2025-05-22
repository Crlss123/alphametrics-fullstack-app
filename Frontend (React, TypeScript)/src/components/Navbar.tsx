import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <aside className="sidebar" style={{ backgroundColor: "#4e5284" }}>
      <div id="logo" className="logo-container">
        <a href="#" className="">
          <img src="/img/logo.png" alt="Logo" id="log-img" />
        </a>
      </div>

      <nav className="nav-links">
        <div id="dashboard" className="nav-item">
          <Link to={"/"}>
            <img src="/img/dashboard_icon.png" alt="Dashboard" id="img-dash" />
          </Link>
        </div>
        <div id="zone" className="nav-item">
          <Link to={"/people"}>
            <img src="/img/element_icon.png" alt="People" id="icon-zona" />
          </Link>
        </div>
      </nav>

      <div id="profile" className="profile-container">
        <a href="#" className="">
          <img src="/img/user_icon.png" alt="User Profile" id="user-icon" />
        </a>
      </div>
    </aside>
  );
}
