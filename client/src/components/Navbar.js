import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import { useState, useRef } from "react";

// function Navbar() {
//   const user = getUser();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <nav
//       style={{
//         padding: "10px",
//         backgroundColor: "#eee",
//         display: "flex",
//         justifyContent: "space-between",
//       }}
//     >
//       <div>
//         <Link to="/">🏠 Home</Link>
//       </div>

//       <div>
//         {user ? (
//           <>
//             <Link to="/profile">
//               <span style={{ marginRight: "10px" }}>👤 {user.name}</span>
//             </Link>
//             <button onClick={handleLogout} style={{ padding: "5px 10px" }}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link> |{" "}
//             <Link to="/register">Register</Link>
//           </>
//         )}
//         <Link to="/cart">🛒 Cart</Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleDropdownClick = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    handleDropdownClick();
    logout();
    navigate("/");
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // 1s delay
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center relative">
      <Link to="/" className="text-2xl font-bold">
        🛒 MyStore
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>

        {user ? (
          <>
            {user.isAdmin && (
              <Link to="/admin/dashboard" className="hover:underline">
                Admin Dashboard
              </Link>
            )}
          </>
        ) : (
          <></>
        )}

        {user ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="font-medium hover:underline focus:outline-none">
              {user.name}
            </button>

            {/* Dropdown menu */}
            <div
              className={`${
                showDropdown
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              } absolute right-0 mt-2 w-44 origin-top-right bg-white text-black rounded-lg shadow-lg transition-all duration-200 ease-out z-10`}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 rounded-t"
                onClick={() => handleDropdownClick()}
              >
                My Profile
              </Link>
              <Link
                to="/myOrders"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => handleDropdownClick()}
              >
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
