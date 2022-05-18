import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";

function SpecialistActions(){

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <span>&nbsp;&nbsp;</span>
            <div className="login-form" style={{backgroundColor: 'mistyrose',}}>
                <div className="title">Specialist</div>
                <div>
                    <span>&nbsp;&nbsp;</span>

                    <div className="col-md-12 text-center">
                        <Link to="/AddRoutine">
                            <Button as={Col} variant="secondary">Add routine</Button>
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

export default SpecialistActions;