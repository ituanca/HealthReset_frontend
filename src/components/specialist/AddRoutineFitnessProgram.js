import React, {useEffect, useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "react-bootstrap";
import axios from "axios";
import background from "../../img/b.jpg";

function AddRoutineFitnessProgram(){

    const [errorMessages, setErrorMessages] = useState({});
    const [routine, setRoutine] = useState({
        name: "",
        description: "",
        activityLevel: "",
        listOfPhysicalExercises: [],
        listOfFood: [],
        specialist: {}
    });
    const [enableFitnessProgram, setEnableFitnessProgram] = useState(false);
    const [typesOfExercise, setTypesOfExercise] = useState( [] );
    const [physicalExercises, setPhysicalExercises] = useState( [] );
    const [selectedExercises, setSelectedExercises] = useState( [] );
    const [currentExercise, setCurrentExercise] = useState( {
        name: "",
        timeOfExecution: "",
        caloriesBurnedPerMinute: "",
        burnedCalories: 0
    } );
    const [activityLevels, setActivityLevels] = useState( [] );
    const [checkedList] = useState(new Array(activityLevels.length).fill(false));
    const [selectedLevel, setSelectedLevel] = useState("");
    const [dataIsValid, setDataIsValid] = useState(false);

    useEffect(() => {

        fetch('http://localhost:8080/health-reset/physicalExercise/index')
            .then((response) => response.json())
            .then((json) => {
                setPhysicalExercises(json);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(physicalExercises)

        fetch('http://localhost:8080/health-reset/typeOfExercise/index')
            .then((response) => response.json())
            .then((json) => {
                setTypesOfExercise(json);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(typesOfExercise)

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
        name: "name already exists",
        empty_name: "specify a name for your routine",
        activityLevel: "choose an activity level"
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleInput = event => {
        const name = event.target.name;
        const value = event.target.value;
        setRoutine({ ...routine, [name] : value,
            specialist: JSON.parse(localStorage.getItem('specialist'))});
        localStorage.setItem("routine", JSON.stringify(routine));
        console.log(routine);
        setDataIsValid(false);
    }

    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setSelectedLevel(target.value);
        }
        setRoutine({ ...routine, activityLevel: selectedLevel});
    };

    useEffect(() => {
        setRoutine({ ...routine, activityLevel: selectedLevel});
    }, [selectedLevel])


    const handleAddFitnessProgram = e => {
        setEnableFitnessProgram(true);
    }

    const handleAddExercise = e =>{
        setSelectedExercises([...selectedExercises, currentExercise])
        setRoutine({...routine, listOfPhysicalExercises: selectedExercises})
        localStorage.setItem("routine", JSON.stringify(routine));
    }

    useEffect(() => {
        setSelectedExercises([ ...selectedExercises]);
        setRoutine({...routine, listOfPhysicalExercises: selectedExercises});
        localStorage.setItem("routine", JSON.stringify(routine));
    }, [currentExercise])

    // useEffect(() => {
    //     setRoutine({...routine, listOfPhysicalExercises: selectedExercises});
    //     localStorage.setItem("routine", JSON.stringify(routine));
    // }, [selectedExercises])

    const handleGoNext = e => {
        axios
            .get("http://localhost:8080/health-reset/routine/checkIfExists", {
                params: {
                    name: routine.name,
                }
            })
            .then((response) => {
                if (response.data === "name_exists") {
                    setErrorMessages({name: "name", message: errors.name});
                    localStorage.removeItem("routine");
                } else if (routine.name === "") {
                    setErrorMessages({name: "empty_name", message: errors.empty_name});
                    localStorage.removeItem("routine");
                } else if (routine.activityLevel === "") {
                    setErrorMessages({name: "activityLevel", message: errors.activityLevel});
                    localStorage.removeItem("routine");
                } else {
                    setDataIsValid(true);
                    localStorage.setItem("routine", JSON.stringify(routine));
                }
                console.log(response.data);
            })
            .catch((error) =>
                console.error("There was an error!", error.response.data.message)
            );
    }


    console.log(routine)

    const renderForm = (
        <div className="form">
            <form>
                <div>
                    <div>
                    <div className="input-container">
                        <label>Give a name to this routine: </label>
                        <input type="text"
                               value={routine.name}
                               onChange={handleInput}
                               name="name" required
                               id="name"/>
                        {renderErrorMessage("name")}
                        {renderErrorMessage("empty_name")}
                    </div>
                    <div className="input-container">
                        <label>Select the activity level of the fitness program: </label>
                        <form>
                            {activityLevels.map(({activityLevel}) => (
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
                            {renderErrorMessage("activityLevel")}
                        </form>

                    </div>
                    <div className="text-center">
                        <Button as={Col}
                                variant="success"
                                onClick={() => handleAddFitnessProgram()}
                        >Add fitness program
                        </Button>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    {enableFitnessProgram ?
                        <div className="input-container">
                            <label>Add some exercises to create a fitness program</label>
                            <form>
                                <Button as={Col}
                                        variant="secondary"
                                        style={{display: 'flex', justifyContent: 'center'}}
                                        onClick={() => handleAddExercise()}>Add to list
                                </Button>
                                {typesOfExercise.map(({typeOfExercise}) => {
                                    let p = typeOfExercise;
                                    return (
                                        <div className="row-cols-1">
                                            <div key={typeOfExercise}>
                                                <label> <b> {typeOfExercise} </b> </label>
                                                <div className="row-cols-1">
                                                    <select onChange={event => {
                                                        for(var i = 0; i < physicalExercises.length; i++){
                                                            if (event.target.value === physicalExercises.at(i).name){
                                                                setCurrentExercise(physicalExercises.at(i))
                                                            }
                                                        }
                                                    }}>
                                                        {physicalExercises.map(({id, name, typeOfExercise}) => {
                                                            if(p === typeOfExercise.typeOfExercise){
                                                                return (
                                                                    <option key={id} value={name}>
                                                                        {name}
                                                                    </option>
                                                                )
                                                            }
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <span>&nbsp;&nbsp;</span>
                                        </div>
                                    )
                                })}
                            </form>
                            {(selectedExercises.length!==0) ?
                                <div>
                                    Selected exercises:
                                    <ul>
                                        {selectedExercises.map(({id, name, typeOfExercise}, key) => {
                                            return (
                                                <li>{name}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                : null}
                        </div>
                        : null}
                    </div>
                    <Button as={Col}
                            variant="secondary"
                            style={{display: 'flex', justifyContent: 'center'}}
                            onClick={() => handleGoNext()}>Check if data is valid
                    </Button>
                    <span>&nbsp;&nbsp;</span>
                    <nav>
                        <Link to="/SpecialistActions">
                            <Button as={Col} variant="outline-dark">Go back</Button>
                        </Link>
                        <span>&nbsp;&nbsp;</span>
                        { dataIsValid ?
                            <Link to="/AddRoutineMealPlan">
                                <Button
                                    as={Col}
                                    variant="outline-success"
                                >Go to the next step: Create a meal plan!
                                </Button>
                            </Link>
                            : null}
                    </nav>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <span>&nbsp;&nbsp;</span>
            <div className="login-form" style={{backgroundColor: 'mistyrose'}}>
                <div className="title">Propose a routine</div>
                {renderForm}
                <Outlet />
            </div>
        </div>
    );
}

export default AddRoutineFitnessProgram;