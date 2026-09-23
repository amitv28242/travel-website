import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookNowModal from "./BookNowModal";

export default function BookNowButton({
  pkg,
  className = "btn-primary",
  label = "Book Now",
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {label}
      </button>

      {open && <BookNowModal pkg={pkg} onClose={() => setOpen(false)} />}
    </>
  );
}