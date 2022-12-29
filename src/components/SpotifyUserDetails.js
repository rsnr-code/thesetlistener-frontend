const SpotifyUserDetails = (props) => {
    return ( 
        <section
          className="p-3 text-center"
          style={{
            backgroundColor: "#f2f2f3",
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
        >
          <div style={{ marginTop: "10px" }}>
            Welcome,&nbsp;{" "}
            <img className="userImage" src={props.userImage} alt="userImage" /> &nbsp;
            {props.userName}!
            <div
              className="alert alert-secondary mt-3 greetingAlert"
              style={{ margin: "0 auto" }}
            >
              <p style={{ marginTop: "5px", fontSize: "1rem" }}>
                Setlist will be displayed here
              </p>
              <p style={{ fontSize: "1rem", marginBottom: "5px" }}>
                Go ahead and type in a name into the search bar
              </p>
            </div>
          </div>
        </section>
     );
}
 
export default SpotifyUserDetails;