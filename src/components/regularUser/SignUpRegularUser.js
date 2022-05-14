import React, {useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";
import axios from "axios";


function SignUpRegularUser(){
    const [errorMessagesSR, setErrorMessagesSR] = useState({});
    const [isSubmittedSR, setIsSubmittedSR] = useState(false);
    const [regularUserRegistration, setRegularUserRegistration] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });

    const errors = {
        username: "username already exists",
        email: "email already exists",
        invalid_email: "invalid email"
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRegularUserRegistration({ ...regularUserRegistration, [name] : value});
    }

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        axios
            .get('http://localhost:8080/health-reset/regularUser/checkIfValid', {
                params: {
                    email: regularUserRegistration.email,
                    username: regularUserRegistration.username
                }
            })
            .then((response) => {
                console.info(response);
                if (response.data === "username_exists") {
                    setErrorMessagesSR({name: "username", message: errors.username});
                    localStorage.removeItem("regularUser");
                } else if (response.data === "email_exists"){
                    setErrorMessagesSR({name: "email", message: errors.email});
                    localStorage.removeItem("regularUser");
                }  else if (response.data === "invalid_email"){
                    setErrorMessagesSR({name: "invalid_email", message: errors.invalid_email});
                    localStorage.removeItem("regularUser");
                } else{
                    setIsSubmittedSR(true);
                    localStorage.setItem("regularUser", JSON.stringify(regularUserRegistration));
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });
    };

    const renderErrorMessage = (nameErr) =>
        nameErr === errorMessagesSR.name && (
            <div className="error">{errorMessagesSR.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Name </label>
                    <input type="text"
                           value={regularUserRegistration.name}
                           onChange={handleInput}
                           name="name"
                           required id = "name"/>
                </div>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text"
                           value={regularUserRegistration.email}
                           onChange={handleInput}
                           name="email"
                           required id = "email"/>
                    {renderErrorMessage("email")}
                    {renderErrorMessage("invalid_email")}
                </div>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text"
                           value={regularUserRegistration.username}
                           onChange={handleInput}
                           name="username" required id = "username"/>
                    {renderErrorMessage("username")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password"
                           value={regularUserRegistration.password}
                           onChange={handleInput}
                           name="password" required id = "password"/>
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div className="col-md-12 text-center">
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <div className="login-form" style={{backgroundColor: 'darkseagreen',}}>
                <div className="title">Sign Up</div>
                {isSubmittedSR ?
                    <div>
                        <h5 className="text-center">User account was created successfully!</h5>
                        <div className="col-md-12 text-center">
                            <span>&nbsp;&nbsp;</span>
                            <Link to="/CreateProfile">
                                <Button as={Col} variant="success">Create profile</Button>
                            </Link>
                        </div>
                    </div> : renderForm}
                <Outlet />
            </div>
        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInCustomer />, rootElement);
export default SignUpRegularUser;