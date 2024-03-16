import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Navbar() {
  const payButtonRef = useRef(null);
  const handleDonate = () => {
    // For example trigger on button clicked, or any time you need
    var payButton = document.getElementById("pay-button");
    payButton.addEventListener("click", async function () {
      // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
      const { data } = await axios.get("http://localhost:3000/payment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      window.snap.pay(data.transactionToken, {
        onSuccess: async function (result) {
          console.log(result);
          await axios.patch(
            "http://localhost:3000/upgrade",
            {
              orderId: data.orderId,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
        },
      });
    });
  };
  useEffect(() => {
    const payButton = document.getElementById("pay-button");
    if (payButton) {
      payButton.addEventListener("click", handleDonate);
      return () => payButton.removeEventListener("click", handleDonate); // cleanup function
    } else {
      console.error("payButton element not found");
    }
  }, []);
  return (
    <header
      className="navbar sticky-top bg-white flex-md-nowrap p-0 shadow"
      id="navbar"
    >
      <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">
        Home
      </Link>
      <Link
        to="/add-note"
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
      >
        Add Note
      </Link>
      <Link
        to="/archived"
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
      >
        Archived Notes
      </Link>
      <Link
        to="/login"
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
        onClick={() => {
          localStorage.removeItem("access_token");
        }}
      >
        Logout
      </Link>{" "}
      <span
        onClick={handleDonate}
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 hover:cursor-pointer"
        ref={payButtonRef}
        id="pay-button"
      >
        Donate
      </span>
    </header>
  );
}

export default Navbar;
