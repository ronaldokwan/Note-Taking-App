import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    const newInput = {
      ...input,
    };
    newInput[name] = value;
    setInput(newInput);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BASE_URL}/register`,
        data: input,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  }
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <h1>HackCrypto</h1>
              <label className="form-label" htmlFor="username">
                Full Name
              </label>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  name="username"
                  onChange={handleInputChange}
                  value={input.username}
                />
              </div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="email"
                  className="form-control form-control-lg"
                  name="email"
                  onChange={handleInputChange}
                  value={input.email}
                />
              </div>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  name="password"
                  onChange={handleInputChange}
                  value={input.password}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Register
              </button>

              <span>
                <Link to="/login" className="btn btn-primary btn-lg btn-block">
                  Back to Login
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
