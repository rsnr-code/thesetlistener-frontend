import { BiSearch } from "react-icons/bi";

const SearchArtist = (props) => {

    const {searchKey, setSearchKey, searchArtist, error} = props;

    const errorMessageCSS = error ? "invalid" : "";

    return ( 
        <div className="search">
        <section className="text-light p-5 text-center search">
          <div className="container" style={{ height: "15rem" }}>
            <div className="text-center mt-3">
              <h1 id="title">The Set Listener</h1>
              <p className=" my-3 mb-4 titleText">
                Create a Spotify playlist for your favorite artist's most recent
                show
              </p>

              <div className="d-flex justify-content-center searchForm">
                <form onSubmit={searchArtist}>
                  <input
                    name="artist"
                    id="artist"
                    value={searchKey}
                    type="text"
                    onChange={(e) => setSearchKey(e.target.value)}
                    className={errorMessageCSS}
                  />
                  <button type={"submit"} style={{ fontSize: "1.1rem" }}>
                    {" "}
                    <BiSearch />{" "}
                  </button>
                </form>
              </div>
            </div>
            
          </div>
     
        </section>
      </div>
     );
}
 
export default SearchArtist;