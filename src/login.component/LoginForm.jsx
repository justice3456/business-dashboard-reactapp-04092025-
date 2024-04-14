//imports
import { useRef, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//components
function LoginForm() {


  const [inputs, setInputs] = useState({});
  const [notMatchText, setNotMatchText] = useState("turn-off");
  const navigate = useNavigate();

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();


    axios
      .post("http://51.120.240.118/dashboard_api/login.php/", inputs)
      .then(function (response) {
        if (response.data[0] == 1) {
          console.log(response.data[1])
          localStorage.setItem("user_id", response.data[1] )

          navigate("/Home");
        }
        if (response.data == 0) {
          setNotMatchText("turn-on");
        }
      });
  }

  return (
    <>
      <div className="welcome-text">
        <h1>LOGIN</h1>
        <form  onSubmit={handleSubmit}>
          <p>
            Don't have an account? <a href="/Register">Sign up</a>
          </p>
          <input
            className="email-field"
            type="email"
            name="email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" 
            title="Please enter a valid email address"
            placeholder="Email "
            required
            onChange={handleChange}
          ></input>
          <br></br>
          <br></br>
          <input
            className="password-field"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          ></input>
          <p className={notMatchText}>Incorrect email or password</p>
          <br></br>
          <br></br>
          <input type="submit" className="submit-button" name="submit" value="submit"></input>
        </form>
      </div>
      <img
        className="login-image-comp"
        src="/images/meeting.image2.1.png"
      ></img>
    </>
  );
}

export default LoginForm;
