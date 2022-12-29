import { Alert } from "react-bootstrap";

const Popup = (props) => {
  return props.trigger ? (
    <Alert
      variant="success"
      className="success-alert"
      style={{
        width: "40%",
        height: "40%",
        margin: "20px auto",
        padding: "0px",
      }}
    >
      <Alert.Heading
        style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "10px" }}
      >
        Success!
      </Alert.Heading>
      <p style={{ fontSize: "1rem" }}>
        Playlist created! Open up your Spotify and give it a listen!
      </p>
    </Alert>
  ) : (
    ""
  );
};

export default Popup;
