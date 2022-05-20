import React, {useEffect, useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "react-bootstrap";
import background from "../../img/b.jpg";

function SearchForRoutines(){

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState({});
    const [enableView, setEnableView] = useState(false);
    const [routines, setRoutines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selected, setSelected] = useState(false);


    useEffect(() => {
        fetch('http://localhost:8080/health-reset/routine/index')
            .then((response) => response.json())
            .then((json) => {
                setRoutines(json);
            })
            .catch((error) => {
                console.log(error);
            });
    })

    const handleSelection = e => {
        for(var i = 0; i < routines.length; i++){
            if (e.target.value === routines.at(i).name){
                setSelectedRoutine(routines.at(i))
            }
        }
        setEnableView(true);
    }

    const renderForm = (
        <div className="form">
            <div>
                <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
            </div>
            <span>&nbsp;&nbsp;</span>
            {routines.filter((value => {
                if(searchTerm === ""){
                    return value;
                }else if (value.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return value;
                }
            })).map((val, key) => {
                return (
                    <div style={{display: '10px', justifyContent: 'left'}}>
                        <div className="wrapper">
                            <div className="card-grid">
                                <article className="card" style={{ backgroundColor: 'transparent'}} key={val.name}>
                                    <div className="card-content">
                                        <h6 className="card-name"> <b>{val.name}</b>, by {val.specialist.name}</h6>
                                        <div className="card-list" >
                                            <div>
                                                {val.activityLevel}
                                                <span>&nbsp;&nbsp;</span>
                                                <Button as={Col}
                                                        variant="primary"
                                                        onClick={() => {
                                                            setSelectedRoutine(val)
                                                            setEnableView(true)
                                                        }}
                                                >View selected routine
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div>
                { enableView ?
                    <div>
                        <span>&nbsp;&nbsp;</span>
                        <div>
                            <b>Activity level:</b>
                            <div>
                                {selectedRoutine.activityLevel}
                            </div>
                            <span>&nbsp;&nbsp;</span>
                        </div>
                        <b>Fitness program:</b>
                        <ul>
                            {selectedRoutine.listOfPhysicalExercises.map(({id, name, typeOfExercise}, key) => {
                                return (
                                    <li>{name} ({typeOfExercise.typeOfExercise})</li>
                                )
                            })}
                        </ul>
                        <b>Meal plan:</b>
                        <ul>
                            {selectedRoutine.listOfFood.map(({id, name, mealOfTheDay}, key) => {
                                return (
                                    <li>{name} for {mealOfTheDay}</li>
                                )
                            })}
                        </ul>
                        <div>
                            <b>Description:</b> {selectedRoutine.description}
                        </div>
                        <span>&nbsp;&nbsp;</span>
                    </div>
                    : null}
            </div>
        </div>
    );

    return (
        <div className="App" style={{ backgroundImage: `url(${background})` }}>
            {/*<div className="login-form" style={{backgroundColor: 'darkseagreen',}}>*/}
                <div className="title">Search for a routine</div>
                {isSubmitted ?
                    <div>
                        <div className="col-md-12 text-center">
                            <span>&nbsp;&nbsp;</span>
                            <Link to="/RegularUserActions">
                                <Button as={Col} variant="outline-dark">Go back</Button>
                            </Link>
                        </div>
                    </div> : renderForm}
                <Outlet />
            {/*</div>*/}
        </div>
    );
}

export default SearchForRoutines;
