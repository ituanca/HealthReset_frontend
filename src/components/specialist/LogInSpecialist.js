import background from "../../img/b.jpg";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import React, {useEffect, useState} from "react";

function LogInSpecialist() {

    const [errorMessagesS, setErrorMessagesS] = useState({});
    const [isSubmittedS, setIsSubmittedS] = useState(false);
    const [specialistRegistration, setSpecialistRegistration] = useState({
        username: "",
        password: ""
    });

    const errors = {
        uname: "invalid username",
        pass: "invalid password",
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSpecialistRegistration({ ...specialistRegistration, [name] : value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // axios
        //     .get("http://localhost:8080/assignment2/admin/login", {
        //         params: {
        //             username: specialistRegistration.username,
        //             password: specialistRegistration.password
        //         }
        //     })
        //     .then((response) => {
        //         if (response.data === "username_error") {
        //             setErrorMessages({name: "uname", message: errors.uname});
        //             localStorage.removeItem("admin");
        //         } else if (response.data === "password_error"){
        //             setErrorMessages({name: "pass", message: errors.pass});
        //             localStorage.removeItem("customer");
        //         } else{
        //             setIsSubmitted(true);
        //             localStorage.setItem("admin", JSON.stringify(specialistRegistration));
        //         }
        //         console.log(response.data);
        //     })
        //     .catch((error) =>
        //         console.error("There was an error!", error.response.data.message)
        //     );
    };

    const renderErrorMessage = (name) =>
        name === errorMessagesS.name && (
            <div className="error">{errorMessagesS.message}</div>
        );


    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text"
                           value={specialistRegistration.username}
                           onChange={handleInput}
                           name="username" required id="username"/>
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password"
                           value={specialistRegistration.password}
                           onChange={handleInput}
                           name="password" required id="password"/>
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
            <Outlet/>
        </div>
    );

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <div className="login-form" style={{backgroundColor: 'mistyrose',}}>
                <div className="title">Sign In</div>
                {isSubmittedS ?
                    <div>
                        <div>
                            Specialist has successfully logged in
                            <span>&nbsp;&nbsp;</span>
                        </div>
                        <span>&nbsp;&nbsp;</span>
                        <Link to="/SpecialistActions">
                            <span>&nbsp;&nbsp;</span>
                            <Button as={Col} variant="secondary">Go to specialist page</Button>
                        </Link>
                    </div>
                    : renderForm}
                <Outlet />
            </div>
        </div>
    );
}

export default LogInSpecialist;