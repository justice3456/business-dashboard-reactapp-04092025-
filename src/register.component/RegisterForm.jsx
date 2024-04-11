//imports
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//components
function RegisterForm() {
  //states
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [notMatchText, setNotMatchText] = useState("turn-off");
  const navigate = useNavigate();

  function handlePasswordMatch(e) {
    if (password != e.target.value) {
      setNotMatchText("turn-on");
    } else {
      setNotMatchText("turn-off");
    }
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name == "password") {
      setPassword(value);
    }

    setInputs((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputs);

    axios
      .post("http://localhost:80/dashboard_api/user/index.php/save", inputs)
      .then(function (response) {
        console.log(response.data);
        if (response.data == 1) {
          navigate("/Login");
        }
      });
  }

  return (
    <>
      <div className="register-form">
        <h1>Sign up</h1>
        <form method="post" onSubmit={handleSubmit}>
          <p>
            You have an account? <a href="/Login">Sign in</a>
          </p>

          <input
            className="fname-field"
            name="fname"
            type="text"
            placeholder="First Name"
            required
            onChange={handleChange}
          ></input>

          <br></br>
          <br></br>

          <input
            className="lname-field"
            name="lname"
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
          ></input>

          <br></br>
          <br></br>

          <input
            className="email-field"
            name="email"
            type="email"
            placeholder="Email "
            required
            onChange={handleChange}
          ></input>

          <br></br>
          <br></br>

          <input
            className="password-field"
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value = {password}
          ></input>
          <br></br>
          <br></br>

          <p className={notMatchText}>Password doesn't match ❗️</p>

          <input
            className="password-field"
            name="confirm"
            type="password"
            placeholder="Re-type Password"
            required
            onChange={handlePasswordMatch}
          ></input>

          <br></br>
          <br></br>

          <input type="submit" className="submit-button" name="submit"></input>
        </form>
      </div>
      <img
        className="login-image-comp"
        src="../images/meeting.image2.1.png"
      ></img>
    </>
  );
}

export default RegisterForm;
