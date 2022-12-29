import { Fragment } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

const Info = (props) => {
    return ( 
        <Fragment>
            <div className="container d-flex justify-content-center">
                <div className="text-center mt-5 infoBox">
                  <p className="infoText mt-1">
                    Going to a show? Not totally familiar with an artist’s
                    catalog? Give The Set Listener a try. The Set Listener is a
                    web app that will create a Spotify playlist of an artist’s
                    most recent show.{" "}
                  </p>
                  <p className="infoText">
                    To use The Set Listener just type in the artist name, and
                    hit the search button, you’ll be presented with a playlist
                    of songs from that artist’s most recent show. Hit the ‘Save
                    this playlist to Spotify’ button and you’ll have a Spotify
                    playlist that you can listen to on your desktop or on your
                    mobile phone.
                  </p>
                  <button
                    onClick={props.infoClickHandler}
                    className="button navbar-brand formBtns"
                  >
                    {" "}
                    <RiArrowGoBackLine
                      className="infoBtn"
                      style={{ fontSize: "1.5rem" }}
                    />{" "}
                  </button>
                </div>
              </div>
        </Fragment>
     );
}
 
export default Info;