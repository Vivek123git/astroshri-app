import React from "react";
import { Card } from "@material-ui/core";
import a from "../../images/man.png";
import b from "../../images/private-key.png";
import c from "../../images/shield.png";
const Securety = () => {
  const data = [
    {
      tittle: "Private & Confidential",
      icon: b,
    },
    {
      tittle: "Secured Payments",
      icon: c,
    },
    {
      tittle: "Verified Astrologers",
      icon: a,
    },
  ];

  return (
    <>
      <div className="security_section_bg">
        <div className="container">
          <h1 className="security_section_heading">Why Rakshaa?</h1>
          <div className="security_section_box">
            {data.map((data, i) => (
              <div className="security_section_content" key={i}>
                <Card className="Card_shadow security_hover m-3 p-4">
                  <div className="card_responsive">
                    <div className="best_astro d-flex justify-content-center">
                      <img src={data.icon} />
                    </div>
                    <div className="text-center mt-3">
                      <h4 className="security_section_tittle pb-2">{data.tittle}</h4>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Securety;
