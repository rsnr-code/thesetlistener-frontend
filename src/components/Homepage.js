import { Fragment } from "react";
import Info from "./Info";

const Homepage = (props) => {
  return (
    <Fragment>
      {!props.token && (
        <section
          className="d-flex text-center "
          style={{
            height: "90vh",
            backgroundImage: "url(concert.jpg)",
            backgroundRepeat: "no-repeat",
          }}
        >
          {props.info ? (
            <Info infoClickHandler={props.infoClickHandler} />
          ) : (
            <div className="container d-flex ">
              <div className="text-center mt-5 flex-grow-1">
                <a
                  href={`${props.AUTH_ENDPOINT}?client_id=${props.CLIENT_ID}&redirect_uri=${props.REDIRECT_URI}&response_type=${props.RESPONSE_TYPE}&scope=${props.SCOPE}`}
                >
                  <img
                    src="connectspotify.png"
                    alt="connect"
                    className="connectButton mt-5 formBtns"
                  />
                </a>
              </div>
            </div>
          )}
        </section>
      )}
    </Fragment>
  );
};

export default Homepage;
