import React, { Component } from "react";
import { Row, Col, Button, Clearfix } from "react-bootstrap";
import "./all-listing.css";

import axios from "axios";
import apiSetupObject from "../../axios/axios-setup.js";

const WrapperObject = (props) => {
  return props.children;
};

const MovieListing = ({imageUrl, movieName, rating, releaseDate}) => {
  return (
    <Col xs={12} sm={4} lg={3} className="movieListing">
      <div className="borderBoxContainer">
        <div className="imageContainer positionRelative">
          <img src={imageUrl} className="img-responsive center-block" alt={movieName} title={movieName}/>
          <div className="nameContainer">
            <p>{movieName}</p>
          </div>
        </div>
      </div>
      <div className="footerContainer">
        <ul className="list-unstyled metaList row">
          <li className="releaseDate"><b>RELEASE DATE:</b> {releaseDate}</li>
          <li className="viewDetails">
            <img src="./assets/icons/expand-icon.svg" className="img-responsive center-block" alt="View Details" title="View Details"/>
          </li>
        </ul>
      </div>
    </Col>
  );
};
const TvOnAir = ({imageUrl, movieName, rating, releaseDate}) => {
  return (
    <Col xs={12} sm={4} lg={3} className="movieListing">
      <div className="borderBoxContainer">
        <div className="imageContainer positionRelative">
          <img src={imageUrl} className="img-responsive center-block" alt={movieName} title={movieName}/>
          <div className="nameContainer">
            <p>{movieName}</p>
          </div>
        </div>
      </div>
      <div className="footerContainer">
        <ul className="list-unstyled metaList row">
          <li className="releaseDate"><b>FIRST AIRED ON:</b> {releaseDate}</li>
          <li className="viewDetails">
            <img src="./assets/icons/expand-icon.svg" className="img-responsive center-block" alt="View Details" title="View Details"/>
          </li>
        </ul>
      </div>
    </Col>
  );
};
const PopularPeople = ({imageUrl, personName}) => {
  return (
    <Col xs={12} sm={4} lg={3} className="movieListing">
      <div className="borderBoxContainer">
        <div className="imageContainer positionRelative">
          <img src={imageUrl} className="img-responsive center-block" alt={personName} title={personName}/>
          <div className="nameContainer">
            <p>{personName}</p>
          </div>
        </div>
      </div>
      <div className="footerContainer">
        <ul className="list-unstyled metaList row">
          <li className="viewDetails">
            <img src="./assets/icons/expand-icon.svg" className="img-responsive center-block" alt="View Details" title="View Details"/>
          </li>
        </ul>
      </div>
    </Col>
  );
};

class AllListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesNowPlaying: null,
      tvShowsNowPlaying: null,
      popularPeople: null
    };

    this.initiatePageLoadApis = this.initiatePageLoadApis.bind(this);
    this.getMoviesNowPlaying = this.getMoviesNowPlaying.bind(this);
    this.getTvShowsOnAir = this.getTvShowsOnAir.bind(this);
    this.getPopularPeople = this.getPopularPeople.bind(this);
  };

  getMoviesNowPlaying() {
    let moviesApi = axios.get(apiSetupObject.baseUrl + "movie/now_playing", {
      params: {
        page: "1",
        api_key: apiSetupObject.apiKey
      }
    })
    .then((apiResponseObject) => {
      if(apiResponseObject.status === 200 || apiResponseObject.statusText === "OK") {
        return apiResponseObject.data.results;
      }
      else {
        return apiResponseObject
      }
    })
    .catch((errorResponse) => {
      console.error("Something Went Wrong - [API Request] - Movies Now Playing");
    });
    
    return moviesApi;
  };

  getTvShowsOnAir() {
    let tvShowsApi = axios.get(apiSetupObject.baseUrl + "tv/on_the_air", {
      params: {
        page: "1",
        api_key: apiSetupObject.apiKey
      }
    })
    .then((apiResponseObject) => {
      if(apiResponseObject.status === 200 || apiResponseObject.statusText === "OK") {
        return apiResponseObject.data.results;
      }
      else {
        return apiResponseObject
      }
    })
    .catch((errorResponse) => {
      console.error("Something Went Wrong - [API Request] - TV Shows On Air");
    });
    
    return tvShowsApi;
  };

  getPopularPeople() {
    let peopleApi = axios.get(apiSetupObject.baseUrl + "person/popular", {
      params: {
        page: "1",
        api_key: apiSetupObject.apiKey
      }
    })
    .then((apiResponseObject) => {
      if(apiResponseObject.status === 200 || apiResponseObject.statusText === "OK") {
        return apiResponseObject.data.results;
      }
      else {
        return apiResponseObject
      }
    })
    .catch((errorResponse) => {
      console.error("Something Went Wrong - [API Request] - Popular People");
    });
    
    return peopleApi;
  };

  initiatePageLoadApis() {
    axios.all([this.getMoviesNowPlaying(), this.getTvShowsOnAir(), this.getPopularPeople()])
      .then(axios.spread((moviesApiResponse, tvApiResponse, peopleApiResponse) => {
        let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            moviesTempArray = [],
            tvTempArray = [],
            peopleTempArray = [];

        moviesApiResponse.forEach(({poster_path, original_title, vote_average, release_date}, thisIndex) => {
          if(thisIndex <= 11) {
            let d = new Date(String(release_date)),
                movieRelease = d.getDate() + " " + monthArray[d.getMonth()] + " " + d.getFullYear();
            moviesTempArray.push({
              imageUrl: "https://image.tmdb.org/t/p/original" + poster_path,
              movieName: original_title,
              rating: vote_average,
              releaseDate: movieRelease
            });
          }
        });
        tvApiResponse.forEach(({poster_path, original_name, vote_average, first_air_date}, thisIndex) => {
          if(thisIndex <= 11) {
            let d = new Date(String(first_air_date)),
                movieRelease = d.getDate() + " " + monthArray[d.getMonth()] + " " + d.getFullYear();
            tvTempArray.push({
              imageUrl: "https://image.tmdb.org/t/p/original" + poster_path,
              movieName: original_name,
              rating: vote_average,
              releaseDate: movieRelease
            });
          }
        });
        peopleApiResponse.forEach(({profile_path, name}, thisIndex) => {
          if(thisIndex <= 11) {
            peopleTempArray.push({
              imageUrl: "https://image.tmdb.org/t/p/original" + profile_path,
              personName: name,
            });
          }
        });
        
        this.setState(($prevState, $nowProps) => {
          return {
            moviesNowPlaying: moviesTempArray,
            tvShowsNowPlaying: tvTempArray,
            popularPeople: peopleTempArray
          }
        });
      }));
  };

  render() {
    return (
      <div className="outerBorder allListing">
        <section className="listingContainerParent">
          <div className="blockHeading">
            <header>
              <h2>Movies<br/><span>Now Playing</span></h2>
            </header>
            <Button className="defaultButton">See More</Button>
          </div>
          <Row className="show-grid">
            {
              !!this.state.moviesNowPlaying &&
                this.state.moviesNowPlaying.map((thisMovieObject, thisIndex) => {
                  if((thisIndex + 1) % 4 === 0) {
                    return (
                      <WrapperObject key={thisMovieObject.movieName}>
                        <MovieListing {...thisMovieObject}/>
                        <Clearfix visibleLgBlock></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 3 === 0) {
                    return (
                      <WrapperObject key={thisMovieObject.movieName}>
                        <MovieListing {...thisMovieObject}/>
                        <Clearfix visibleSmBlock visibleMdBlock></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else {
                    return <MovieListing {...thisMovieObject} key={thisMovieObject.movieName}/>
                  }
                })
            }
          </Row>
        </section>
        <section className="listingContainerParent">
          <div className="blockHeading">
            <header>
              <h2>Tv Shows<br/><span>On The Air</span></h2>
            </header>
            <Button className="defaultButton">See More</Button>
          </div>
          <Row className="show-grid">
            {
              !!this.state.tvShowsNowPlaying &&
                this.state.tvShowsNowPlaying.map((thisTvObject, thisIndex) => {
                  if((thisIndex + 1) % 4 === 0) {
                    return (
                      <WrapperObject key={thisTvObject.movieName}>
                        <TvOnAir {...thisTvObject}/>
                        <Clearfix visibleLgBlock></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 3 === 0) {
                    return (
                      <WrapperObject key={thisTvObject.movieName}>
                        <TvOnAir {...thisTvObject}/>
                        <Clearfix visibleSmBlock visibleMdBlock></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else {
                    return <TvOnAir {...thisTvObject} key={thisTvObject.movieName}/>
                  }
                })
            }
          </Row>
        </section>
        <section className="listingContainerParent">
          <div className="blockHeading">
            <header>
              <h2>People<br/><span>Trending/Popular</span></h2>
            </header>
            <Button className="defaultButton">See More</Button>
          </div>
          <Row className="show-grid">
            {
              !!this.state.popularPeople &&
                this.state.popularPeople.map((thisPersonObject, thisIndex) => {
                  if((thisIndex + 1) % 4 === 0) {
                    return (
                      <WrapperObject key={thisPersonObject.personName}>
                        <PopularPeople {...thisPersonObject}/>
                        <Clearfix visibleLgBlock></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else if((thisIndex + 1) % 3 === 0) {
                    return (
                      <WrapperObject key={thisPersonObject.personName}>
                        <PopularPeople {...thisPersonObject}/>
                        <Clearfix visibleSmBlock visibleMdBlock></Clearfix>
                      </WrapperObject>
                    );
                  }
                  else {
                    return <PopularPeople {...thisPersonObject} key={thisPersonObject.personName}/>
                  }
                })
             }
          </Row>
        </section>
      </div>
    );
  };

  componentDidMount() {
    if(!this.state.moviesNowPlaying && !this.state.tvShowsNowPlaying) {
      this.initiatePageLoadApis();
    }
  };
}
export default AllListing;
