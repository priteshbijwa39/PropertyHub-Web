import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const DashboardSidebar = () => {
  const user = useAuthStore((state) => state?.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  };
  return (
    <>
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <span>⌂</span>
          <strong>
            Property<span>Hub</span>
          </strong>
        </div>

        <nav className="dashboard-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `dashboard-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>⌂</span>
            Dashboard
          </NavLink>

          {/* <NavLink
            to="/properties"
            className={({ isActive }) =>
              `dashboard-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>▣</span>
            All Properties
          </NavLink> */}

          <NavLink
            to="/my-properties"
            className={({ isActive }) =>
              `dashboard-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>▤</span>
            My Properties
          </NavLink>

          <NavLink
            to="/add-property"
            className={({ isActive }) =>
              `dashboard-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>＋</span>
            Add Property
          </NavLink>

          {/* <NavLink
            to="/messages"
            className={({ isActive }) =>
              `dashboard-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>▱</span>
            Messages
          </NavLink> */}
{/* 
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `dashboard-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>♙</span>
            Profile
          </NavLink> */}

          <button
            type="button"
            className="dashboard-nav-item logout"
            onClick={() => setShowLogoutModal(true)}
          >
            <span>↪</span>
            Logout
          </button>
        </nav>

        <div className="dashboard-user">
          <div className="dashboard-avatar">JD</div>

          <div>
            <strong>{user?.name || "John Doe"}</strong>
            <span>{user?.email || "john@gmail.com"}</span>
          </div>
        </div>
      </aside>

      {/* Logout modal */}

      {showLogoutModal && (
        <div
          className="logout-modal-overlay"
          onClick={() => setShowLogoutModal(false)}
        >
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-icon">↪</div>

            <h2>Logout?</h2>

            <p>Are you sure you want to logout?</p>

            <div className="logout-modal-actions">
              <button
                type="button"
                className="logout-cancel-button"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="logout-confirm-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
