import React, {useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";
import background from "../../img/b.jpg";

function AddPrimaryFood(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [food, setFood] = useState({
        name: "",
        quantity: "",
        calories: "",
        protein: "",
        fat: "",
        sodium: ""
    });

    const errors = {
        name: "invalid name",
        quantity: "invalid quantity",
        calories: "invalid number of calories",
        protein: "invalid protein",
        fat: "invalid fat",
        sodium: "invalid sodium"
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        console.log(food);

        axios
            .post("http://localhost:8080/health-reset/primaryFood/add", food)
            .then((response) => {
                console.info(response);
                if (response.data === "name_error") {
                    setErrorMessages({name: "name", message: errors.name});
                } else if(response.data === "quantity_error"){
                    setErrorMessages({name: "quantity", message: errors.quantity});
                } else if(response.data === "calories_error"){
                    setErrorMessages({name: "calories", message: errors.calories});
                } else if (response.data === "protein_error"){
                    setErrorMessages({name: "protein", message: errors.protein});
                } else if(response.data === "fat_error"){
                    setErrorMessages({name: "fat", message: errors.fat});
                } else if(response.data === "sodium_error"){
                    setErrorMessages({name: "sodium", message: errors.sodium});
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
        setFood({ ...food, [name] : value});
        console.log(food);
    }

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
                                               value={food.name}
                                               onChange={handleInput}
                                               name="name" required
                                               id = "name"/>
                                    {renderErrorMessage("name")}
                                </div>
                                <div className="input-container">
                                    <label>Quantity(grams) </label>
                                    <input type="number"
                                           value={food.quantity}
                                           onChange={handleInput}
                                           name="quantity" required
                                           id="quantity"/>
                                    {renderErrorMessage("quantity")}
                                </div>
                                <div className="input-container">
                                    <label>Calories </label>
                                    <input type="text"
                                           value={food.calories}
                                           onChange={handleInput}
                                           name="calories" required
                                           id = "calories"/>
                                    {renderErrorMessage("calories")}
                                </div>
                                <div className="input-container">
                                        <label>Protein </label>
                                        <input type="number"
                                               value={food.protein}
                                               onChange={handleInput}
                                               name="protein" required
                                               id="protein"/>
                                        {renderErrorMessage("protein")}
                                </div>
                                <div className="input-container">
                                        <label>Fat </label>
                                        <input type="number"
                                               value={food.fat}
                                               onChange={handleInput}
                                               name="fat" required
                                               id="fat"/>
                                        {renderErrorMessage("fat")}
                                </div>
                                <div className="input-container">
                                    <label>Sodium </label>
                                    <input type="number"
                                           value={food.sodium}
                                           onChange={handleInput}
                                           name="sodium" required
                                           id="sodium"/>
                                    {renderErrorMessage("sodium")}
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

export default AddPrimaryFood;