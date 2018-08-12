import React, { Component } from "react";
import "./home-page.css";

import FormComponent from "../main-form-component/main-form.js";

class HomeVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoClassValue: "videoParent hiddenTransform"
    };

    this.showVideoComponent = this.showVideoComponent.bind(this);
  };
  
  showVideoComponent() {
    this.setState(($prevState, $nowProps) => {
      return {
        videoClassValue: "videoParent"
      };
    });
  };


  render() {
    let { videoBuildObject } = this.props;
    return (
      <div className={this.state.videoClassValue}>
        <video className="hidden-xs" autoPlay="autoplay" loop muted playsInline>
          {
            videoBuildObject.map((thisElement, thisIndex) => {
              return <source src={thisElement.videoUrl} type={thisElement.videoType} key={thisElement.videoType}/>
            })
          }
        </video>
      </div>
    )
  };

  componentDidMount() {
    setTimeout(() => {
      this.showVideoComponent();
    }, 500);
  };
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadVideoElement: false
    };

    this.loadVideoComponent = this.loadVideoComponent.bind(this);
  };

  loadVideoComponent() {
    this.setState(($prevState, $nowProps) => {
      return {
        loadVideoElement: true
      }
    });
  };

  render() {
    let homeVideoObject = [
      {videoUrl: "./assets/videos/home-sample-video.webm", videoType: "video/webm"},
      {videoUrl: "./assets/videos/home-sample-video.mp4", videoType: "video/mp4"}
    ];
    let videoComponent = !this.state.loadVideoElement ? null : <HomeVideoComponent videoBuildObject={homeVideoObject}/>;

    return (
      <div className="outerBorder homePage">
        <div className="homeJumbotron positionRelative">
          <div className="bgContainer"></div>
          <div className="curtain"></div>
          {
            videoComponent
          }
          <div className="contentUnit positionRelative">
            <img src="./assets/icons/app-symbol.svg" className="img-responsive center-block mainAppIcon" alt="Studio React" title="Studio React"/>
            <h1 className="text-center">itudio<span>React</span></h1>
            {
              <FormComponent />
            }
          </div>
        </div>
      </div>
    );
  };

  componentDidMount() {
    /*Commented out video upload
    let viewportWidth = window.innerWidth;
    if(!this.state.loadVideoElement && viewportWidth > 767) {
      this.loadVideoComponent();
    }
    */
  };
}
export default HomePage;
