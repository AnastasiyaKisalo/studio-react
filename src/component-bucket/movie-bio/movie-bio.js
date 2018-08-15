import React, { Component } from "react";
import { Col, Row, Clearfix } from "react-bootstrap";
import uuidv1 from "uuid/v1";
import "./movie-bio.css";

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

const MovieBackdrop = ({bgSetup}) => {
  return (
    <div className="movieBackdrop" style={{backgroundImage: 'url(https://image.tmdb.org/t/p/original' + bgSetup + ')'}}></div>
  );
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

const CreditsSegment = ({profile_path, name, character}) => {
  return (
    <Col xs={6} sm={4} md={3} className="creditsSegment">
      <div className="borderBoxContainer">
        <div className="imageContainer positionRelative">
          <img src={`https://image.tmdb.org/t/p/original` + profile_path} className="img-responsive center-block" alt="Example" title="Example"/>
        </div>
        <p className="actorName text-center">{name}</p>
        <p className="characterName text-center">{character}</p>
      </div>
    </Col>
  );
};

const CreditsComponent = ({creditsInfo}) => {
  return (
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
  );
};

const SimilarSegment = ({poster_path, title}) => {
  return (
    <Col xs={6} sm={4} md={3} className="creditsSegment">
      <div className="borderBoxContainer">
        <div className="imageContainer positionRelative">
          <img src={`https://image.tmdb.org/t/p/original` + poster_path} className="img-responsive center-block" alt={title} title={title}/>
          <p className="movieName text-center">{title}</p>
        </div>
      </div>
    </Col>
  )
}

const SimilarComponent = ({similarListings}) => {
  return (
    <WrapperObject>
      {
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
      }
    </WrapperObject>
  );
};

class MovieBioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResultsObject: {},
      languageCodes: null,
      countryCodes: null
    };

    this.makeLocationQuerySplit = this.makeLocationQuerySplit.bind(this);
    this.buildMovieBioPage = this.buildMovieBioPage.bind(this);
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
    const movieName = searchObject.qt.split("___").join(" "),
          movieId = searchObject.qid;
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
        const checkNameAgainst = apiResponseObject.data.title.toLowerCase(),
              checkIdAgainst = String(apiResponseObject.data.id);
        if(checkNameAgainst === movieName && checkIdAgainst === movieId) {
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

  render() {
    const { searchResultsObject, languageCodes, countryCodes } = this.state;
    return (
      <WrapperObject>
        {
          searchResultsObject !== {} && !!languageCodes && !!countryCodes ?
          <div className="outerBorder movieBioPage">
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
    this.buildMovieBioPage(searchObject);
  };
}
export default MovieBioPage;
