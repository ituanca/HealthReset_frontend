import React, {useEffect, useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";
import axios from "axios";

function TrackActivity(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [trackedActivity, setTrackedActivity] = useState({
        date: "",
        nrOfSteps: "",
        listOfPhysicalExercises: [],
        listOfTrackedFood: []
    });
    const [activityLevels, setActivityLevels] = useState( [] );
    const [checkedList] = useState(new Array(activityLevels.length).fill(false));
    const [selectedLevel, setSelectedLevel] = useState("");

    // useEffect(() => {
    //     fetch('http://localhost:8080/health-reset/activityLevel/index')
    //         .then((response) => response.json())
    //         .then((json) => {
    //             setActivityLevels(json);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     console.log(activityLevels)
    //     localStorage.setItem("activityLevels", JSON.stringify(activityLevels));
    // }, []);

    const errors = {
        nrOfSteps: "invalid number",
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        // axios
        //     .post('http://localhost:8080/health-reset/profile/create', trackedActivity)
        //     .then((response) => {
        //         console.info(response);
        //         if (response.data === "invalid_weight") {
        //             setErrorMessages({name: "weight", message: errors.weight});
        //             localStorage.removeItem("profile");
        //         } else if(response.data === "invalid_height"){
        //             setErrorMessages({name: "height", message: errors.height});
        //             localStorage.removeItem("profile");
        //         } else if(response.data === "invalid_birthdate"){
        //             setErrorMessages({name: "birthdate", message: errors.birthdate});
        //             localStorage.removeItem("profile");
        //         } else if(response.data === "invalid_activityLevel"){
        //             setErrorMessages({name: "activityLevel", message: errors.activityLevel});
        //             localStorage.removeItem("profile");
        //         }  else if (response.data === "invalid_weightGoal"){
        //             setErrorMessages({name: "weightGoal", message: errors.weightGoal});
        //             localStorage.removeItem("profile");
        //         } else if(response.data === "invalid_nrOfStepsGoal"){
        //             setErrorMessages({name: "nrOfStepsGoal", message: errors.nrOfStepsGoal});
        //             localStorage.removeItem("profile");
        //         } else {
        //             setIsSubmitted(true);
        //             localStorage.setItem("profile", JSON.stringify(trackedActivity));
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("There was an error!", error.response.data.message)
        //     });
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTrackedActivity({ ...trackedActivity, [name] : value,
            regularUser: JSON.parse(localStorage.getItem('regularUser'))});
    }

    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setSelectedLevel(target.value);
        }
        setTrackedActivity({ ...trackedActivity});
    };

    useEffect(() => {
        setTrackedActivity({ ...trackedActivity});
    }, [selectedLevel])

    console.log(trackedActivity)

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <input type="date"
                           value={trackedActivity.date}
                           placeholder={trackedActivity.date}
                           readOnly = {true}
                           name="date"/>
                </div>
                <div className="input-container">
                    <label>Number of steps </label>
                    <input type="number"
                           value={trackedActivity.nrOfSteps}
                           onChange={handleInput}
                           name="nrOfSteps"/>
                    {renderErrorMessage("nrOfSteps")}
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div className="col-md-12 text-center">
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/RegularUserActions">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <div className="login-form" style={{backgroundColor: 'darkseagreen',}}>
                <div className="title">Complete your profile</div>
                {isSubmitted ?
                    <div>
                        <h5 className="text-center">Your today activity was registered!</h5>
                        <span>&nbsp;&nbsp;</span>
                        <div className="col-md-12 text-center">
                            <span>&nbsp;&nbsp;</span>
                            <Link to="/RegularUserActions">
                                <Button as={Col} variant="success">Go to user page</Button>
                            </Link>
                        </div>
                    </div>: renderForm}
                <Outlet />
            </div>
        </div>
    );
}

export default TrackActivity;