import React, { Component } from "react";
import { Col, Row, Clearfix } from "react-bootstrap";
import { withRouter } from "react-router";

//Required Imports For Axios
import axios from "axios";
import apiSetupObject from "../../axios/axios-setup.js";

//Required Import for Loader Component;
import LoaderComponent from "../loading-component/loader.js";

//Required WrapperObject Import
import WrapperObject from "../wrapper-component/wrapper-component.js";

//Required Imports from Common Component Files;
import {CurtainElement, BackdropComponent, CreditsComponent, SimilarSegment} from "../common-components/common-components.js"

//Required CSS File Import
import "./tv-bio.css";

const PosContainer = ({name, genres, overview, firstAirDate, createdBy}) => {
  let noImageIcon = "./assets/icons/no-image-icon.png";
  return (
    <div className="posContainer">
      <h1>{name}</h1>
      <ul className="list-unstyled genreList">
        {
          genres.map((thisGenre, thisIndex) => {
            return (
              <li key={thisGenre + thisIndex}>{thisGenre.name}</li>
            )
          })
        }
      </ul>
      <p className="aboutInfo">{overview}</p>
      <p className="firstReleaseInfo">First Released<br/><span>{firstAirDate}</span></p>
      {
        createdBy.length > 0 &&
        <WrapperObject>
          <h2 className="createdBy">Created By</h2>
          <ul className="list-unstyled createdByList">
            {
              createdBy.map((thisElement, thisIndex) => {
                const thisCreatorPath = thisElement.profile_path ? ("https://image.tmdb.org/t/p/original" + thisElement.profile_path) : noImageIcon;
                return (
                  <li key={thisElement.name.split(" ").join("-")}>
                    <img src={thisCreatorPath} 
                    className="img-responsive" 
                    alt={thisElement.name} title={thisElement.name}/>
                    {thisElement.name}
                  </li>
                );
              })
            }
          </ul>
        </WrapperObject>
      }
    </div>
  );
};

class ImageUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.imageRef = React.createRef();
    this.initiateProfilePic = this.initiateProfilePic.bind(this);
  };

  initiateProfilePic() {
    const imageElement = this.imageRef.current,
          errorImageUrl = "./assets/icons/no-image-icon.png";

    let tempImage = new Image();
    tempImage.setAttribute("src", this.props.posterPath);
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
          {name} = this.props;
    return (
      <div className="imageContainer">
        <img ref={this.imageRef} src={loaderImage} className="img-responsive center-block posterImage" alt={name} title={name}/>
      </div>
    );
  };

  componentDidMount() {
    this.initiateProfilePic();
  }
};

const RatingRadialComponent = ({voteAverage, numberOfSeasons, numberOfEpisodes}) => {
  const circumference = Math.PI * (60 * 2),
        rawPercentage = (voteAverage / 10) * 100,
        pVal = ((100 - rawPercentage)/100) * circumference,
        percentage = {
          strokeDashoffset: pVal
        };

  return (
    <WrapperObject>
      <div className="ratingRadialWrapper positionRelative">
        <svg id="ratingSvg" viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" width="160" height="160">
          <circle id="greyCircle" r="70" cx="80" cy="80" strokeDasharray="565.48" strokeDashoffset="0" fill="transparent"></circle>
          <circle style={percentage} id="fillCircle" r="60" cx="80" cy="80" strokeDasharray="565.48" strokeDashoffset="0" fill="transparent"></circle>
        </svg>
        <span className="ratingValue">{rawPercentage}%</span>
      </div>
      <p className="text-center ratingText">Average Rating</p>
      <div className="episodesSeasons">
        <Row className="show-grid">
          <Col xs={6} sm={5} smOffset={1} className="segment text-center">
            <div className="borderBoxContainer">
              <span className="count">{numberOfSeasons}</span>
              Seasons
            </div>
          </Col>
          <Col xs={6} sm={5} className="segment text-center">
            <div className="borderBoxContainer">
              <span className="count">{numberOfEpisodes}</span>
              Episodes
            </div>
          </Col>
        </Row>
      </div>
    </WrapperObject>
  );
};

class SeasonsSegment extends Component {
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
    const {name, episode_count, airDateValue} = this.props,
          loaderImage = "./assets/icons/loading-img.png";

    return (
      <Col xs={6} sm={4} lg={3} className="seasonSegment">
        <div className="borderBoxContainer">
          <div className="imageContainer positionRelative">
            <img src={loaderImage}
              className="img-responsive center-block" 
              alt={name} 
              title={name}
              ref={this.imageRef}
            />
            <p>{name}</p>
            <span className="episodeCount hidden-xs text-center">
              <span>{episode_count} Episodes</span>
            </span>
          </div>
          <div className="airDate">
            <p><span>Air Date: </span>{airDateValue}</p>
          </div>
        </div>
      </Col>
    );
  };
  
  componentDidMount() {
    this.loadProfileImage();
  };
};

const SeasonsListingComponent = ({seasonsListing}) => {
  const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <WrapperObject>
    {
      !!seasonsListing &&seasonsListing.length > 0 &&
      <div className="seasonsListingParent">
        <div className="outerContainer">
          <div className="blockHeading">
            <header>
              <h3>Seasons<br/><span>Full Listings</span></h3>
            </header>
          </div>
          <Row className="show-grid">
            {
              seasonsListing.map((thisSeason, thisIndex) => {
                const d = new Date(thisSeason.air_date),
                      airDateValue = d.getDate() + " " + monthArray[d.getMonth()] + " " + d.getFullYear();
                if((thisIndex + 1) === 2) {
                  return (
                    <WrapperObject key={thisSeason.name + thisIndex}>
                      <SeasonsSegment {...thisSeason} airDateValue={airDateValue}/>
                      <Clearfix visibleXsBlock></Clearfix>
                    </WrapperObject>
                  );
                }
                else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0 && (thisIndex + 1) % 4 === 0){
                  return (
                    <WrapperObject key={thisSeason.name + thisIndex}>
                      <SeasonsSegment {...thisSeason} airDateValue={airDateValue}/>
                      <Clearfix></Clearfix>
                    </WrapperObject>
                  );
                }
                else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 4 === 0) {
                  return (
                    <WrapperObject key={thisSeason.name + thisIndex}>
                      <SeasonsSegment {...thisSeason} airDateValue={airDateValue}/>
                      <Clearfix visibleXsBlock visibleLgBlock></Clearfix>
                    </WrapperObject>
                  )
                }
                else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0) {
                  return (
                    <WrapperObject key={thisSeason.name + thisIndex}>
                      <SeasonsSegment {...thisSeason} airDateValue={airDateValue}/>
                      <div className="clearfix hidden-lg"></div>
                    </WrapperObject>
                  )
                }
                else if((thisIndex + 1) % 4 === 0) {
                  return (
                  <WrapperObject key={thisSeason.name + thisIndex}>
                    <SeasonsSegment {...thisSeason} airDateValue={airDateValue}/>
                    <Clearfix visibleMdBlock visibleLgBlock></Clearfix>
                  </WrapperObject>
                  );
                }
                else if((thisIndex + 1) % 3 === 0) {
                  return (
                  <WrapperObject key={thisSeason.name + thisIndex}>
                    <SeasonsSegment {...thisSeason} airDateValue={airDateValue}/>
                    <Clearfix visibleSmBlock></Clearfix>
                  </WrapperObject>
                  );
                }
                else if((thisIndex + 1) % 2 === 0) {
                  return (
                  <WrapperObject key={thisSeason.name + thisIndex}>
                    <SeasonsSegment {...thisSeason} airDateValue={airDateValue}/>
                    <Clearfix visibleXsBlock></Clearfix>
                  </WrapperObject>
                  );
                }
                else {
                  return (
                    <SeasonsSegment {...thisSeason} airDateValue={airDateValue} key={thisSeason.name + thisIndex}/>
                  );
                }
              })
            }
          </Row>
        </div>
      </div>
    }
    </WrapperObject>
  );
};

const SimilarShowsComponent = ({similarListings}) => {
  return (
    <WrapperObject>
      {
        !!similarListings && similarListings.length > 0 &&
        <div className="similarListingParent">
          <div className="outerContainer">
            <div className="blockHeading">
              <header>
                <h3>Similar<br/><span>Tv Shows</span></h3>
              </header>
            </div>
            <Row className="show-grid">
              {
                similarListings.map((thisSimilarObject, thisIndex) => {
                  if((thisIndex + 1) === 2) {
                    return (
                      <WrapperObject key={thisSimilarObject.name + thisIndex}>
                        <SimilarSegment {...thisSimilarObject}/>
                        <Clearfix visibleXsBlock></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0 && (thisIndex + 1) % 4 === 0){
                    return (
                      <WrapperObject key={thisSimilarObject.name + thisIndex}>
                        <SimilarSegment {...thisSimilarObject}/>
                        <Clearfix></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 4 === 0) {
                    return (
                      <WrapperObject key={thisSimilarObject.name + thisIndex}>
                        <SimilarSegment {...thisSimilarObject}/>
                        <Clearfix visibleXsBlock visibleLgBlock></Clearfix>
                      </WrapperObject>
                    )
                  }
                  else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0) {
                    return (
                      <WrapperObject key={thisSimilarObject.name + thisIndex}>
                        <SimilarSegment {...thisSimilarObject}/>
                        <div className="clearfix hidden-lg"></div>
                      </WrapperObject>
                    )
                  }
                  else if((thisIndex + 1) % 4 === 0) {
                    return (
                    <WrapperObject key={thisSimilarObject.name + thisIndex}>
                      <SimilarSegment {...thisSimilarObject}/>
                      <Clearfix visibleMdBlock visibleLgBlock></Clearfix>
                    </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 3 === 0) {
                    return (
                    <WrapperObject key={thisSimilarObject.name + thisIndex}>
                      <SimilarSegment {...thisSimilarObject}/>
                      <Clearfix visibleSmBlock></Clearfix>
                    </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 2 === 0) {
                    return (
                    <WrapperObject key={thisSimilarObject.name + thisIndex}>
                      <SimilarSegment {...thisSimilarObject}/>
                      <Clearfix visibleXsBlock></Clearfix>
                    </WrapperObject>
                    );
                  }
                  else {
                    return (
                      <SimilarSegment {...thisSimilarObject} key={thisSimilarObject.name + thisIndex}/>
                    );
                  }
                })
              }
            </Row>
          </div>
        </div>
      }
    </WrapperObject>
  );
};

class TvBioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBuilding: true,
      languageCodes: null,
      searchResultsObject: {}
    };

    this.makeLocationQuerySplit = this.makeLocationQuerySplit.bind(this);
    this.buildTvBioPage = this.buildTvBioPage.bind(this);
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

  buildTvBioPage(searchObject) {
    let languageCodesResponse = null;

    axios.get("https://sricharankrishnan.github.io/iso-group-code-files/iso_639-1-language.json")
    .then((apiResponseObject) => {
      if(apiResponseObject.status === 200) {
        return apiResponseObject.data;
      }
      else {
        throw new Error("Something Went Wrong - API Call for Language Codes");
      }
    })
    .then((successResponse) => {
      languageCodesResponse = successResponse;
    })
    .catch((errorResponse) => {
      console.log(errorResponse);
    });

    axios.get(apiSetupObject.baseUrl + "tv/" + searchObject.qid, {
      params: {
        api_key: apiSetupObject.apiKey,
        append_to_response: "credits,similar"
      }
    })
    .then((apiResponseObject) => {
      if(apiResponseObject.status === 200 && apiResponseObject.statusText === "OK") {
        return apiResponseObject.data;
      }
      else {
        throw new Error("Something Went Wrong Somewhere");
      }
    })
    .then(({backdrop_path, poster_path, name, genres, languages, overview, first_air_date, created_by: createdBy,
            vote_average: voteAverage, number_of_episodes: numberOfEpisodes, number_of_seasons: numberOfSeasons, seasons: seasonsListing,
            credits, similar
    }) => {
      const posterPath = "https://image.tmdb.org/t/p/original" + poster_path,
            monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      let d = new Date(first_air_date),
          firstAirDate = d.getDate() + " " + monthArray[d.getMonth()] + " " + d.getFullYear();

      this.setState(($prevState, $nowProps) => {
        return {
          languageCodes: languageCodesResponse,
          searchResultsObject: {
            backdropPath: backdrop_path,
            imageContainer: {
              posterPath,
            },
            posContainer: {
              name,
              overview,
              genres,
              languages,
              firstAirDate,
              createdBy
            },
            ratingComponent: {
              voteAverage,
              numberOfSeasons,
              numberOfEpisodes
            },
            seasonsListingComponent: {
              seasonsListing
            },
            creditsListingComponent: {
              creditsInfo: credits.cast
            },
            similarListingComponent: {
              similarListings: similar.results
            }
          }
        }
      });
    })
    .catch((errorResponse) => {
      console.log(errorResponse);
    });
  };

  hideLoaderDiv() {
    this.setState(($prevState, $nowProps) => {
      return {
        isBuilding: false
      }
    });
  };

  render() {
    const { searchResultsObject, languageCodes } = this.state;
    let mainContainerClasses = ["outerBorder", "tvBioPage", "positionRelative", "preventBodyScroll"],
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
            searchResultsObject !== {} && !!languageCodes ?
            <WrapperObject>
              <div className="tvBioJumbotron positionRelative">
                <CurtainElement />
                <BackdropComponent bgSetup={searchResultsObject.backdropPath}/>
                <div className="contentBox positionRelative">
                  <Row className="show-grid">
                    <Col xs={12} sm={6} className="segment">
                      <ImageUnit {...searchResultsObject.imageContainer} name={searchResultsObject.posContainer.name}/>
                    </Col>
                    <Col xs={12} sm={6} className="segment">
                      <PosContainer 
                        lCodes={languageCodes}
                        {...searchResultsObject.posContainer}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="seasonsBoxContainer">
                <RatingRadialComponent {...searchResultsObject.ratingComponent}/>
                <SeasonsListingComponent {...searchResultsObject.seasonsListingComponent}/>
                <CreditsComponent {...searchResultsObject.creditsListingComponent}/>
                <SimilarShowsComponent {...searchResultsObject.similarListingComponent}/>
              </div>
            </WrapperObject>
            :
            null
          }
        </WrapperObject>
      }
      </div>
    );
  };

  componentDidMount() {
    let locationQuery = this.props.location.search,
        searchObject = this.makeLocationQuerySplit(locationQuery);
    this.buildTvBioPage(searchObject);
  };
  
  componentDidUpdate($oldProps, $oldState) {
    if(!!$oldState.isBuilding) {
      this.hideLoaderDiv();
    }
  };
};
export default withRouter(TvBioPage);
