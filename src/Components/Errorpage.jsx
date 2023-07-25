import React from "react";
import { Card } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const Errorpage = () => {
  const navigate = useNavigate();

  const btncss = {
    zIndex: 1,
    overflow: "hidden",
    background: "transparent",
    position: "relative",
    padding: "8px 50px",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1em",
    letterSpacing: "2px",
    transition: "0.2s ease",
    fontWeight: "bold",
    margin: "5px 0px",
    backgroundColor: "#000",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#777",
    },
  };

  return (
    <div>
      {" "}
      <section className="new_kundli_section mb-4" style={{ height: "100vh" }}>
        <div className="freeKundli_section mb-2" style={{ height: "100vh" }}>
          <div className="container">
            <h2 className="getyourfree_kundley">404</h2>
            <Card className="Card_shadow text-center m-2 p-3">
              <h4>UH OH! You're lost.</h4>
              <p>
                The page you are looking for does not exist. How you got here is
                a mystery. But you can click the button below to go back to the
                homepage.
              </p>

              <button
                className="btn green"
                onClick={() => navigate("/")}
                style={btncss}
              >
                HOME
              </button>
            </Card>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default Errorpage;
