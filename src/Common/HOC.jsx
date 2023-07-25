import React, { Fragment, Component } from "react";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import HeaderBottom from "./HeaderBottom";
import Header1 from "./Header/Header1";

const HOC = (Wcomponent) => {
  return class extends Component {
    render() {
      return (
        <Fragment>
          <div className="app-container-hoc main-margin">
            <Header1 />
            <Header />
            {/* <HeaderBottom /> */}
            <div>
              <Wcomponent />
            </div>
            <Footer />
          </div>
        </Fragment>
      );
    }
  };
};

export default HOC;
