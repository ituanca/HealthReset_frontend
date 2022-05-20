import React, {useEffect, useState} from "react";
import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "react-bootstrap";
import axios from "axios";
import background from "../../img/b.jpg";
import {Form} from "reactstrap";

function ManageRoutines(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState({});
    const [routines, setRoutines] = useState([]);
    const [enableView, setEnableView] = useState(false);
    const [selected, setSelected] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [approvePressed, setApprovePressed] = useState(false);
    const [disapprovePressed, setDisapprovePressed] = useState(false);

    const errors = {
        update: "update failed",
    };


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

    useEffect(() => {

        axios
            .get("http://localhost:8080/health-reset/routine/updateStatus", {
                params:{
                    name: selectedRoutine.name
                }
            })
            .then((response) => {
                if(response.data === ""){
                    console.log("There was an error!")
                }else{
                    setSelectedRoutine(response.data);
                }
            })
            .catch((error) =>
                console.error("There was an error!", error.response.data.message)
            );

    }, []);


    const handleViewRoutine = e => {
        if(selected){
            setEnableView(true);
        }
    }

    function handleStatusChange() {
        if(selectedRoutine.statusRoutine !== "NOT APPROVED"){
            console.log("ojif8g954i")

            axios
                .put('http://localhost:8080/health-reset/routine/updateStatus', selectedRoutine)
                .then((response) => {
                    if (response.data === "not_updated") {
                        setErrorMessages({name: "update_failed", message: errors.update});
                    }else{
                        setUpdated(true);
                        console.info(response);
                    }
                })
                .catch((error) => {
                    console.error("There was an error!", error.response.data.message)
                });
        }
    }

    const handleApproveRoutine = e => {
        setApprovePressed(true);
        setSelectedRoutine({ ...selectedRoutine, statusRoutine: "APPROVED"})
        handleStatusChange()
    }

    const handleDisapproveRoutine = e => {
        setDisapprovePressed(true);
        setSelectedRoutine({ ...selectedRoutine, statusRoutine: "DISAPPROVED"})
        handleStatusChange()
    }

    useEffect(() => {
        setSelectedRoutine({ ...selectedRoutine, statusRoutine: "APPROVED"})
    }, [approvePressed])

    useEffect(() => {
        setSelectedRoutine({ ...selectedRoutine, statusRoutine: "DISAPPROVED"})
    }, [disapprovePressed])

    console.log(selectedRoutine)

    const renderForm = (
        <div className="form">
            <form>
                <div className="input-container">
                    <label> Select one of the routines which were not approved yet: </label>
                    <select onChange={event => {
                        setUpdated(false);
                        setSelected(true);
                        setApprovePressed(false);
                        setDisapprovePressed(false);
                        for(var i = 0; i < routines.length; i++){
                            if (event.target.value === routines.at(i).name){
                                setSelectedRoutine(routines.at(i))
                            }
                        }
                    }}>
                        {routines.map(({id, name, specialist, statusRoutine}) => {
                            if (statusRoutine==="NOT APPROVED") {
                                return (
                                    <option key={id} value={name}>
                                        {name}, specialist:{specialist.name}
                                    </option>
                                )
                            }
                        })}
                    </select>
                </div>
                <div className="text-center">
                    <Button as={Col}
                            variant="primary"
                            onClick={() => handleViewRoutine()}
                    >View selected routine
                    </Button>
                </div>
                <div>
                    { enableView ?
                        <div>
                            <span>&nbsp;&nbsp;</span>
                            <div>
                                <b>Activity level:</b> {selectedRoutine.activityLevel}
                            </div>
                            <b>Fitness program:</b>
                            <ul>
                                {selectedRoutine.listOfPhysicalExercises.map(({id, name, typeOfExercise}, key) => {
                                    return (
                                        <li>{name}, type {typeOfExercise.typeOfExercise}</li>
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
                            <div className="text-center">
                                <Button as={Col}
                                        variant="success"
                                        onClick={() => handleApproveRoutine()}
                                >Approve routine
                                </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button as={Col}
                                        variant="danger"
                                        onClick={() => handleDisapproveRoutine()}
                                >Disapprove routine
                                </Button>
                                {updated ?
                                    <div> Updated! </div>
                                    : null}
                            </div>
                        </div>
                        : null}
                </div>
                <span>&nbsp;&nbsp;</span>
                <div className="col-md-12 text-center">
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/AdminActions">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                </div>
                <span>&nbsp;&nbsp;</span>
            </form>
        </div>
    );

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <div className="login-form" style={{backgroundColor: 'lightblue',}}>
                <div className="title">Manage the proposed routines</div>
                {isSubmitted ?
                    <div>
                        <div className="col-md-12 text-center">
                            <span>&nbsp;&nbsp;</span>
                            <Link to="/AdminActions">
                                <Button as={Col} variant="outline-dark">Go back</Button>
                            </Link>
                        </div>
                    </div> : renderForm}
                <Outlet />
            </div>
        </div>
    );
}

export default ManageRoutines;