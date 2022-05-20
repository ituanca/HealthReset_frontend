import React, {useEffect, useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";
import axios from "axios";

function EditProfile(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [profile, setProfile] = useState({});
    const [activityLevels, setActivityLevels] = useState( [] );
    const [checkedList] = useState(new Array(activityLevels.length).fill(false));
    const [selectedLevel, setSelectedLevel] = useState("");

    useEffect(() => {
        fetch('http://localhost:8080/health-reset/activityLevel/index')
            .then((response) => response.json())
            .then((json) => {
                setActivityLevels(json);
            })
            .catch((error) => {
                console.log(error);
            });

        const regularUser = JSON.parse(localStorage.getItem("regularUser"));
        console.log(regularUser)

        axios
            .get("http://localhost:8080/health-reset/regularUser/findProfileByRegularUser", {
                params:{
                    username: regularUser.username
                }
            })
            .then((response) => {
                if(response.data === ""){
                    console.log("There was an error!")
                }else{
                    setProfile(response.data);
                    localStorage.setItem("profile", JSON.stringify(profile));
                }
            })
            .catch((error) =>
                console.error("There was an error!", error.response.data.message)
            );

        //here, it is still empty
        console.log(profile);

    }, []);

    console.log(profile);

    const errors = {
        weight: "invalid weight",
        height: "invalid height",
        birthdate: "invalid birthdate",
        activityLevel: "activity level was not selected",
        weightGoal: "invalid weight goal",
        nrOfStepsGoal: "invalid number of steps goal"
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        axios
            .put('http://localhost:8080/health-reset/profile/update', profile)
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
                } else if(response.data === "invalid_activityLevel"){
                    setErrorMessages({name: "activityLevel", message: errors.activityLevel});
                    localStorage.removeItem("profile");
                }  else if (response.data === "invalid_weightGoal"){
                    setErrorMessages({name: "weightGoal", message: errors.weightGoal});
                    localStorage.removeItem("profile");
                } else if(response.data === "invalid_nrOfStepsGoal"){
                    setErrorMessages({name: "nrOfStepsGoal", message: errors.nrOfStepsGoal});
                    localStorage.removeItem("profile");
                } else {
                    setIsSubmitted(true);
                    localStorage.setItem("profile", JSON.stringify(profile));
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProfile({ ...profile, [name] : value,
            regularUser: JSON.parse(localStorage.getItem('regularUser'))});
    }

    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setSelectedLevel(target.value);
        }
        setProfile({ ...profile, activityLevel: selectedLevel});
    };

    useEffect(() => {
        setProfile({ ...profile, activityLevel: selectedLevel});
    }, [selectedLevel])

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Weight(kg) </label>
                    <input type="number"
                           value={profile.weight}
                           onChange={handleInput}
                           placeholder={profile.weight}
                           name="weight" required/>
                    {renderErrorMessage("weight")}
                </div>
                <div className="input-container">
                    <label>Height(cm) </label>
                    <input type="number"
                           value={profile.height}
                           onChange={handleInput}
                           placeholder={profile.height}
                           name="height" required/>
                    {renderErrorMessage("height")}
                </div>
                <div className="input-container">
                    <label>Birthdate </label>
                    <input type="date"
                           value={profile.birthdate}
                           onChange={handleInput}
                           placeholder={profile.birthdate}
                           name="birthdate" required/>
                    {renderErrorMessage("birthdate")}
                </div>
                <div className="input-container">
                    <label>Activity level: {profile.activityLevel}</label>
                    <form>
                        {activityLevels.map(({activityLevel}) => (
                            <div key={activityLevel}>
                                <input
                                    type="radio"
                                    name="levels"
                                    value={activityLevel}
                                    checked={ checkedList[selectedLevel === {activityLevel}] }
                                    onChange={handleChange}
                                />
                                <label>{activityLevel}</label>
                            </div>
                        ))}
                    </form>
                    {renderErrorMessage("activityLevel")}
                </div>
                <div className="input-container">
                    <label>Weight goal(kg) </label>
                    <input type="number"
                           value={profile.weightGoal}
                           onChange={handleInput}
                           placeholder={profile.weightGoal}
                           name="weightGoal" required/>
                    {renderErrorMessage("weightGoal")}
                </div>
                <div className="input-container">
                    <label>Number of steps goal daily </label>
                    <input type="number"
                           value={profile.nrOfStepsGoal}
                           onChange={handleInput}
                           placeholder={profile.nrOfStepsGoal}
                           name="nrOfStepsGoal" required/>
                    {renderErrorMessage("nrOfStepsGoal")}
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div className="col-md-12 text-center">
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
                <div className="title">Edit your profile</div>
                {isSubmitted ?
                    <div>
                        <h5 className="text-center">Profile successfully updated!</h5>
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

export default EditProfile;