import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import { Col, Row, Modal, Button, Clearfix } from "react-bootstrap";
import "./person-bio.css";
import { withRouter } from "react-router";

//Import Requirements from Local Functionalities and Testings;
import {TestObjectEmptiness} from "../functionalities.js";

//Required Import for Axios
import axios from "axios";
import apiSetupObject from "../../axios/axios-setup.js";

//Required Import for Loader Component;
import LoaderComponent from "../loading-component/loader.js";

const WrapperObject = (props) => {
  return props.children;
};

class CelebrityPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageClass: ["img-responsive", "center-block", "onLoading"]
    };

    this.imageRef = React.createRef();
    this.loadProfileImage = this.loadProfileImage.bind(this);
  };
  
  loadProfileImage() {
    const imageElement = this.imageRef.current,
          errorImageUrl = "./assets/icons/no-image-icon.png";

    let tempImage = new Image();
    tempImage.setAttribute("src", this.props.profile_path);
    tempImage.addEventListener("load", () => {
      imageElement.setAttribute("src", tempImage.getAttribute("src"));
      this.setState(($prevState, $nowProps) => {
        return {
          imageClass: ["img-responsive", "center-block"] 
        }
      });
    });
    tempImage.addEventListener("error", () => {
      setTimeout(() => {
        imageElement.setAttribute("src", errorImageUrl);
      }, 1000);
    });
  };

  render() {
    const loaderImage = "./assets/icons/loading-img.png",
          {name} = this.props;
    return (
      <div className="imageContainer">
        <img ref={this.imageRef} src={loaderImage} className={this.state.imageClass.join(" ")} alt={name} title={name}/>
      </div>
    );
  };

  componentDidMount() {
    this.loadProfileImage();
  };
};

const CelebrityBasicBio = ({name, knownForDepartment, placeOfBirth, birthday, ageValue, homepage, alsoKnownAs, hasBiography, openBiography}) => {
  return (
    <WrapperObject>
      <div className="headerContainer">
        <header>
          <h1>{name}</h1>
          <p className="subHeading">Known For:</p>
          <ul className="list-unstyled knownForList">
            <li>{knownForDepartment}</li>
          </ul>
        </header>
        {
          hasBiography &&
          <Button className="defaultButton bioPopupButton" title="Open Biography" onClick={openBiography}>
            Biography
            <img src="./assets/icons/expand-icon.svg" className="img-responsive" alt="Open Biography" title="Open Biography"/>
          </Button>
        }
      </div>
      {
        !!placeOfBirth &&
        <div className="footerContainer">
          <h2>Place Of Birth:</h2>
          <p>{placeOfBirth}</p>
        </div>
      }
      {
        !!birthday &&
        <div className="footerContainer">
          <h2>Date Of Birth:</h2>
          <p>{birthday} <span className="makeOpacity">[{ageValue} Years Old]</span></p>
        </div>
      }
      {
        !!homepage &&
        <div className="footerContainer">
          <h2>Website:</h2>
          <p><a href={homepage}>{homepage}</a></p>
        </div>
      }
      {
        alsoKnownAs.length > 0 &&
        <div className="footerContainer">
          <h2>Also Known As:</h2>
          <ul className="list-unstyled akaList">
            {
              alsoKnownAs.map((thisName) => {
                return (<li key={thisName}>{thisName}</li>)
              })
            }
          </ul>
        </div>
      }
    </WrapperObject>
  );
};

const EpisodeCount = ({numValue}) => {
  return (
    <li className="episodeCount"><b>{numValue} {numValue < 2 ? "Episode" : "Episodes"}</b></li>
  );
};

const ReleaseDate = ({numValue}) => {
  const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let d = new Date(String(numValue)),
      releasedValue = d.getDate() + " " + monthArray[d.getMonth()] + " " + d.getFullYear();
  return (
    <li className="releaseDate"><b>{releasedValue}</b></li>
  );
};

class CreditBlob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageClass: ["img-responsive", "center-block", "onLoading"]
    };

    this.imageRef = React.createRef();
    this.loadProfileImage = this.loadProfileImage.bind(this);
  };

  loadProfileImage() {
    const imageElement = this.imageRef.current,
          errorImageUrl = "./assets/icons/no-image-icon.png";

    let tempImage = new Image();
    tempImage.setAttribute("src", this.props.imageUrl);
    tempImage.addEventListener("load", () => {
      imageElement.setAttribute("src", tempImage.getAttribute("src"));
      this.setState(($prevState, $nowProps) => {
        return {
          imageClass: ["img-responsive", "center-block"]
        }
      });
    });
    tempImage.addEventListener("error", () => {
      setTimeout(() => {
        imageElement.setAttribute("src", errorImageUrl);
      }, 1000);
    });
  };

  render() {
    const {mediaName, episodeCount, releaseDate} = this.props,
          loaderImage = "./assets/icons/loading-img.png";
    return (
      <Col xs={6} sm={4} lg={3} className="creditItem">
        <div className="borderBoxContainer">
          <div className="imageContainer">
            <img ref={this.imageRef} src={loaderImage}  className={this.state.imageClass.join(" ")} alt={mediaName} title={mediaName}/>
          </div>
          <p className="movieName">{mediaName}</p>
        </div>
        <ul className="list-unstyled metaList">
          {
            !!episodeCount &&
            <EpisodeCount numValue={episodeCount} />
          }
          {
            !!releaseDate &&
            <ReleaseDate numValue={releaseDate} />
          }
          <li>
            <img src="./assets/icons/expand-icon.svg" className="img-responsive expandIcon" alt="View Details" title="View Details"/>
          </li>
        </ul>
      </Col>
    );
  };

  componentDidMount() {
    this.loadProfileImage();
  };
};

const CreditItems = ({castArray, forType}) => {
  let creditsArray = castArray.map((thisCredit, thisIndex) => {
      let thisCreditObject = {
        imageUrl: "https://image.tmdb.org/t/p/w500" + thisCredit.poster_path,
        mediaName: thisCredit.title || thisCredit.name,
        thisIndex
      };

      if(thisCredit.episode_count) {
        thisCreditObject.episodeCount = thisCredit.episode_count;
      }
      if(thisCredit.release_date && forType === "movies") {
        thisCreditObject.releaseDate = thisCredit.release_date;
      }

      if((thisIndex + 1) === 2) {
        return (
          <WrapperObject key={uuidv1()}>
            <CreditBlob {...thisCreditObject}/>
            <Clearfix visibleXsBlock></Clearfix>
          </WrapperObject>
        )
      }
      else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0 && (thisIndex + 1) % 4 === 0) {
        return (
          <WrapperObject key={uuidv1()}>
            <CreditBlob {...thisCreditObject}/>
            <Clearfix visibleXsBlock visibleSmBlock visibleMdBlock visibleLgBlock></Clearfix>
          </WrapperObject>
        )
      }
      else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 4 === 0) {
        return (
          <WrapperObject key={uuidv1()}>
            <CreditBlob {...thisCreditObject}/>
            <Clearfix visibleXsBlock visibleLgBlock></Clearfix>
          </WrapperObject>
        )
      }
      else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0) {
        return (
          <WrapperObject key={uuidv1()}>
            <CreditBlob {...thisCreditObject}/>
            <div className="clearfix hidden-lg"></div>
          </WrapperObject>
        )
      }
      else if((thisIndex + 1) % 4 === 0) {
        return (
          <WrapperObject key={uuidv1()}>
            <CreditBlob {...thisCreditObject}/>
            <Clearfix visibleLgBlock></Clearfix>
          </WrapperObject>
        )
      }
      else if((thisIndex + 1) % 3 === 0) {
        return (
          <WrapperObject key={uuidv1()}>
            <CreditBlob {...thisCreditObject}/>
            <Clearfix bsClass="clearfix hidden-xs hidden-lg"></Clearfix>
          </WrapperObject>
        )
      }
      else if((thisIndex + 1) % 2 === 0) {
        return (
          <WrapperObject key={uuidv1()}>
            <CreditBlob {...thisCreditObject}/>
            <Clearfix visibleXsBlock></Clearfix>
          </WrapperObject>
        )
      }
      else {
        return (
          <WrapperObject key={uuidv1()}>
            <CreditBlob {...thisCreditObject}/>
          </WrapperObject>
        )
      }
  });
  return creditsArray;
};

class PersonBioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBuilding: true,
      showBiographyModal: false,
      showMiniMovieModal: false,
      celebrityObject: {}
    };

    this.openBiographyModal = this.openBiographyModal.bind(this);
    this.closeBiographyModal = this.closeBiographyModal.bind(this);
    this.openMiniMovieModal = this.openMiniMovieModal.bind(this);
    this.closeMiniMovieModal = this.closeMiniMovieModal.bind(this);
    this.buildCelebrityPage = this.buildCelebrityPage.bind(this);
    this.getBasicDetails = this.getBasicDetails.bind(this);
    this.getMovieCredits = this.getMovieCredits.bind(this);
    this.getTvCredits = this.getTvCredits.bind(this);
    this.hideLoaderDiv = this.hideLoaderDiv.bind(this);
  };

  openBiographyModal(event) {
    this.setState(($prevState, $nowProps) => {
      return {
        showBiographyModal: true
      }
    });
  };

  closeBiographyModal(event) {
    this.setState(($prevState, $nowProps) => {
      return {
        showBiographyModal: false
      }
    });
  };

  openMiniMovieModal(event) {
    this.setState(($prevState, $nowProps) => {
      return {
        showMiniMovieModal: true
      };
    });
  };

  closeMiniMovieModal(event) {
    this.setState(($prevState, $nowProps) => {
      return {
        showMiniMovieModal: false
      }
    });
  };

  getBasicDetails(idValue) {
    let basicDetails = axios.get(apiSetupObject.baseUrl + "person/" + idValue, {
      params: {
        api_key: apiSetupObject.apiKey
      }
    })
    .then((apiResponseObject) => {
      if(apiResponseObject.status === 200 || apiResponseObject.statusText === "OK") {
        return apiResponseObject.data;
      }
      else {
        return apiResponseObject
      }
    })
    .catch((errorResponse) => {
      console.error("Something Weng Wrong - [API Response] - Celebrity Basic Details");
    });

    return basicDetails;
  };

  getMovieCredits(idValue) {
    let movieCredits = axios.get(apiSetupObject.baseUrl + "person/" + idValue + "/movie_credits", {
      params: {
        api_key: apiSetupObject.apiKey
      }
    })
    .then((apiResponseObject) => {
      if(apiResponseObject.status === 200 || apiResponseObject.statusText === "OK") {
        return apiResponseObject.data;
      }
      else {
        return apiResponseObject
      }
    })
    .catch((errorResponse) => {
      console.error("Something Weng Wrong - [API Response] - Celebrity Movie Credits");
    });

    return movieCredits;
  };
  
  getTvCredits(idValue) {
    let tvCredits = axios.get(apiSetupObject.baseUrl + "person/" + idValue + "/tv_credits", {
      params: {
        api_key: apiSetupObject.apiKey
      }
    })
    .then((apiResponseObject) => {
      if(apiResponseObject.status === 200 || apiResponseObject.statusText === "OK") {
        return apiResponseObject.data;
      }
      else {
        return apiResponseObject
      }
    })
    .catch((errorResponse) => {
      console.error("Something Weng Wrong - [API Response] - Celebrity Tv Credits");
    });

    return tvCredits;
  };

  buildCelebrityPage(searchObject) {
    const {qid: celebrityId} = searchObject;

    axios.all([this.getBasicDetails(celebrityId), this.getMovieCredits(celebrityId), this.getTvCredits(celebrityId)])
      .then(axios.spread((basicDetails, movieCredits, tvCredits) => {
        const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let d = new Date(String(basicDetails.birthday)),
            birthday = d.getDate() + " " + monthArray[d.getMonth()] + " " + d.getFullYear(),
            ageValue = Number((new Date() - d) * 3.171e-11).toFixed(0),
            known_for_department = basicDetails.known_for_department,
            homepage = basicDetails.homepage,
            name = basicDetails.name,
            profile_path = "https://image.tmdb.org/t/p/w500" + basicDetails.profile_path,
            biography = basicDetails.biography,
            also_known_as = basicDetails.also_known_as,
            place_of_birth = basicDetails.place_of_birth,
            movieCast = [],
            tvCast = []

        movieCredits.cast.forEach((thisCast, thisIndex) => {
          if(thisIndex === 0) {
            //What is this about??
            //console.log(thisCast);
          }
          if(!!thisCast.poster_path) {
            movieCast.push(thisCast);
          }
        });

        tvCredits.cast.forEach((thisCast, thisIndex) => {
          if(!!thisCast.poster_path) {
            tvCast.push(thisCast);
          }
        });

        this.setState(($prevState, $nowProps) => {
          return {
            celebrityObject: {
              imageComponent: {
                profile_path,
                name
              },
              basicBioComponent: {
                name,
                knownForDepartment: known_for_department,
                placeOfBirth: place_of_birth,
                birthday,
                ageValue,
                homepage,
                alsoKnownAs: also_known_as,
                hasBiography: biography ? true : false,
                openBiography: this.openBiographyModal
              },
              biography,
              also_known_as,
              movieCast,
              tvCast
            }
          }
        });
      }))
      .catch((error) => {
        console.log("OMG Something Is Wrong Somewhere");
      });
  };
  
  makeLocationQuerySplit(locationQuery) {
    let searchObject = {};
    if("URLSearchParams" in window && "entries" in URLSearchParams.prototype) {
      let urlParams = new URLSearchParams(locationQuery).entries();
      for(let thisValuePair of urlParams) {
        searchObject[thisValuePair[0]] = thisValuePair[1];
      }
    }
    else {
      let locationQuerySplit = locationQuery.split("?")[1].split("&");
      for (var i = 0; i < locationQuerySplit.length; i++) {
        let thisValuePair = locationQuerySplit[i].split("=");
        searchObject[thisValuePair[0]] = thisValuePair[1];
      }
    }
    return searchObject;
  };
  
  hideLoaderDiv() {
    this.setState(($prevState, $nowProps) => {
      return {
        isBuilding: false
      }
    });
  };

  render() {
    const {celebrityObject} = this.state;
    let mainContainerClasses = ["outerBorder", "personBioPage", "positionRelative", "preventBodyScroll"],
        hasBeenBuilt = !this.state.isBuilding ? true : false;

    if(hasBeenBuilt) {
      mainContainerClasses.pop();
    }
    return (
      <div className={mainContainerClasses.join(" ")}>
        {
          <WrapperObject>
            <LoaderComponent isBuilding={this.state.isBuilding}/>
            {
              !TestObjectEmptiness(celebrityObject) &&
              <WrapperObject>
                <div className="mainBioParent">
                  <Row className="show-grid">
                    <Col xs={12} sm={4} lg={4} className="mainBioImageContainer" lgOffset={1}>
                      <div className="borderBoxContainer positionRelative">
                        <CelebrityPicture {...celebrityObject.imageComponent}/>
                        <CelebrityBasicBio {...celebrityObject.basicBioComponent}/>
                      </div>
                    </Col>
                    <Col xs={12} sm={8} lg={6} className="mainProfileContainer">
                      {
                        !!celebrityObject.movieCast && celebrityObject.movieCast.length > 0 &&
                        <div className="borderBoxContainer">
                          <h3 className="creditsHeading">
                            Movie Castings
                            <span>And Creatives</span>
                          </h3>
                          <Row className="show-grid">
                            {
                              <CreditItems castArray={celebrityObject.movieCast} forType="movies"/>
                            }
                          </Row>
                        </div>
                      }
                      {
                        !!celebrityObject.tvCast && celebrityObject.tvCast.length > 0 &&
                        <div className="borderBoxContainer">
                          <h3 className="creditsHeading">
                            TV Show Castings
                            <span>The Small Screen</span>
                          </h3>
                          <Row className="show-grid">
                            {
                              <CreditItems castArray={celebrityObject.tvCast}/>
                            }
                          </Row>
                        </div>
                      }
                    </Col>
                  </Row>
                </div>
                <Modal show={this.state.showBiographyModal} className="defaultStudioReactModal biographyModal">
                  <Modal.Header>
                    <Button className="closeThisModal" onClick={this.closeBiographyModal}>
                      <img src="./assets/icons/close-icon-white.svg" className="img-responsive center-block" alt="Close" title="Close"/>
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
                    <p>{celebrityObject.biography}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="defaultButton" onClick={this.closeBiographyModal.bind(this)}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={this.state.showMiniMovieModal} className="defaultStudioReactModal miniMovieModal">
                  <Modal.Header>
                    <Button className="closeThisModal" onClick={this.closeMiniMovieModal}>
                      <img src="./assets/icons/close-icon-white.svg" className="img-responsive center-block" alt="Close" title="Close"/>
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
                    <Row className="show-grid">
                      <Col xs={12} sm={5} className="movieImageContainer">
                        <img src="https://image.tmdb.org/t/p/w500/lgYKHifMMLT8OxYObMKa8b4STsr.jpg" className="img-responsive center-block" alt="Example" title="Example"/>
                      </Col>
                      <Col xs={12} sm={7} className="movieDetailsContainer">
                        <header>
                          <h3>Dream for an Insomniac</h3>
                        </header>
                        <ul className="list-unstyled genreTags">
                          <li>Adventure</li>
                          <li>Family</li>
                          <li>Family</li>
                          <li className="ratingBlock">
                            <img src="./assets/icons/rating-icon.svg" className="img-responsive" alt="Rating" title="Rating"/>
                            Rating: 7.5
                          </li>
                        </ul>
                        <p className="movieDescrption"><b>About The Movie</b> <br/>Bruce Nolan toils as a "human interest" television reporter in Buffalo, N.Y. Despite his high ratings and the love of his beautiful girlfriend, Grace, Bruce remains unfulfilled. At the end of the worst day in his life, he angrily ridicules God -- and the Almighty responds, endowing Bruce with all of His divine powers.</p>
                        <p><b>Jennifer Aniston</b> had played the role as <em>Grace Connelly</em> in this movie.</p>
                        <p className="movieRelease"><b>Date Of Release: </b> <br/><span>23rd May 2003</span></p>
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="defaultButton" onClick={this.closeMiniMoviModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </WrapperObject>
            }
          </WrapperObject>
        }
      </div>
    );
  };

  componentDidMount() {
    let locationQuery = this.props.location.search,
        searchObject = this.makeLocationQuerySplit(locationQuery);
    this.buildCelebrityPage(searchObject);
  };
  
  componentDidUpdate($oldProps, $oldState) {
    if(!!$oldState.isBuilding) {
      this.hideLoaderDiv();
    }
  };
}
export default withRouter(PersonBioPage);
