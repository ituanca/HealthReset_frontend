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
        listOfPhysicalExercises: {},
        burnedCalories: 0,
        listOfTrackedFood: {},
        eatenCalories: "",
        regularUser: []
    });
    const [physicalExercises, setPhysicalExercises] = useState( [] );
    const [executedExercises, setExecutedExercises] = useState( [] );
    const [currentExercise, setCurrentExercise] = useState( {
        name: "",
        timeOfExecution: "",
        typeOfExercise: "",
        caloriesBurnedPerMinute: "",
        burnedCalories: 0
    } );
    const [food, setFood] = useState( [] );
    const [eatenFood, setEatenFood] = useState( [] );
    const [currentEatenFood, setCurrentEatenFood] = useState( {
        name: "",
        calories: "",
        protein: "",
        fat: "",
        sodium: "",
        quantity: "",
        mealOfTheDay: "",
        eatenQuantity: "",
        eatenCalories: 0
    } );
    const [mealsOfTheDay, setMealsOfTheDay] = useState( [] );


    // useEffect(() => {
    //     fetch('http://localhost:8080/health-reset/physicalExercise/index')
    //         .then((response) => response.json())
    //         .then((json) => {
    //             setPhysicalExercises(json);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     console.log(physicalExercises)
    //     localStorage.setItem("physicalExercises", JSON.stringify(physicalExercises));
    // }, []);

    useEffect(() => {
        fetch('http://localhost:8080/health-reset/trackedExercise/index')
            .then((response) => response.json())
            .then((json) => {
                setPhysicalExercises(json);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(physicalExercises)

        fetch('http://localhost:8080/health-reset/mealOfTheDay/index')
            .then((response) => response.json())
            .then((json) => {
                setMealsOfTheDay(json);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(food)

        fetch('http://localhost:8080/health-reset/trackedFood/index')
            .then((response) => response.json())
            .then((json) => {
                setFood(json);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(food)

    }, []);

    const errors = {
        nrOfSteps: "invalid number",
        date: "date not selected",
        timeOfExecution: "invalid number of minutes",
        eatenQuantity: "invalid quantity"
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        axios
            .post('http://localhost:8080/health-reset/trackedActivity/create', trackedActivity)
            .then((response) => {
                console.info(response);
                if (response.data === "invalid_nrOfSteps") {
                    setErrorMessages({name: "nrOfSteps", message: errors.nrOfSteps});
                    localStorage.removeItem("trackedActivity");
                } else if(response.data === "invalid_timeOfExecution"){
                    setErrorMessages({name: "timeOfExecution", message: errors.timeOfExecution});
                    localStorage.removeItem("trackedActivity");
                } else if(response.data === "invalid_quantity"){
                    setErrorMessages({name: "eatenQuantity", message: errors.eatenQuantity});
                    localStorage.removeItem("trackedActivity");
                } else {
                    setIsSubmitted(true);
                    localStorage.setItem("profile", JSON.stringify(trackedActivity));
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTrackedActivity({ ...trackedActivity, [name] : value,
            regularUser: JSON.parse(localStorage.getItem('regularUser'))});
    }

    console.log(executedExercises)

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleTimeOfExecution = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCurrentExercise({ ...currentExercise, [name] : value})
    }

    const handleComputationExercise = (caloriesBurnedPerMinute, timeOfExecution) => {
        setCurrentExercise({...currentExercise, burnedCalories: caloriesBurnedPerMinute * timeOfExecution})
        setExecutedExercises([...executedExercises, currentExercise])
        setTrackedActivity({...trackedActivity,
            listOfPhysicalExercises: executedExercises,
            burnedCalories: trackedActivity.burnedCalories + (caloriesBurnedPerMinute * timeOfExecution)});
    }

    useEffect(() => {
        setExecutedExercises([ ...executedExercises]);
    }, [currentExercise])

    useEffect(() => {
        setTrackedActivity({ ...trackedActivity, listOfPhysicalExercises: executedExercises});
    }, [executedExercises])

    const handleEatenQuantity = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCurrentEatenFood({...currentEatenFood, [name] : value})
    }

    const handleComputationFood = (quantity, calories, eatenQuantity) => {
        setCurrentEatenFood({...currentEatenFood, eatenCalories: calories * eatenQuantity / quantity})
        setEatenFood([...eatenFood, currentEatenFood])
        setTrackedActivity({...trackedActivity,
            listOfTrackedFood: eatenFood,
            eatenCalories: trackedActivity.eatenCalories + (calories * eatenQuantity / quantity)});
    }

    useEffect(() => {
        setEatenFood([ ...eatenFood]);
    }, [currentEatenFood])

    useEffect(() => {
        setTrackedActivity({ ...trackedActivity, listOfTrackedFood: eatenFood});
    }, [eatenFood])

    console.log(currentExercise)
    console.log(currentEatenFood)
    console.log(trackedActivity)

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Date </label>
                    <input type="date"
                           value={trackedActivity.date}
                           onChange={handleInput}
                           name="date" required/>
                    {renderErrorMessage("date")}
                </div>
                <div className="input-container">
                    <label>Number of steps </label>
                    <input type="number"
                           value={trackedActivity.nrOfSteps}
                           onChange={handleInput}
                           name="nrOfSteps"/>
                    {renderErrorMessage("nrOfSteps")}
                </div>
                <div className="input-container">
                    <label>Exercise</label>
                    <select onChange={event => {
                        for(var i = 0; i < physicalExercises.length; i++){
                            if (event.target.value === physicalExercises.at(i).name){
                                setCurrentExercise(physicalExercises.at(i))
                            }
                        }
                    }}>
                        {physicalExercises.map(({id, name}) => (
                            <option key={id} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <table cellSpacing="3" bgcolor="#000000">
                        <tr bgcolor="#ffffff">
                            <th width="15%">Exercise</th>
                            <th width="15%">Type</th>
                            <th width="15%">Time of execution(minutes)</th>
                            <th width="20%">Compute calories</th>
                            <th width="15%">Burned calories</th>
                        </tr>
                        <tr bgcolor="#ffffff">
                            <td>{currentExercise.name}</td>
                            <td>{currentExercise.typeOfExercise}</td>
                            <td>
                                <input type="number"
                                       value={currentExercise.timeOfExecution}
                                       onChange={handleTimeOfExecution}
                                       name="timeOfExecution"/>
                                {renderErrorMessage("timeOfExecution")}
                            </td>
                            <td>
                                <Button as={Col}
                                        variant="success"
                                        name={currentExercise.name}
                                        value={currentExercise.name}
                                        onClick={() => handleComputationExercise(currentExercise.caloriesBurnedPerMinute, currentExercise.timeOfExecution) }>Compute
                                </Button>
                            </td>
                            <td>{currentExercise.burnedCalories}</td>
                        </tr>
                    </table>
                    <div>
                        {(executedExercises.length!==0) ?
                            <div>
                                <div>
                                    Exercises:
                                    <ul>
                                        {executedExercises.map(({name, typeOfExercise, timeOfExecution, caloriesBurnedPerMinute, burnedCalories}, key) => {
                                            return (
                                                    <li>{name} - {caloriesBurnedPerMinute * timeOfExecution} burned calories</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    Total calories burned: {trackedActivity.burnedCalories}
                                </div>
                            </div>
                            : null}
                    </div>
                </div>
                <div className="input-container">
                    <label>Food</label>
                    <select onChange={event => {
                        for(var i = 0; i < food.length; i++){
                            if (event.target.value === food.at(i).name){
                                setCurrentEatenFood(food.at(i))
                            }
                        }
                    }}>
                        {food.map(({id, name}) => (
                            <option key={id} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <table cellSpacing="3" bgcolor="#000000">
                        <tr bgcolor="#ffffff">
                            <th width="15%">Food</th>
                            <th width="15%">Calories(100g)</th>
                            <th width="15%">Protein</th>
                            <th width="15%">Fat</th>
                            <th width="15%">Sodium</th>
                            <th width="15%">Meal</th>
                            <th width="10%">Quantity(g)</th>
                            <th width="15%">Compute calories</th>
                            <th width="15%">Calories</th>
                        </tr>
                        <tr bgcolor="#ffffff">
                            <td>{currentEatenFood.name}</td>
                            <td>{currentEatenFood.calories}</td>
                            <td>{currentEatenFood.protein}</td>
                            <td>{currentEatenFood.fat}</td>
                            <td>{currentEatenFood.sodium}</td>
                            <td>
                                <div className="input-container">
                                    <select onChange={event => {
                                        setCurrentEatenFood({...currentEatenFood, mealOfTheDay: event.target.value})
                                    }}>
                                        {mealsOfTheDay.map(({id, mealOfTheDay}) => (
                                            <option key={id} value={mealOfTheDay}>
                                                {mealOfTheDay}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <input type="number"
                                       value={currentEatenFood.eatenQuantity}
                                       onChange={handleEatenQuantity}
                                       name="eatenQuantity"/>
                                {renderErrorMessage("eatenQuantity")}
                            </td>
                            <td>
                                <Button as={Col}
                                        variant="success"
                                        name={currentEatenFood.name}
                                        value={currentEatenFood.name}
                                        onClick={() =>
                                            handleComputationFood(
                                                currentEatenFood.quantity,
                                                currentEatenFood.calories,
                                                currentEatenFood.eatenQuantity) }>Compute
                                </Button>
                            </td>
                            <td>{currentEatenFood.eatenCalories}</td>
                        </tr>
                    </table>
                    <div>
                        {(eatenFood.length!==0) ?
                            <div>
                                <div>
                                    Eaten food:
                                    <ul>
                                        {eatenFood.map(({name, calories, quantity, eatenQuantity}, key) => {
                                            return (
                                                <li>{name} - {(calories * eatenQuantity / quantity)} eaten calories</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    Total calories eaten: {trackedActivity.eatenCalories}
                                </div>
                            </div>
                            : null}
                    </div>
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
                <div className="title">Track your activity</div>
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