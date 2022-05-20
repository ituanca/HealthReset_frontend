import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";

function AdminActions(){

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <span>&nbsp;&nbsp;</span>
            <div className="login-form" style={{backgroundColor: 'lightblue',}}>
                <div className="title">Admin</div>
                <div>
                    <span>&nbsp;&nbsp;</span>

                    <div className="col-md-12 text-center">
                        <Link to="/AddPrimaryFood">
                            <Button as={Col} variant="primary">Add primary food</Button>
                        </Link>
                    </div>

                    <span>&nbsp;&nbsp;</span>

                    <div className="col-md-12 text-center">
                        <Link to="/AddPhysicalExercise">
                            <Button as={Col} variant="primary">Add physical exercise</Button>
                        </Link>
                    </div>

                    <span>&nbsp;&nbsp;</span>

                    <div className="col-md-12 text-center">
                        <Link to="/ManageRoutines">
                            <Button as={Col} variant="primary">Manage posted routines</Button>
                        </Link>
                    </div>

                    <span>&nbsp;&nbsp;</span>

                    <div className="col-md-12 text-center">
                        <Link to="/">
                            <Button as={Col} variant="outline-dark">Go back</Button>
                        </Link>
                    </div>

                    <span>&nbsp;&nbsp;</span>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default AdminActions;