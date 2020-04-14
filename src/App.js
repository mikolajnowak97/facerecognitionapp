import React, { Component } from 'react';
import Particles from 'react-particles-js';
import 'tachyons';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import Rank from './components/rank/rank';
import ImageLinkForm from './components/image_link_form/imageLinkForm';
import FaceRecognition from './components/face_recognition/faceRecognition';
import SignIn from './components/sign_in/signIn';
import Register from './components/register/register';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    }
  }
}

const initialState = {
  route: 'demo',
  input: '',
  imageUrl: '',
  box: [{}],
  foundedFaces: -1,
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      input: '',
      imageUrl: '',
      box: [{}],
      foundedFaces: -1,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input, box: [{}], foundedFaces: -1 });
    /*fetch('http://localhost:3000/imageUrl', {*/
    fetch('https://hidden-inlet-68145.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        /*fetch('http://localhost:3000/image', {*/
        fetch('https://hidden-inlet-68145.herokuapp.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(console.log);
        if (response.outputs[0].data.regions) {
          this.state.foundedFaces = response.outputs[0].data.regions.length
          for (var i = 0; i < response.outputs[0].data.regions.length; i++) {
            this.displayBoundingBox(this.calculateFaceLocation(response.outputs[0].data.regions[i]))
          }
        } else {
          this.state.foundedFaces = 0;
        }

      })
      .catch(err => console.log(err));
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayBoundingBox = (box) => {
    this.state.box.push(box)
  }

  render() {
    const { isSignedIn, imageUrl, route, box, foundedFaces } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {foundedFaces != -1
              ? (foundedFaces === 1
                ? <div className="pa2">Founded <font className="white" size="4"><bold>{this.state.foundedFaces}</bold></font> face</div>
                : (foundedFaces > 1
                  ? <div className="pa2">Founded <font className="white" size="4"><bold>{this.state.foundedFaces}</bold></font> faces</div>
                  : <div className="white pa2">No faces were found</div>))
              : (imageUrl != ''
                ? <div className="white pa2">Processing...</div>
                : <div></div>)}
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (route === 'demo' || route === 'signout'
            ? <div>
              <Logo />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              {foundedFaces != -1
                ? (foundedFaces === 1
                  ? <div className="pa2">Founded <font className="white" size="4">{this.state.foundedFaces}</font> face</div>
                  : (foundedFaces > 1
                    ? <div className="pa2">Founded <font className="white" size="4">{this.state.foundedFaces}</font> faces</div>
                    : <div className="white pa2">No faces were found</div>))
                : (imageUrl != ''
                  ? <div className="white pa2">Processing...</div>
                  : <div></div>)}
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : (route === 'signin' || route === 'signout'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            ))
        }
      </div >
    );
  }
}

export default App;