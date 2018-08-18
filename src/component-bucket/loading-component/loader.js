import React, { Component } from "react";
import "./loader.css";

//Required PropTypes Import;
import PropTypes from "prop-types";

class LoaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let loaderClassArray = ["loaderParent"];
    if(!this.props.isBuilding) {
      loaderClassArray.push("hiddenTransform");
    }
    return (
      <div className={loaderClassArray.join(" ")}>
        <div className="posContainer text-center">
          <img src="./assets/icons/app-symbol-black.svg" className="img-responsive center-block mainAppIcon" alt="Studio React" title="Studio React"/>
          Loading
        </div>
      </div>
    );
  }
};
LoaderComponent.propTypes = {
  isBuilding: PropTypes.bool.isRequired 
};
export default LoaderComponent;
