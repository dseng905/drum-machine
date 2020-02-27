import React from 'react';
import './App.css';


const defaultDrumPads = [
  {
    name: "Heater-1",
    key: "Q",
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    name: "Heater-2",
    key: "W",
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    name: "Heater-3",
    key: "E",
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    name: "Heater-4",
    key: "A",
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    name: "Clap",
    key: "S",
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    name: "Open-HH",
    key: "D",
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    name: "Kick n'-Hat",
    key: "Z",
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    name: "Kick",
    key: "X",
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    name: "Closed-HH",
    key: "C",
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];


const DrumPad = (props) => {
  const playAudio = () => {
    let audio = document.getElementById(props.children + '-audio');
    if(props.power) {
      audio.currentTime = 0;
      audio.volume = props.volume;
      audio.play();
    }
  }

  return (
    <div id={props.children} >
      <audio 
        id={props.children + "-audio"}
        preload="auto" 
        src={props.audio}
      />
      <button 
        value={props.value} 
        className="drum-pad" 
        onClick={() => 
          {playAudio(props.powerOn); 
          props.onClick(props.value);}
        }
      >
        {props.children}
      </button>
    </div>
  )
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      powerOn: true,
      display: "'",
      volume: 1,
      drumPads: props.pads
    }

    this.setDisplay = this.setDisplay.bind(this);
    this.setPower = this.setPower.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }

  setDisplay(name) {
    this.setState({
      display: name
    })
  }

  setPower() {
    this.setState((prevState) => ({
      powerOn: !prevState.powerOn
    }))
  }

  setVolume(e) {
    this.setState({
      volume: e.target.value
    })
  }

  render() {
    return (
      <div className="drum-machine">
        <h1 id="drum-machine-title">Drum Machine</h1>
        <p id="display">{this.state.display}</p>
        <p>Power</p>
        <label className="switch">
          <input 
            id="power" 
            type="checkbox"
            checked={this.state.powerOn}
            onChange={this.setPower}
          />
          <span className="slider"></span>
        </label>
        <div id="volume-slider-container">
          <p>Volume</p>
          <input 
            id="volume-slider" 
            type="range" 
            min="0" 
            max="1"
            step="0.1" 
            value={this.state.volume} 
            onChange={this.setVolume}
          />
        </div>
        <div className="drum-pad-grid">
          {
            this.state.drumPads.map((val) => (
              <DrumPad 
                power={this.state.powerOn}
                value={val.name}
                key={val.key} 
                audio={val.audioSrc}
                volume={this.state.volume} 
                onClick={this.setDisplay}
              >{val.key}</DrumPad>
            ))
          }
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <DrumMachine pads={defaultDrumPads} />
    </div>
  );
}

export default App;
