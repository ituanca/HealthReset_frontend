import "../styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import background from "../../img/b.jpg";

function RegularUserActions(){

    return (
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
            <span>&nbsp;&nbsp;</span>
            <div className="login-form" style={{backgroundColor: 'darkseagreen',}}>
                <div className="title">Regular user</div>
                <div>
                    <span>&nbsp;&nbsp;</span>

                    <div className="col-md-12 text-center">
                        <Link to="/EditProfile">
                            <Button as={Col} variant="success">Edit your profile</Button>
                        </Link>
                    </div>

                    <span>&nbsp;&nbsp;</span>

                    <div className="col-md-12 text-center">
                        <Link to="/TrackActivity">
                            <Button as={Col} variant="success">Track today's activity</Button>
                        </Link>
                    </div>

                    <span>&nbsp;&nbsp;</span>

                    <div className="col-md-12 text-center">
                        <Link to="/SearchForRoutines">
                            <Button as={Col} variant="success">Search for routines</Button>
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

export default RegularUserActions;