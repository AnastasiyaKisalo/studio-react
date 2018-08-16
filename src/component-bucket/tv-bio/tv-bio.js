import React, { Component } from "react";
import { Col, Row, Clearfix } from "react-bootstrap";
import "./tv-bio.css";
import { withRouter } from "react-router";

//Required Imports For Axios
import axios from "axios";
import apiSetupObject from "../../axios/axios-setup.js";

const WrapperObject = (props) => {
  return props.children;
};

const CurtainElement = (props) => {
  return (
    <div className="curtain"></div>
  );
};

const BackgroundImageElement = ({bgSetup}) => {
  return (
    <div className="bgImageContainer" style={{backgroundImage: 'url(' + bgSetup + ')'}}></div>
  );
};

const PosContainer = ({name, genres, languages, lCodes, overview, firstAirDate, createdBy}) => {
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
      <ul className="list-unstyled languageList">
        {
          languages.map((thisLang, thisIndex) => {
            let codeObject = lCodes.find((thislCode, thisIndex) => {
              return thislCode.code === thisLang
            });
            return (
              <li key={thisLang + thisIndex}>{codeObject.name}</li>
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
                return (
                  <li key={thisElement.name.split(" ").join("-")}>
                    <img src={`https://image.tmdb.org/t/p/original` + thisElement.profile_path} 
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

const ImageUnit = ({posterPath, name}) => {
  return (
    <div className="imageContainer">
      <img src={posterPath} className="img-responsive center-block posterImage" alt={name} title={name}/>
    </div>
  );
};

const RatingRadialComponent = ({voteAverage, numberOfSeasons, numberOfEpisodes}) => {
  const circumference = Math.PI * (60 * 2),
        rawPercentage = (voteAverage / 10) * 100,
        pVal = ((100 - rawPercentage)/100) * circumference,
        percentage = {
          strokeDashoffset: pVal
        };

  console.log(circumference, rawPercentage, pVal);

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

const SeasonsSegment = ({poster_path, name, episode_count, airDateValue}) => {
  return (
    <Col xs={6} sm={4} md={3} className="seasonSegment">
      <div className="borderBoxContainer">
        <div className="imageContainer positionRelative">
          <img src={`https://image.tmdb.org/t/p/original` + poster_path}
            className="img-responsive center-block" 
            alt={name} 
            title={name}/>
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

const CreditsSegment = ({profile_path, name, character}) => {
  return (
    <Col xs={6} sm={4} md={3} className="creditsSegment">
      <div className="borderBoxContainer">
        <div className="imageContainer positionRelative">
          <img src={`https://image.tmdb.org/t/p/original` + profile_path} 
            className="img-responsive center-block" 
            alt={name}
            title={name}/>
        </div>
        <p className="actorName text-center">{name}</p>
        <p className="characterName text-center">{character}</p>
      </div>
    </Col>
  );
}

const CreditsComponent = ({creditsInfo}) => {
  return (
    <WrapperObject>
    {
      !!creditsInfo && creditsInfo.length > 0 &&
      <div className="creditsListingParent">
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
    }
    </WrapperObject>
  );
};

const SimilarSegment = ({poster_path, name}) => {
  return (
    <Col xs={6} sm={4} md={3} className="similarSegment">
      <div className="borderBoxContainer">
        <div className="imageContainer positionRelative">
          <img src={`https://image.tmdb.org/t/p/original` + poster_path}
          className="img-responsive center-block" 
          alt={name} title={name}/>
          <p>{name}</p>
        </div>
      </div>
    </Col>
  )
}

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
    const tvShowName = searchObject.qt.split("___").join(" "),
          tvShowId = searchObject.qid;
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
        const checkNameAgainst = apiResponseObject.data.name.toLowerCase(),
              checkIdAgainst = String(apiResponseObject.data.id);
        if(checkNameAgainst === tvShowName && checkIdAgainst === tvShowId) {
          return apiResponseObject.data;
        }
        else {
          throw new Error("Something Went Wrong Somewhere");
        }
      }
      else {
        throw new Error("Something Went Wrong Somewhere");
      }
    })
    .then(({backdrop_path, poster_path, name, genres, languages, overview, first_air_date, created_by: createdBy,
            vote_average: voteAverage, number_of_episodes: numberOfEpisodes, number_of_seasons: numberOfSeasons, seasons: seasonsListing,
            credits, similar
    }) => {
      const backdropPath = "https://image.tmdb.org/t/p/original" + backdrop_path,
            posterPath = "https://image.tmdb.org/t/p/original" + poster_path,
            monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      let d = new Date(first_air_date),
          firstAirDate = d.getDate() + " " + monthArray[d.getMonth()] + " " + d.getFullYear();

      this.setState(($prevState, $nowProps) => {
        return {
          languageCodes: languageCodesResponse,
          searchResultsObject: {
            backdropPath,
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

  render() {
    const { searchResultsObject, languageCodes } = this.state;
    console.log(searchResultsObject);
    return (
      <WrapperObject>
      {
        (searchResultsObject !== {} && languageCodes) ?
        <div className="outerBorder tvBioPage">
          <div className="tvBioJumbotron positionRelative">
            <CurtainElement />
            <BackgroundImageElement bgSetup={searchResultsObject.backdropPath}/>
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
        </div>
        :
        null
      }
      </WrapperObject>
    );
  };

  componentDidMount() {
    let locationQuery = this.props.location.search,
        searchObject = this.makeLocationQuerySplit(locationQuery);
    this.buildTvBioPage(searchObject);
  };
};
export default withRouter(TvBioPage);
