import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation.css";

export const NavbarComponent = (props) => {
  return (
    <div className="navBar">
      <Row className="show-grid">
        <Col xs={6} className="segment">
          <img src="./assets/icons/app-symbol.svg" className="img-responsive" alt="Studio React" title="Studio React"/>
        </Col>
        <Col xs={6} className="segment">
          <Button onClick={props.onClickHandler} className="defaultButton" type="button">
            <img src="./assets/icons/menu-icon.svg" className="img-responsive" alt="Menu" title="Menu"/>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export const NavigationComponent = ({showNav, onClickHandler}) => {
  const navigationArray = [
    {linkName: "Home", linkDescription: "The place where it all begins", linkRef: "/"},
    {linkName: "Listings", linkDescription: "The lastest Movie/TV listings and more", linkRef: "/view-listings"}
  ];

  let navClass = ["navigationParent", "hiddenTransform"];
  if(showNav) {
    navClass.pop();
  }

  return (
    <div className={navClass.join(" ")}>
      <div className="navigationHeader">
        <Row className="show-grid">
          <Col xs={6} className="segment positionRelative">
            <img src="./assets/icons/app-symbol.svg" className="img-responsive" alt="Studio React" title="Studio React"/>
            <span>M<br/>e<br/>n<br/>u</span>
          </Col>
          <Col xs={6} className="segment">
            <Button className="defaultButton" type="button" onClick={onClickHandler}>
              <img src="./assets/icons/menu-close-icon.svg" className="img-responsive" alt="Studio React" title="Studio React"/>
            </Button>
          </Col>
        </Row>
      </div>
      <div className="navigationBody">
        <ul className="list-unstyled navList">
          {
            navigationArray.map((thisNavObject, thisIndex) => {
              return (
                <li key={thisNavObject.linkName} onClick={onClickHandler}>
                  <Link to={thisNavObject.linkRef}>
                    <span className="numero">{thisIndex + 1}</span><br/>
                    <span className="linkTitle">{thisNavObject.linkName}</span>
                    <br/>
                    {thisNavObject.linkDescription}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};
