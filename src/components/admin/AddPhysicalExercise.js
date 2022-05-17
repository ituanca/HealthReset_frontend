import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";
import background from "../../img/b.jpg";

function AddPhysicalExercise(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [physicalExercise, setPhysicalExercise] = useState({
        name: "",
        typeOfExercise: "",
        caloriesBurnedPerMinute: "",
    });
    const [typesOfExercise, setTypesOfExercise] = useState( [] );
    const [checkedList] = useState(new Array(typesOfExercise.length).fill(false));
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        fetch('http://localhost:8080/health-reset/typeOfExercise/index')
            .then((response) => response.json())
            .then((json) => {
                setTypesOfExercise(json);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(typesOfExercise)
        localStorage.setItem("typesOfExercise", JSON.stringify(typesOfExercise));
    }, []);

    const errors = {
        name: "invalid name",
        typeOfExercise: "unspecified type of exercise",
        caloriesBurnedPerMinute: "invalid number of calories"
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        console.log(physicalExercise);

        axios
            .post("http://localhost:8080/health-reset/physicalExercise/add", physicalExercise)
            .then((response) => {
                console.info(response);
                if (response.data === "name_error") {
                    setErrorMessages({name: "name", message: errors.name});
                } else if(response.data === "typeOfExercise_error"){
                    setErrorMessages({name: "typeOfExercise", message: errors.typeOfExercise});
                } else if (response.data === "calories_error"){
                    setErrorMessages({name: "caloriesBurnedPerMinute", message: errors.caloriesBurnedPerMinute});
                } else {
                    setIsSubmitted(true);
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });
    };

    const handleInput = event => {
        const name = event.target.name;
        const value = event.target.value;
        setPhysicalExercise({ ...physicalExercise, [name] : value});
        console.log(physicalExercise);
    }

    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setSelectedType(target.value);
        }
        setPhysicalExercise({ ...physicalExercise, typeOfExercise: selectedType});
    };

    useEffect(() => {
        setPhysicalExercise({ ...physicalExercise, typeOfExercise: selectedType});
    }, [selectedType])


    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <span>&nbsp;&nbsp;</span>
                <div>
                    Insert details of the new food:
                    <div>
                        <div>
                            <div className="input-container">
                                <label>Name </label>
                                <input type="text"
                                       value={physicalExercise.name}
                                       onChange={handleInput}
                                       name="name" required
                                       id="name"/>
                                {renderErrorMessage("name")}
                            </div>
                            <div className="input-container">
                                <label>Type of exercise: </label>
                                <form>
                                    {typesOfExercise.map(({typeOfExercise}) => (
                                        <div key={typeOfExercise}>
                                            <input
                                                type="radio"
                                                name="types"
                                                value={typeOfExercise}
                                                checked={ checkedList[selectedType === {typeOfExercise}]}
                                                onChange={handleChange}
                                            />
                                            <label>{typeOfExercise}</label>
                                        </div>
                                    ))}
                                </form>
                                {renderErrorMessage("typeOfExercise")}
                            </div>
                            <div className="input-container">
                                <label>Calories burned per minute </label>
                                <input type="text"
                                       value={physicalExercise.caloriesBurnedPerMinute}
                                       onChange={handleInput}
                                       name="caloriesBurnedPerMinute" required
                                       id="caloriesBurnedPerMinute"/>
                                {renderErrorMessage("caloriesBurnedPerMinute")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <span>&nbsp;&nbsp;</span>
            <div className="login-form" style={{backgroundColor: 'lightblue',}}>
                <div className="title">Add primary food</div>
                {isSubmitted ? <h5 className="text-center">Food was added successfully!</h5> : renderForm}
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <div className="col-md-12 text-center">
                        <span>&nbsp;&nbsp;</span>
                        <Link to="/AdminActions">
                            <Button as={Col} variant="outline-dark">Go back</Button>
                        </Link>
                    </div>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}

export default AddPhysicalExercise;