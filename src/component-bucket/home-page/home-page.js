import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import "./home-page.css";

//Required WrapperObject Import
import WrapperObject from "../wrapper-component/wrapper-component.js";

//Importing Form Component from main-form component file;
import FormComponent from "../main-form-component/main-form.js";

//Required Imports from common component file;
import {BuildSeoTags} from "../common-components/common-components.js";

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
      loadVideoElement: false,
    };

    this.seoTags = {
      titleTag: "Studio React | Movies, TV Shows and More",
      descriptionMeta: "The free browser application that gives you insights on Celebrities, Movies, Tv Shows and more...",
      keywordsMeta: "Studio React, studio react, celebrity app, movie app, tv show app, celebrity info, tv show info, movie info",
      cannonicalMeta: "/"
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
    let videoComponent = !this.state.loadVideoElement ? null : <HomeVideoComponent videoBuildObject={homeVideoObject}/>,
        borderClassArray = ["outerBorder", "homePage"];

    if(this.props.lockScrollStatus) {
      borderClassArray.push("preventBodyScroll");
    }

    return (
      <WrapperObject>
        <MetaTags>
          <BuildSeoTags {...this.seoTags}/>
        </MetaTags>
        <div className={borderClassArray.join(" ")}>
          <div className="homeJumbotron positionRelative">
            <div className="bgContainer"></div>
            <div className="curtain"></div>
            {
              videoComponent
            }
            <div className="contentUnit positionRelative">
              <img src="./assets/icons/app-symbol.svg" className="img-responsive center-block mainAppIcon" alt="Studio React" title="Studio React"/>
              <h1 className="text-center">Studio<span>React</span></h1>
              {
                <FormComponent />
              }
            </div>
          </div>
        </div>
      </WrapperObject>
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
