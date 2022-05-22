import React, {useEffect, useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "react-bootstrap";
import axios from "axios";
import background from "../../img/b.jpg";
import {Form} from "reactstrap";

function AddRoutineDescription(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [routine, setRoutine] = useState(JSON.parse(localStorage.getItem("routine")));
    const [enableDescription, setEnableDescription] = useState(false);

    const errors = {
        name: "invalid name",
        description: "description is too long"
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        axios
            .post('http://localhost:8080/health-reset/routine/create', routine)
            .then((response) => {
                console.info(response);
                if (response.data === "name_error") {
                    setErrorMessages({name: "name", message: errors.name});
                    localStorage.removeItem("routine");
                } else if (response.data === "description_error") {
                    setErrorMessages({name: "description", message: errors.description});
                    localStorage.removeItem("routine");
                }else {
                    setIsSubmitted(true);
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });
    }

    const handleInput = event => {
        const name = event.target.name;
        const value = event.target.value;
        setRoutine({ ...routine, [name] : value,
            specialist: JSON.parse(localStorage.getItem('specialist'))});
        localStorage.setItem("routine", JSON.stringify(routine));
        console.log(routine);
    }

    const handleAddDescription = e => {
        setEnableDescription(true);
    }

    console.log(routine)

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div>
                    <div className="text-center">
                        <Button as={Col}
                                variant="success"
                                onClick={() => handleAddDescription()}
                        >Add a description
                        </Button>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    { enableDescription ?
                        <div>
                            <div className="form-group">
                               <div>
                                   <label>
                                       Enter some indications for the fitness program and for the meal plan that you proposed.
                                   </label>
                               </div>
                                <span>&nbsp;&nbsp;</span>
                                <textarea
                                    className="form-control"
                                    value={routine.description}
                                    onChange={handleInput}
                                    name="description"
                                    rows="8"/>
                                {renderErrorMessage("description")}
                            </div>
                            <span>&nbsp;&nbsp;</span>
                        </div>
                        : null}
                </div>
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <div className="button-container">
                        <input type="submit"/>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div className="text-center">
                        <Link to="/AddRoutineMealPlan">
                            <Button as={Col} variant="outline-dark">Go back</Button>
                        </Link>
                    </div>
                </nav>
            </form>
        </div>
    );

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <div className="login-form" style={{backgroundColor: 'mistyrose',}}>
                <div className="title">Add a description to this routine</div>
                {isSubmitted ?
                    <div>
                        <h5 className="text-center">Routine was registered!</h5>
                        <h5 className="text-center">An administrator is going to check it.</h5>
                        <span>&nbsp;&nbsp;</span>
                        <div className="col-md-12 text-center">
                            <span>&nbsp;&nbsp;</span>
                            <Link to="/SpecialistActions">
                                <Button as={Col} variant="outline-dark">Go back to the main page</Button>
                            </Link>
                        </div>
                    </div> : renderForm}
                <Outlet />
            </div>
        </div>
    );
}

export default AddRoutineDescription;