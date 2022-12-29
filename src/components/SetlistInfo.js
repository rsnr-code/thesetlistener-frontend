const SetlistInfo = (props) => {
    const { setlistInfo, setlist } = props
    
    return (
            <section
              className="p-3 text-center artistInfo"
              style={{
                backgroundColor: "#f2f2f3",
                fontSize: "1.3rem",
                fontWeight: "bold",
              }}
            >
              <div style={{ color: "#0a6312", marginBottom: "20px" }}>
                {setlistInfo}
              </div>
    
              {setlist ? (
                <div>
                  <div
                    className="accordion-title"
                    style={{ borderTop: "2px solid rgb(208, 208, 208)" }}
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-collapse collapsed  formBtns"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#question-one"
                        style={{
                          marginTop: "15px",
                          border: "none",
                          fontSize: "1.3rem",
                        }}
                      >
                        View Setlist
                      </button>
                    </h2>

                    <div
                        id="question-one"
                        className="accordion-collapse collapse"
                        data-bs-parent="#questions"
                      >
                    {setlist.map((song, i) => (
                     
                        <div className="accordion-body" key={i}>
                          {song}
                        </div>
                      
                    ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </section>
     );
}
 
export default SetlistInfo;