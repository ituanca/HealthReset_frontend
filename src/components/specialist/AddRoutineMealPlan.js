import React, {useEffect, useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "react-bootstrap";
import axios from "axios";
import background from "../../img/b.jpg";

function AddRoutineMealPlan(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [routine, setRoutine] = useState(JSON.parse(localStorage.getItem("routine")));
    const [enableMealPlan, setEnableMealPlan] = useState(false);
    const [mealsOfTheDay, setMealsOfTheDay] = useState( [] );
    const [food, setFood] = useState( [] );
    const [selectedFood, setSelectedFood] = useState( [] );
    const [currentFood, setCurrentFood] = useState( {
        name: "",
        calories: "",
        protein: "",
        fat: "",
        sodium: "",
        quantity: "",
        mealOfTheDay: "",
    } );

    useEffect(() => {

        fetch('http://localhost:8080/health-reset/mealOfTheDay/index')
            .then((response) => response.json())
            .then((json) => {
                setMealsOfTheDay(json);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(food)

        fetch('http://localhost:8080/health-reset/primaryFood/index')
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
        name: "invalid name",
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
    }

    const handleAddMealPlan = e => {
        setEnableMealPlan(true);
    }

    useEffect(() => {
        setSelectedFood([ ...selectedFood]);
    }, [currentFood])

    const handleAddFood = e =>{
        setSelectedFood([...selectedFood, currentFood])
        setRoutine({...routine, listOfFood: selectedFood})
        localStorage.setItem("routine", JSON.stringify(routine));
    }

    useEffect(() => {
        setRoutine({...routine, listOfFood: selectedFood});
        localStorage.setItem("routine", JSON.stringify(routine));
    }, [selectedFood])

    console.log(currentFood)
    console.log(routine)

    const renderForm = (
        <div className="form">
            <form>
                <div>
                    <div className="text-center">
                        <Button as={Col}
                                variant="success"
                                onClick={() => handleAddMealPlan()}
                        >Add meal plan
                        </Button>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    { enableMealPlan ?
                        <div>
                            <div className="input-container">
                                <Button as={Col}
                                        variant="secondary"
                                        style={{display: 'flex', justifyContent: 'center'}}
                                        onClick={() => handleAddFood()}>Add to list
                                </Button>
                                {mealsOfTheDay.map(({mealOfTheDay}) => {
                                    return (
                                        <div className="col" key={mealOfTheDay}>
                                            <label> <b> {mealOfTheDay} </b> </label>
                                            <div className="row-cols-1">
                                                <select onChange={event => {
                                                    for(var i = 0; i < food.length; i++){
                                                        if (event.target.value === food.at(i).name){
                                                            setCurrentFood({...food.at(i), mealOfTheDay: mealOfTheDay})
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
                                        </div>
                                    )
                                })}
                                <div align="left">
                                    {(selectedFood.length!==0) ?
                                        <div>
                                            Selected food:
                                            <ul>
                                                {selectedFood.map(({id, name, mealOfTheDay}, key) => {
                                                    return (
                                                        <li> {mealOfTheDay} : {name}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/AddRoutineDescription">
                        <Button as={Col} variant="outline-success">Go to the next step: Add a description!</Button>
                    </Link>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/AddRoutineFitnessProgram">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                </nav>
            </form>
        </div>
    );

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <span>&nbsp;&nbsp;</span>
            <div className="login-form" style={{backgroundColor: 'mistyrose'}}>
                <div className="title">Create a meal plan for your routine</div>
                {renderForm}
                <Outlet />
            </div>
        </div>
    );
}

export default AddRoutineMealPlan;