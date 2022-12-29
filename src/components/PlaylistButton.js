import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Popup from "./Popup";

const PlaylistButton = (props) => {
    const { alertPopup, createPlaylist } = props; 

    return ( 
        <section className="p-3 text-center playlistButtonSection">
          <Popup trigger={alertPopup}></Popup>
          <Form>
            <Button
              type="submit"
              className="mx-2 rounded btn playlistButton formBtns"
              style={{ height: "40px" }}
              onClick={createPlaylist}
            >
              <p className="text">SAVE THIS PLAYLIST TO SPOTIFY</p>
            </Button>
          </Form>
        </section>
     );
}
 
export default PlaylistButton;