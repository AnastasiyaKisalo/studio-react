import React, { Component } from "react";
import { Col, Row, Clearfix } from "react-bootstrap";
import uuidv1 from "uuid/v1";
import "./movie-bio.css";
import { withRouter } from "react-router";

//Required Imports For Axios
import axios from "axios";
import apiSetupObject from "../../axios/axios-setup.js";

//Required Import for Loader Component;
import LoaderComponent from "../loading-component/loader.js";

const WrapperObject = (props) => {
  return props.children;
};

const CurtainElement = (props) => {
  return (
    <div className="curtain"></div>
  );
};

class MovieBackdrop extends Component {
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
      <div className="movieBackdrop" style={{backgroundImage: 'url(' + this.state.bgUrl + ')'}}></div>
    );
  };

  componentDidMount() {
    this.initiateBg();
  };
};

const PosContainer = ({genres, movieName, movieDescription}) => {
  return (
    <div className="posContainer positionRelative">
      <h1>{movieName}</h1>
      <ul className="list-unstyled genreList">
        {
          genres.map((thisGenreObject, thisIndex) => {
            return (
              <li key={thisIndex + thisGenreObject.name}>{thisGenreObject.name}</li>
            );
          })
        }
      </ul>
      <p>{movieDescription}</p>
    </div>
  );
};

const ProductionCompaniesList = ({productionCompanies}) => {
  return (
    <section className="productionCompanies positionRelative">
      <div className="outerContainer">
        <div className="blockHeading">
          <header>
            <h2>Production Companies<br/><span>The Works</span></h2>
          </header>
        </div>
        <ul className="list-unstyled">
          {
            productionCompanies.map((thisCompanyObject, thisIndex) => {
              return (
                <li key={thisIndex + thisCompanyObject.name}>
                  <div className="borderBoxContainer">
                    {thisCompanyObject.name}
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </section>
  );
};

const ProductionCountries = ({productionCountries}) => {
  return (
    <section className="productionCountries positionRelative">
      <div className="outerContainer">
        <div className="blockHeading">
          <header>
            <h3>Production Countries<br/><span>The Where</span></h3>
          </header>
        </div>
        <ul className="list-unstyled">
          {
            productionCountries.map((thisCountryObject, thisIndex) => {
              return (
                <li key={thisCountryObject.name + thisIndex}>
                  <div className="borderBoxContainer">
                    <img src="./assets/icons/location-icon.svg" className="img-responsive" alt={thisCountryObject.name} title={thisCountryObject.name}/>
                    <span className="shortCode">{thisCountryObject.iso_3166_1}</span>
                    <span className="countryName">{thisCountryObject.name}</span>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </section>
  );
};

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
            <img ref={this.imageRef} src={loaderImage} className="img-responsive center-block" alt={name} title={name}/>
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
};

const CreditsComponent = ({creditsInfo}) => {
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
                    <Clearfix visibleSmBlock visibleMdBlock></Clearfix>
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

const CountryBlock = ({iso_3166_1: isoCode, countryString, release_dates: infoArray}) => {
  const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        releaseTypes =  ["Premiere", "Theatrical (Limited)", "Theatrical", "Digital", "Physical", "TV"];
  return (
    <div className="countryBlock">
      <Row className="show-grid">
        <div className="countryHeader">
          <header>
            <img src="./assets/icons/location-icon.svg" className="img-responsive" alt={isoCode} title={isoCode}/>
            <h4 className="text-center">{isoCode}</h4>
            <p className="text-center">{countryString}</p>
          </header>
        </div>
        <div className="countryBody">
          <ul className="list-unstyled">
            {
              infoArray.map((thisInfo, thisIndex) => {
                const d = new Date(thisInfo.release_date),
                      releaseDateValue = d.getDate() + " " + monthArray[d.getMonth()] + " " + d.getFullYear(),
                      certification = !!thisInfo.certification ? thisInfo.certification : "-No Info-";
                return (
                  <li key={uuidv1()}>
                    <div className="borderBoxContainer">
                      <p className="certification">{certification} <span>Certification</span></p>
                      <p className="type">{releaseTypes[Number(thisInfo.type) - 1]}</p>
                      <p className="date">{releaseDateValue}</p>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </Row>
    </div>
  );
};

const ReleaseAndCertifications = ({releaseCertsObject, countryCodes}) => {
  return (
    <WrapperObject>
    {
      releaseCertsObject.length > 0 ?
      <div className="releaseAndCertificationsParent positionRelative">
        <div className="outerContainer">
          <div className="blockHeading">
            <header>
              <h3>Release Dates<br/><span>And Certifications</span></h3>
            </header>
          </div>
          <div className="countries">
            {
              releaseCertsObject.map((thisObject, thisIndex) => {
                thisObject.countryString = countryCodes[thisObject.iso_3166_1];
                return (<CountryBlock key={thisObject.countryString + thisObject.iso_3166_1 + thisIndex} {...thisObject}/>);
              })
            }
          </div>
        </div>
      </div>
      :
      null
    }
    </WrapperObject>
  );
};

class SimilarSegment extends Component {
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
    const {title} = this.props,
          loaderImage = "./assets/icons/loading-img.png";
    return (
      <Col xs={6} sm={4} md={3} className="creditsSegment">
        <div className="borderBoxContainer">
          <div className="imageContainer positionRelative">
            <img ref={this.imageRef} src={loaderImage} className="img-responsive center-block" alt={title} title={title}/>
            <p className="movieName text-center">{title}</p>
          </div>
        </div>
      </Col>
    );
  };

  componentDidMount() {
    this.loadProfileImage();
  };
}

const SimilarComponent = ({similarListings}) => {
  return (
    <WrapperObject>
      {
        similarListings.length > 0 ?
        <div className="similarMoviesParent positionRelative">
          <div className="outerContainer">
            <div className="blockHeading">
              <header>
                <h3>Similar<br/><span>Movies</span></h3>
              </header>
            </div>
            <Row className="show-grid">
              {
                similarListings.map((thisSimilarObject, thisIndex) => {
                  if((thisIndex + 1) === 2) {
                    return (
                      <WrapperObject key={thisSimilarObject.title + thisIndex}>
                        <SimilarSegment {...thisSimilarObject}/>
                        <Clearfix visibleXsBlock></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 2 === 0 && (thisIndex + 1) % 3 === 0 && (thisIndex + 1) % 4 === 0){
                    return (
                      <WrapperObject key={thisSimilarObject.title + thisIndex}>
                        <SimilarSegment {...thisSimilarObject}/>
                        <Clearfix></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 4 === 0) {
                    return (
                    <WrapperObject key={thisSimilarObject.title + thisIndex}>
                      <SimilarSegment {...thisSimilarObject}/>
                      <Clearfix visibleMdBlock visibleLgBlock></Clearfix>
                    </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 3 === 0) {
                    return (
                    <WrapperObject key={thisSimilarObject.title + thisIndex}>
                      <SimilarSegment {...thisSimilarObject}/>
                      <Clearfix visibleSmBlock></Clearfix>
                    </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 2 === 0) {
                    return (
                    <WrapperObject key={thisSimilarObject.title + thisIndex}>
                      <SimilarSegment {...thisSimilarObject}/>
                      <Clearfix visibleXsBlock></Clearfix>
                    </WrapperObject>
                    );
                  }
                  else {
                    return (
                      <SimilarSegment {...thisSimilarObject} key={thisSimilarObject.title + thisIndex}/>
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

class MovieBioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBuilding: true,
      searchResultsObject: {},
      languageCodes: null,
      countryCodes: null
    };

    this.makeLocationQuerySplit = this.makeLocationQuerySplit.bind(this);
    this.buildMovieBioPage = this.buildMovieBioPage.bind(this);
    this.hideLoaderDiv = this.hideLoaderDiv.bind(this);
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

  buildMovieBioPage(searchObject) {
    let languageCodesResponse = null,
        countryCodesResponse = null;
    
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
    
    axios.get("https://sricharankrishnan.github.io/iso-group-code-files/iso_3166-1.alpha2-codes.json")
    .then((apiResponseObject) => {
      if(apiResponseObject.status === 200) {
        return apiResponseObject.data;
      }
      else {
        throw new Error("Something Went Wrong - API Call for Language Codes");
      }
    })
    .then((successResponse) => {
      countryCodesResponse = successResponse;
    })
    .catch((errorResponse) => {
      console.log(errorResponse);
    });

    axios.get(apiSetupObject.baseUrl + "movie/" + searchObject.qid, {
      params: {
        api_key: apiSetupObject.apiKey,
        append_to_response: "credits,similar,release_dates"
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
    .then(({backdrop_path: backdropPath, genres, title: movieName, overview: movieDescription, production_companies: productionCompanies,
            production_countries: productionCountries, credits, similar, release_dates
    }) => {
      this.setState(($prevState, $nowProps) => {
        return {
          languageCodes: languageCodesResponse,
          countryCodes: countryCodesResponse,
          searchResultsObject: {
            backdropPath,
            posContainerComponent: {
              genres,
              movieName,
              movieDescription
            },
            productionCompaniesComponent: {
              productionCompanies
            },
            productionCountriesComponent: {
              productionCountries
            },
            creditsComponent: {
              creditsInfo: credits.cast
            },
            releaseAndCertComponent: {
              releaseCertsObject: release_dates.results
            },
            similarComponent: {
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
    const { searchResultsObject, languageCodes, countryCodes } = this.state;
    let mainContainerClasses = ["outerBorder", "movieBioPage", "positionRelative", "preventBodyScroll"],
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
              !!searchResultsObject && !!languageCodes && !!countryCodes &&
              <WrapperObject>
                <div className="movieJumbotron positionRelative">
                  <CurtainElement />
                  <MovieBackdrop bgSetup={searchResultsObject.backdropPath}/>
                  <PosContainer {...searchResultsObject.posContainerComponent}/>
                </div>
                <div className="productionParent positionRelative">
                  <Row className="show-grid">
                    <Col xs={12} sm={6} className="blocks">
                      <ProductionCompaniesList {...searchResultsObject.productionCompaniesComponent}/>
                    </Col>
                    <Col xs={12} sm={6} className="blocks">
                      <ProductionCountries {...searchResultsObject.productionCountriesComponent}/>
                    </Col>
                  </Row>
                </div>
                <CreditsComponent {...searchResultsObject.creditsComponent}/>
                <ReleaseAndCertifications {...searchResultsObject.releaseAndCertComponent} countryCodes={countryCodes}/>
                <SimilarComponent {...searchResultsObject.similarComponent}/>
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
    console.log(locationQuery);
    this.buildMovieBioPage(searchObject);
  };
  
  componentDidUpdate($oldProps, $oldState) {
    if(!!$oldState.isBuilding) {
      this.hideLoaderDiv();
    }
  };
}
export default withRouter(MovieBioPage);
