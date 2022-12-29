import { Fragment } from "react";
import { GiExitDoor, GiInfo } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = (props) => {
  
    return ( 
        <Fragment>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3">
          <div className="container">
            <div className="d-flex align-items-center">
              <img
                src="spotify-logo.png"
                alt="logo"
                className="logo img-fluid"
              />
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <p className="navbar-brand" style={{ marginTop: "16px" }}>
                  T H E &nbsp; S E T &nbsp; L I S T E N E R
                </p>
              </Link>
            </div>

            {props.token ? (
              <div>
                <button
                  onClick={props.onLogout}
                  className="button navbar-brand formBtns"
                >
                  {" "}
                  <GiExitDoor
                    className="logoutBtn"
                    style={{ fontSize: "2.5rem" }}
                  />{" "}
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={props.infoClickHandler}
                  className="button navbar-brand formBtns"
                >
                  {" "}
                  <GiInfo
                    className="infoBtn"
                    style={{ fontSize: "1.5rem" }}
                  />{" "}
                </button>
              </div>
            )}
          </div>
        </nav>
        
        </Fragment>
     );
}
 
export default Header;