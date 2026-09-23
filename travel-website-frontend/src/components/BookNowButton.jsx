import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookNowModal from "./BookNowModal";

/**
 * Drop-in "Book Now" button.
 * - If the user is logged in → opens a quick-booking modal right here.
 * - If not → redirects to /login and comes back to this page after login.
 */
export default function BookNowButton({
  pkg,
  className = "btn-primary",
  label = "Book Now",
  size = "",
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();      // safe if wrapped in a <Link>
    e.stopPropagation();
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`${className} ${size}`}
      >
        {label}
      </button>

      {open && <BookNowModal pkg={pkg} onClose={() => setOpen(false)} />}
    </>
  );
}