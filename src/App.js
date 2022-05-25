import React, { Component } from 'react';
import Particles from 'react-tsparticles';
import Navigation from './component/Navigation/Navigation';
import Signin from './component/SignIn/Signin';
import Register from './component/Register/Register';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import './App.css';



const particlesOptions ={
	fpsLimit: 20,
	interactivity: {
		events: {
			onHover: {
			    enable: true,
			    mode: "repulse",
			},
			
		},
		modes: {
			bubble: {
			    distance: 400,
			    duration: 2,
			    opacity: 0.1,
			    size: 1,
			},
		},
	},

	particles: {
		color: {
			value: "#ffffff",
		},

		links: {
			color: "#ffffff",
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 1,
		},

		move: {
			direction: "none",
			enable: true,
			outMode: "bounce",
			random: false,
			speed: 1,
			straight: false,
		},
		
		number: {
			density: {
			    enable: true,
			    value_area: 900,
			},
			value: 170,
		},
	},
	detectRetina: true,
}

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
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
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}

	calculateFaceLocation = (data) => {
    const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0]
      .region_info.bounding_box;
      console.log(clarifaiFace)
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };


	displayFaceBox = (box) => {
		// console.log(box);
		this.setState({box: box});
	}
	
	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	
	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});

		const raw = JSON.stringify({
        "user_app_id": {
            "user_id": process.env.User_ID,
            "app_id": process.env.App_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        url: this.state.input
                    }
                }
            }
        ]
    });

    fetch(
			"https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key 2ff182288bb944d79514c2b07c05611c",
        },
        body: raw,
      }
    )

    .then((response) => response.text())
    .then((response) => {
      if (response){
        fetch('https://brainap-lop.herokuapp.com/image', 
        {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        });
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch((error) => console.log('error', error));
	}
		

	
	onRouteChange = (route) => {
		if (route === 'signout') {
		  this.setState(initialState)
		} else if (route === 'home') {
		  this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}
	
	render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
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
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
       </div>
    );
  }
}

	export default App;
