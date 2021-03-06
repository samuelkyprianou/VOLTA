import React from "react";
import Particles from "react-particles-js";
import car from "../assets/paths.svg";
import title from "../assets/hometitle.png";
import about from "../assets/about.png";

const particles = {
  fps_limit: 28,
  particles: {
    number: {
      value: 700,
      density: {
        enable: false
      }
    },
    line_linked: {
      enable: true,
      color: "#52fefe",
      distance: 30,
      opacity: 0.4
    },
    move: {
      speed: 2
    },
    opacity: {
      anim: {
        enable: true,
        opacity_min: 0.5,
        speed: 2,
        sync: false
      },
      value: 0.4
    }
  },
  polygon: {
    enable: true,
    scale: 1.12,
    type: "inline",
    move: {
      radius: 30
    },
    url: car,
    inline: {
      arrangement: "equidistant"
    },
    draw: {
      enable: false,
      stroke: {
        color: "#52fefe"
      }
    }
  },
  retina_detect: false,
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      }
    },
    modes: {
      bubble: {
        size: 6,
        distance: 40
      }
    }
  }
};

const Home = () => {
  return (
    <div id="particles">
      <Particles className="particles" params={particles} />
      <img src={title} alt="hometitle" className="hometitle"></img>
      <img src={about} alt="about" className="about"></img>
      </div>
  );
};

export default Home;
