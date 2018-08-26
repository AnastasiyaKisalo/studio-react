import React, {Component} from "react";
import { Col, Row, Clearfix } from "react-bootstrap";

//Required WrapperObject Import
import WrapperObject from "../wrapper-component/wrapper-component.js";

//Required CSS File Imports;
import "./common-components.css";

//Curain Element for Transparent Backdrop;
export const CurtainElement = (props) => {
  return (
    <div className="curtain"></div>
  );
};

//Backdrop Component for holding the fixed backdrop image;
export class BackdropComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgUrl: null
    }

    this.baseUrl = "https://image.tmdb.org/t/p/original";
    this.initiateBg = this.initiateBg.bind(this);
  };

  initiateBg() {
    const tempImage = new Image();
    tempImage.setAttribute("src", this.baseUrl + this.props.bgSetup);
    tempImage.addEventListener("load", () => {
      this.setState(($prevState, $nowProps) => {
        return {
          bgUrl: tempImage.getAttribute("src")
        }
      });
    });
  }

  render() {
    return (
      <div className="backdropComponent" style={{backgroundImage: 'url(' + this.state.bgUrl + ')'}}></div>
    );
  };

  componentDidMount() {
    this.initiateBg();
  };
};

//Class Object that helps to load inidividual credit blocks
//with the profile pictures.
class CreditsSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.imageRef = React.createRef();
  };

  loadProfileImage() {
    const baseUrl = "https://image.tmdb.org/t/p/original",
          imageElement = this.imageRef.current,
          errorImageUrl = "./assets/icons/no-image-icon.png";

    let tempImage = new Image();
    tempImage.setAttribute("src", baseUrl + this.props.profile_path);
    tempImage.addEventListener("load", () => {
      imageElement.setAttribute("src", tempImage.getAttribute("src"));
    });
    tempImage.addEventListener("error", () => {
      setTimeout(() => {
        imageElement.setAttribute("src", errorImageUrl);
      }, 1000);
    });
  };

  render() {
    const loaderImage = "./assets/icons/loading-img.png",
          {name, character} = this.props;
    return (
      <Col xs={6} sm={4} lg={3} className="creditsSegment">
        <div className="borderBoxContainer">
          <div className="imageContainer positionRelative">
            <img src={loaderImage} 
              className="img-responsive center-block" 
              alt={name}
              title={name}
              ref={this.imageRef}
              />
          </div>
          <p className="actorName text-center">{name}</p>
          <p className="characterName text-center">{character}</p>
        </div>
      </Col>
    );
  };

  componentDidMount() {
    this.loadProfileImage();
  };
}

//Credits Component For Tv Bio and Movie Bio Pages;
export const CreditsComponent = ({creditsInfo}) => {
  return (
    <WrapperObject>
    {
      creditsInfo.length > 0 ?
      <div className="creditsListingParent positionRelative">
        <div className="outerContainer">
          <div className="blockHeading">
            <header>
              <h3>Credits<br/><span>The People</span></h3>
            </header>
          </div>
          <Row className="show-grid">
            {
              creditsInfo.map((thisCreditsObject, thisIndex) => {
                if((thisIndex + 1) === 2) {
                  return (
                    <WrapperObject key={thisCreditsObject.name + thisIndex}>
                      <CreditsSegment {...thisCreditsObject}/>
                      <Clearfix visibleXsBlock></Clearfix>
                    </WrapperObject>
                  );
                }
                else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0 && (thisIndex + 1) % 4 === 0){
                  return (
                    <WrapperObject key={thisCreditsObject.name + thisIndex}>
                      <CreditsSegment {...thisCreditsObject}/>
                      <Clearfix></Clearfix>
                    </WrapperObject>
                  );
                }
                else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 4 === 0) {
                  return (
                    <WrapperObject key={thisCreditsObject.name + thisIndex}>
                      <CreditsSegment {...thisCreditsObject}/>
                      <Clearfix visibleXsBlock visibleLgBlock></Clearfix>
                    </WrapperObject>
                  )
                }
                else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0) {
                  return (
                    <WrapperObject key={thisCreditsObject.name + thisIndex}>
                      <CreditsSegment {...thisCreditsObject}/>
                      <div className="clearfix hidden-lg"></div>
                    </WrapperObject>
                  )
                }
                else if((thisIndex + 1) % 4 === 0) {
                  return (
                  <WrapperObject key={thisCreditsObject.name + thisIndex}>
                    <CreditsSegment {...thisCreditsObject}/>
                    <Clearfix visibleMdBlock visibleLgBlock></Clearfix>
                  </WrapperObject>
                  );
                }
                else if((thisIndex + 1) % 3 === 0) {
                  return (
                  <WrapperObject key={thisCreditsObject.name + thisIndex}>
                    <CreditsSegment {...thisCreditsObject}/>
                    <Clearfix visibleSmBlock></Clearfix>
                  </WrapperObject>
                  );
                }
                else if((thisIndex + 1) % 2 === 0) {
                  return (
                  <WrapperObject key={thisCreditsObject.name + thisIndex}>
                    <CreditsSegment {...thisCreditsObject}/>
                    <Clearfix visibleXsBlock></Clearfix>
                  </WrapperObject>
                  );
                }
                else {
                  return (
                    <CreditsSegment {...thisCreditsObject} key={thisCreditsObject.name + thisIndex}/>
                  );
                }
              })
            }
          </Row>
        </div>
      </div>
      :
      null
    }
    </WrapperObject>
  );
};

//Individual Similar Segments for Tv Bio and Movie Bio Pages;
export class SimilarSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.imageRef = React.createRef();
    
    this.loadProfileImage = this.loadProfileImage.bind(this);
  };
  
  loadProfileImage() {
    const baseUrl = "https://image.tmdb.org/t/p/original",
          imageElement = this.imageRef.current,
          errorImageUrl = "./assets/icons/no-image-icon.png";

    let tempImage = new Image();
    tempImage.setAttribute("src", baseUrl + this.props.poster_path);
    tempImage.addEventListener("load", () => {
      imageElement.setAttribute("src", tempImage.getAttribute("src"));
    });
    tempImage.addEventListener("error", () => {
      setTimeout(() => {
        imageElement.setAttribute("src", errorImageUrl);
      }, 1000);
    });
  };

  render() {
    const thisTitle = this.props.name || this.props.title,
          loaderImage = "./assets/icons/loading-img.png";
    return (
      <Col xs={6} sm={4} lg={3} className="similarSegment">
        <div className="borderBoxContainer">
          <div className="imageContainer positionRelative">
            <img src={loaderImage}
            className="img-responsive center-block" 
            alt={thisTitle} title={thisTitle}
            ref={this.imageRef}
            />
            <p>{thisTitle}</p>
          </div>
        </div>
      </Col>
    )
  };
  
  componentDidMount() {
    this.loadProfileImage();
  };
}

