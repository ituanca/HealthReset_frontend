import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";
import axios from "axios";

function LogInRegularUser(){

    const [errorMessagesR, setErrorMessagesR] = useState({} );
    const [isSubmittedR, setIsSubmittedR] = useState(false );
    const [regularUserRegistration, setRegularUserRegistration] = useState({
        username: "",
        password: ""
    });

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
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
            .get("http://localhost:8080/health-reset/regularUser/login", {
                params: {
                    username: regularUserRegistration.username,
                    password: regularUserRegistration.password
                }
            })
            .then((response) => {
                if (response.data === "username_error") {
                    setErrorMessagesR({name: "uname", message: errors.uname});
                    localStorage.removeItem("regularUser");
                } else if (response.data === "password_error"){
                    setErrorMessagesR({name: "pass", message: errors.pass});
                    localStorage.removeItem("regularUser");
                } else{
                    setIsSubmittedR(true);
                    localStorage.setItem("regularUser", JSON.stringify(regularUserRegistration));
                    localStorage.setItem("regularUserUsername", JSON.stringify(regularUserRegistration.username));
                }
                console.log(response.data);
            })
            .catch((error) =>
                console.error("There was an error!", error.response.data.message)
            );
    };

    const renderErrorMessage = (name) =>
        name === errorMessagesR.name && (
            <div className="error">{errorMessagesR.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text"
                           value={regularUserRegistration.username}
                           onChange={handleInput}
                           name="username" required id = "username"/>
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password"
                           value={regularUserRegistration.password}
                           onChange={handleInput}
                           name="password" required id = "password"/>
                    {renderErrorMessage("pass")}
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
                <div className="title">Sign In</div>
                {isSubmittedR ?
                    <div>
                        <h5 className="text-center">User has successfully logged in!</h5>
                        <span>&nbsp;&nbsp;</span>
                        <div className="col-md-12 text-center">
                            <span>&nbsp;&nbsp;</span>
                            <Link to="/RegularUserActions">
                                <Button as={Col} variant="success">Go to regular user page</Button>
                            </Link>
                        </div>
                    </div>
                    : renderForm}
                <Outlet/>
            </div>
        </div>
    );
};

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInCustomer />, rootElement);
export default LogInRegularUser;


