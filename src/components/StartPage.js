import React from "react";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../img/b.jpg"

function StartPage(){
    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
                <span>&nbsp;&nbsp;</span>
                <div className='App'>

                    <h1 className="text-center"><strong>Welcome to Health Reset!</strong></h1>
                    <span>&nbsp;&nbsp;</span>
                    <nav>

                        <div>
                            <h2 className="text-center"><strong>Regular users</strong></h2>
                            <h3 className="text-center">Do you have an account or do you want to create one?</h3>

                            <Link to="/LogInRegularUser">
                                <Button as={Col} variant="success">Log in</Button>
                            </Link>

                            <span>&nbsp;&nbsp;</span>

                            <Link to="/SignUpRegularUser">
                                <Button as={Col} variant="success">Create an account</Button>
                            </Link>
                        </div>

                        <span>&nbsp;&nbsp;</span>

                        <div>
                            <h2 className="text-center"><strong>Health Specialists</strong></h2>
                            <h3 className="text-center">Are you a specialist of this app or do you want to become one?</h3>

                            <Link to="/LogInSpecialist">
                                <Button as={Col} variant="secondary">Log in </Button>
                            </Link>

                            <span>&nbsp;&nbsp;</span>

                            <Link to="/SignUpSpecialist">
                                <Button as={Col} variant="secondary">Create an account</Button>
                            </Link>
                        </div>

                        <span>&nbsp;&nbsp;</span><span>&nbsp;&nbsp;</span>

                        <div>
                            <h2 className="text-center"><strong>Application Administrators</strong></h2>
                            <h3 className="text-center">   Are you an admin or do you want to become one?   </h3>

                            <Link to="/LogInAdmin">
                                <Button as={Col} variant="primary">Log in </Button>
                            </Link>

                            <span>&nbsp;&nbsp;</span>

                            <Link to="/SignUpAdmin">
                                <Button as={Col} variant="primary">Create an account</Button>
                            </Link>
                        </div>

                        <span>&nbsp;&nbsp;</span>
                    </nav>
                    <Outlet />
                </div>
        </div>
    );
}

export default StartPage;