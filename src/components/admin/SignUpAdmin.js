import React, {useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";
import axios from "axios";

function SignUpAdmin(){
    const [errorMessagesAS, setErrorMessagesAS] = useState({});
    const [isSubmittedAS, setIsSubmittedAS] = useState(false);
    const [adminRegistration, setAdminRegistration] = useState({
        email: "",
        username: "",
        password: ""
    });

    const errors = {
        username: "username already exists",
        email: "email already exists",
        invalid_email: "invalid email"
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAdminRegistration({ ...adminRegistration, [name] : value});
    }

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        axios
            .post('http://localhost:8080/health-reset/admin/signUp', adminRegistration)
            .then((response) => {
                console.info(response);
                if (response.data === "username_exists") {
                    setErrorMessagesAS({name: "username", message: errors.username});
                    localStorage.removeItem("admin");
                } else if (response.data === "email_exists"){
                    setErrorMessagesAS({name: "email", message: errors.email});
                    localStorage.removeItem("admin");
                }  else if (response.data === "invalid_email"){
                    setErrorMessagesAS({name: "invalid_email", message: errors.invalid_email});
                    localStorage.removeItem("admin");
                } else{
                    setIsSubmittedAS(true);
                    localStorage.setItem("admin", JSON.stringify(adminRegistration));
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });

    }

    const renderErrorMessage = (name) =>
        name === errorMessagesAS.name && (
            <div className="error">{errorMessagesAS.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text"
                           value={adminRegistration.email}
                           onChange={handleInput}
                           name="email" required id = "email"/>
                    {renderErrorMessage("email")}
                    {renderErrorMessage("invalid_email")}
                </div>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text"
                           value={adminRegistration.username}
                           onChange={handleInput}
                           name="username" required id = "username"/>
                    {renderErrorMessage("username")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password"
                           value={adminRegistration.password}
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
            <div className="login-form" style={{backgroundColor: 'lightblue',}}>
                <div className="title">Sign Up</div>
                {isSubmittedAS ?
                    <div>
                        <h5 className="text-center">Admin account was created successfully!</h5>
                        <span>&nbsp;&nbsp;</span>
                        <div className="col-md-12 text-center">
                            <span>&nbsp;&nbsp;</span>
                            <Link to="/AdminActions">
                                <Button as={Col} variant="primary">Go to admin page</Button>
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
export default SignUpAdmin;