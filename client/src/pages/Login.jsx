/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
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
      const { data } = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BASE_URL}/login`,
        data: input,
      });
      localStorage.access_token = data.access_token;
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  }
  async function handleCredentialResponse(response) {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/google-login`,
      {
        google_token: response.credential,
      }
    );
    console.log(data);
    localStorage.access_token = data.access_token;
    navigate("/");
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1012248528478-f2jn6iljb8d62k7q00i79v6piqp4km1b.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
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
                Login
              </button>

              <span>
                <Link
                  to="/register"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Don't have account?
                </Link>
              </span>
            </form>
            <div id="buttonDiv"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
