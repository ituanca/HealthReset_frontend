import React, {useEffect, useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";
import axios from "axios";

function CreateProfile(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [profileRegistration, setProfileRegistration] = useState({
        weight: "",
        height: "",
        birthdate: "",
        activityLevel: "",
        weightGoal: "",
        nrOfStepsGoal: "",
        regularUser: []
    });
    const [activityLevels, setActivityLevels] = useState( [] );
    const [checkedList, setCheckedList] = useState(new Array(activityLevels.length).fill(false));
    const[selectedLevel, setSelectedLevel] = useState("");

    useEffect(() => {
        fetch('http://localhost:8080/health-reset/activityLevel/index')
            .then((response) => response.json())
            .then((json) => {
                setActivityLevels(json);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(activityLevels)
        localStorage.setItem("activityLevels", JSON.stringify(activityLevels));
    }, []);

    const errors = {
        weight: "invalid weight",
        height: "invalid height",
        birthdate: "invalid birthdate",
        weightGoal: "invalid weight goal",
        nrOfStepsGoal: "invalid number of steps goal"
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        axios
            .post('http://localhost:8080/health-reset/profile/create', profileRegistration)
            .then((response) => {
                console.info(response);
                if (response.data === "invalid_weight") {
                    setErrorMessages({name: "weight", message: errors.weight});
                    localStorage.removeItem("profile");
                } else if(response.data === "invalid_height"){
                    setErrorMessages({name: "height", message: errors.height});
                    localStorage.removeItem("profile");
                } else if(response.data === "invalid_birthdate"){
                    setErrorMessages({name: "birthdate", message: errors.birthdate});
                    localStorage.removeItem("profile");
                } else if (response.data === "invalid_weightGoal"){
                    setErrorMessages({name: "weightGoal", message: errors.weightGoal});
                    localStorage.removeItem("profile");
                } else if(response.data === "invalid_nrOfStepsGoal"){
                    setErrorMessages({name: "nrOfStepsGoal", message: errors.nrOfStepsGoal});
                    localStorage.removeItem("profile");
                } else {
                    setIsSubmitted(true);
                    localStorage.setItem("profile", JSON.stringify(profileRegistration));
                }
            })

            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });

    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProfileRegistration({ ...profileRegistration, [name] : value,
            regularUser: JSON.parse(localStorage.getItem('regularUser'))});
    }

    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setSelectedLevel(target.value);
        }
        setProfileRegistration({ ...profileRegistration, activityLevel: selectedLevel});
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    console.log(profileRegistration)

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Weight(kg) </label>
                    <input type="number"
                           value={profileRegistration.weight}
                           onChange={handleInput}
                           name="weight" required/>
                    {renderErrorMessage("weight")}
                </div>
                <div className="input-container">
                    <label>Height(cm) </label>
                    <input type="number"
                           value={profileRegistration.height}
                           onChange={handleInput}
                           name="height" required/>
                    {renderErrorMessage("height")}
                </div>
                <div className="input-container">
                    <label>Birthdate </label>
                    <input type="date"
                           value={profileRegistration.birthdate}
                           onChange={handleInput}
                           name="birthdate" required/>
                    {renderErrorMessage("birthdate")}
                </div>
                <div className="input-container">
                    <label>Activity level: </label>
                    <form>
                        {activityLevels.map(({ id, activityLevel}, index) => (
                            <div key={activityLevel}>
                                <input
                                    type="radio"
                                    name="levels"
                                    value={activityLevel}
                                    checked={ checkedList[selectedLevel === {activityLevel}]}
                                    onChange={handleChange}
                                />
                                <label>{activityLevel}</label>
                            </div>
                        ))}
                    </form>
                </div>
                <div className="input-container">
                    <label>Weight goal(kg) </label>
                    <input type="number"
                           value={profileRegistration.weightGoal}
                           onChange={handleInput}
                           name="weightGoal" required/>
                    {renderErrorMessage("weightGoal")}
                </div>
                <div className="input-container">
                    <label>Number of steps goal daily </label>
                    <input type="number"
                           value={profileRegistration.nrOfStepsGoal}
                           onChange={handleInput}
                           name="nrOfStepsGoal" required/>
                    {renderErrorMessage("nrOfStepsGoal")}
                </div>
                <div className="button-container">
                    <input type="submit"/>
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
                        <h5 className="text-center">Profile successfully created!</h5>
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

export default CreateProfile;