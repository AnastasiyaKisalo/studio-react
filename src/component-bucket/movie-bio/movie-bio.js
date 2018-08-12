import React, { Component } from "react";
import { Col, Row, Clearfix } from "react-bootstrap";
import "./movie-bio.css";

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
    <div className="movieBackdrop" style={{backgroundImage: 'url(' + bgSetup + ')'}}></div>
  );
};

const PosContainer = (props) => {
  return (
    <div className="posContainer positionRelative">
      <h1>The Matrix</h1>
      <ul className="list-unstyled genreList">
        <li>Action</li>
        <li>Science Fiction</li>
      </ul>
      <p>Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.</p>
    </div>
  );
};

const ProductionCompaniesList = (props) => {
  return (
    <section className="productionCompanies positionRelative">
      <div className="outerContainer">
        <div className="blockHeading">
          <header>
            <h2>Production Companies<br/><span>The Works</span></h2>
          </header>
        </div>
        <ul className="list-unstyled">
          <li>
            <div className="borderBoxContainer">
              Village Roadshow Pictures
            </div>
          </li>
          <li>
            <div className="borderBoxContainer">
              Warner Bros. Pictures
            </div>
          </li>
          <li>
            <div className="borderBoxContainer">
              Groucho II Film Partnership
            </div>
          </li>
          <li>
            <div className="borderBoxContainer">
              Silver Pictures
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

const ProductionCountries = (props) => {
  return (
    <section className="productionCountries positionRelative">
      <div className="outerContainer">
        <div className="blockHeading">
          <header>
            <h3>Production Countries<br/><span>The Where</span></h3>
          </header>
        </div>
        <ul className="list-unstyled">
          <li>
            <div className="borderBoxContainer">
              <img src="./assets/icons/location-icon.svg" className="img-responsive" alt="Example" title="Example"/>
              <span className="shortCode">au</span>
              <span className="countryName">Australia</span>
            </div>
          </li>
          <li>
            <div className="borderBoxContainer">
              <img src="./assets/icons/location-icon.svg" className="img-responsive" alt="Example" title="Example"/>
              <span className="shortCode">us</span>
              <span className="countryName">United States of America</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

const CreditsComponent = (props) => {
  return (
    <div className="creditsListingParent positionRelative">
      <div className="outerContainer">
        <div className="blockHeading">
          <header>
            <h3>Credits<br/><span>The People</span></h3>
          </header>
        </div>
        <Row className="show-grid">
          <Col xs={6} sm={4} md={3} className="creditsSegment">
            <div className="borderBoxContainer">
              <div className="imageContainer positionRelative">
                <img src="https://image.tmdb.org/t/p/original/bOlYWhVuOiU6azC4Bw6zlXZ5QTC.jpg" className="img-responsive center-block" alt="Example" title="Example"/>
              </div>
              <p className="actorName text-center">Keanu Reeves</p>
              <p className="characterName text-center">Thomas Anderson / Neo</p>
            </div>
          </Col>
          <Col xs={6} sm={4} md={3} className="creditsSegment">
            <div className="borderBoxContainer">
              <div className="imageContainer positionRelative">
                <img src="https://image.tmdb.org/t/p/original/8suOhUmPbfKqDQ17jQ1Gy0mI3P4.jpg" className="img-responsive center-block" alt="Example" title="Example"/>
              </div>
              <p className="actorName text-center">Laurence Fishburne</p>
              <p className="characterName text-center">Morpheus</p>
            </div>
          </Col>
          <Col xs={6} sm={4} md={3} className="creditsSegment">
            <div className="borderBoxContainer">
              <div className="imageContainer positionRelative">
                <img src="https://image.tmdb.org/t/p/original/6gk8GmlfjW8ONS19KMeISp8Cqxf.jpg" className="img-responsive center-block" alt="Example" title="Example"/>
              </div>
              <p className="actorName text-center">Carrie-Anne Moss</p>
              <p className="characterName text-center">Trinity</p>
            </div>
          </Col>
          <Col xs={6} sm={4} md={3} className="creditsSegment">
            <div className="borderBoxContainer">
              <div className="imageContainer positionRelative">
                <img src="https://image.tmdb.org/t/p/original/ysED1kp94bpnweNVaDoVQQ6iy8X.jpg" className="img-responsive center-block" alt="Example" title="Example"/>
              </div>
              <p className="actorName text-center">Hugo Weaving</p>
              <p className="characterName text-center">Agent Smith</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const ReleaseAndCertifications = (props) => {
  return (
    <div className="releaseAndCertificationsParent positionRelative">
      <div className="outerContainer">
        <div className="blockHeading">
          <header>
            <h3>Release Dates<br/><span>And Certifications</span></h3>
          </header>
        </div>
        <div className="countries">
          <div className="countryBlock">
            <div className="countryHeader">
              <header>
                <img src="./assets/icons/location-icon.svg" className="img-responsive" alt="Example" title="Example"/>
                <h4 className="text-center">US</h4>
                <p className="text-center">United States of America</p>
              </header>
            </div>
            <div className="countryBody">
              <ul className="list-unstyled">
                <li>
                  <div className="borderBoxContainer">
                    <p className="certification">R <span>Rating</span></p>
                    <p className="type">Theatrical Release</p>
                    <p className="date">30 Mar 1999</p>
                  </div>
                </li>
                <li>
                  <div className="borderBoxContainer">
                    <p className="certification">PG-12 <span>Rating</span></p>
                    <p className="type">Theatrical Release</p>
                    <p className="date">30 Mar 1999</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="countryBlock">
            <div className="countryHeader">
              <header>
                <img src="./assets/icons/location-icon.svg" className="img-responsive" alt="Example" title="Example"/>
                <h4 className="text-center">US</h4>
                <p className="text-center">United States of America</p>
              </header>
            </div>
            <div className="countryBody">
              <ul className="list-unstyled">
                <li>
                  <div className="borderBoxContainer">
                    <p className="certification">R <span>Rating</span></p>
                    <p className="type">Theatrical Release</p>
                    <p className="date">30 Mar 1999</p>
                  </div>
                </li>
                <li>
                  <div className="borderBoxContainer">
                    <p className="certification">PG-12 <span>Rating</span></p>
                    <p className="type">Theatrical Release</p>
                    <p className="date">30 Mar 1999</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

class MovieBioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      releaseTypes: ["Premiere", "Theatrical (Limited)", "Theatrical", "Digital", "Physical", "TV"]
    };
  };

  render() {
    let bgImage = "https://image.tmdb.org/t/p/original/7u3pxc0K1wx32IleAkLv78MKgrw.jpg";
    return (
      <div className="outerBorder movieBioPage">
        <div className="movieJumbotron positionRelative">
          <CurtainElement />
          <MovieBackdrop bgSetup={bgImage}/>
          <PosContainer />
        </div>
        <div className="productionParent positionRelative">
          <Row className="show-grid">
            <Col xs={12} sm={6} className="blocks">
              <ProductionCompaniesList />
            </Col>
            <Col xs={12} sm={6} className="blocks">
              <ProductionCountries />
            </Col>
          </Row>
        </div>
        <CreditsComponent />
        <ReleaseAndCertifications />
      </div>
    );
  };
}
export default MovieBioPage;
