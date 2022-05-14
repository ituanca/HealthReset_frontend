import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";


function SignUpRegularUser(){
    const [errorMessagesSS, setErrorMessagesSS] = useState({});
    const [isSubmittedSS, setIsSubmittedSS] = useState(false);
    const [specialistRegistration, setSpecialistRegistration] = useState({
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
        setSpecialistRegistration({ ...specialistRegistration, [name] : value});
    }

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        // axios
        //     .post('http://localhost:8080/assignment2/customer/createAndValidate', specialistRegistration)
        //     .then((response) => {
        //         console.info(response);
        //         if (response.data === "username_exists") {
        //             setErrorMessagesSC({name: "username", message: errors.username});
        //             localStorage.removeItem("customer");
        //         } else if (response.data === "email_exists"){
        //             setErrorMessagesSC({name: "email", message: errors.email});
        //             localStorage.removeItem("customer");
        //         }  else if (response.data === "invalid_email"){
        //             setErrorMessagesSC({name: "invalid_email", message: errors.invalid_email});
        //             localStorage.removeItem("customer");
        //         } else{
        //             setIsSubmittedSC(true);
        //             localStorage.setItem("customer", JSON.stringify(specialistRegistration));
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("There was an error!", error.response.data.message)
        //     });
    };

    const renderErrorMessage = (nameErr) =>
        nameErr === errorMessagesSS.name && (
            <div className="error">{errorMessagesSS.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Name </label>
                    <input type="text"
                           value={specialistRegistration.name}
                           onChange={handleInput}
                           name="name" required id = "name"/>
                </div>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text"
                           value={specialistRegistration.email}
                           onChange={handleInput}
                           name="email" required id = "email"/>
                    {renderErrorMessage("email")}
                    {renderErrorMessage("invalid_email")}
                </div>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text"
                           value={specialistRegistration.username}
                           onChange={handleInput}
                           name="username" required id = "username"/>
                    {renderErrorMessage("username")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password"
                           value={specialistRegistration.password}
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
            <div className="login-form" style={{backgroundColor: 'mistyrose',}}>
                <div className="title">Sign Up</div>
                {isSubmittedSS ?
                    <div>
                        <div>
                            Account created successfully
                        </div>
                        <span>&nbsp;&nbsp;</span>
                        <Link to="/SpecialistActions">
                            <span>&nbsp;&nbsp;</span>
                            <Button as={Col} variant="success">Go to specialist page</Button>
                        </Link>
                    </div>
                    : renderForm}
                <Outlet />
            </div>
        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInCustomer />, rootElement);
export default SignUpRegularUser;