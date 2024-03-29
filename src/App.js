import React, {Component}  from 'react';
import Particles from 'react-tsparticles';
// import Navigation from './component/Navigation/Navigation';
// import Signin from './component/SignIn/Signin';
// import Register from './component/Register/Register';
// import FaceRecognition from './component/FaceRecognition/FaceRecognition';
// import Logo from './component/Logo/Logo';
// import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
// import Rank from './component/Rank/Rank';
import './App.css';
import Preload from './components/Preloader/Preloader';
import Time from './components/Countdown/Time';



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
			    value_area: 700,
			},
			value: 170,
		},
	},
	detectRetina: true,
}


// import Option from './components/Option/Option';

class  App extends Component {
	render () {
		return (
		    <div className="App">
		    	<Particles className='particles'
		      	params={particlesOptions}/>
		    <div className="container">
		        <h1>
		            Website
		        <br />
		            Coming Soon
		        </h1>
		        <Time />
		         {/*{ <Option />}*/}
		        {<Preload />}
		        </div>
		    </div>
		);
	}
}

// const initialState = {
// 	input: '',
// 	imageUrl: '',
// 	box: {},
// 	route: 'home',
// 	isSignedIn: false,
// 		user: {
// 		    id: '',
// 		    name: '',
// 		    email: '',
// 		    entries: 0,
// 		    joined: ''
// 	    }
// }


// class App extends Component {
// 	constructor() {
// 	    super();
// 	    this.state = initialState;
// 	}
	

// 	loadUser = (data) => {
// 		this.setState({user: {
// 			id: data.id,
// 			name: data.name,
// 			email: data.email,
// 			entries: data.entries,
// 			joined: data.joined
// 		}})
// 	}

// 	calculateFaceLocation = (data) => {
//     const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0]
//       .region_info.bounding_box;
//       console.log(clarifaiFace)
//     const image = document.getElementById("inputimage");
//     const width = Number(image.width);
//     const height = Number(image.height);
//     return {
//       leftCol: clarifaiFace.left_col * width,
//       topRow: clarifaiFace.top_row * height,
//       rightCol: width - clarifaiFace.right_col * width,
//       bottomRow: height - clarifaiFace.bottom_row * height,
//     };
//   };


// 	displayFaceBox = (box) => {
// 		// console.log(box);
// 		this.setState({box: box});
// 	}
	
// 	onInputChange = (event) => {
// 		this.setState({input: event.target.value});
// 	}

// 	onButtonSubmit = () => {
// 		this.setState({imageUrl: this.state.input});
// 		  fetch('https://brain-app-api.onrender.com/imageurl', {
// 			method: 'post',
// 			headers: {'Content-Type': 'application/json'},
// 			body: JSON.stringify({
// 			  input: this.state.input
// 			})
// 		  })
// 		  .then(response => response.json())
// 		  .then(response => {
// 			if (response) {
// 			  fetch('https://brain-app-api.onrender.com/image', {
// 				method: 'put',
// 				headers: {'Content-Type': 'application/json'},
// 				body: JSON.stringify({
// 				  id: this.state.user.id
// 				})
// 			  })
// 				.then(response => response.json())
// 				.then(count => {
// 				  this.setState(Object.assign(this.state.user, { entries: count}))
// 				})
// 				.catch(console.log)
	
// 			}
// 			this.displayFaceBox(this.calculateFaceLocation(response))
// 		  })
// 		  .catch(err => console.log(err));
// 	  }

// 	// onButtonSubmit = () => {
// 	// 	this.setState({imageUrl: this.state.input});

// 	// 	const raw = JSON.stringify({
//     //     "user_app_id": {
//     //         "user_id": process.env.User_ID,
//     //         "app_id": "73dace1f4e42480d9ef6cfb5e4969603"
//     //     },
//     //     "inputs": [
//     //         {
//     //             "data": {
//     //                 "image": {
//     //                     url: this.state.input
//     //                 }
//     //             }
//     //         }
//     //     ]
//     // });

//     // fetch(
// 	// 		"https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",      {
//     //     method: "POST",
//     //     headers: {
//     //       Accept: "application/json",
//     //       Authorization: "Key 2ff182288bb944d79514c2b07c05611c",
//     //     },
//     //     body: raw,
//     //   }
//     // )

//     // .then((response) => response.text())
//     // .then((response) => {
//     //   if (response){
//     //     fetch('https://brainap-lop.herokuapp.com/image', 
//     //     {
//     //       method: 'put',
//     //       headers: {'Content-Type': 'application/json'},
//     //       body: JSON.stringify({
//     //         id: this.state.user.id
//     //       })
//     //     })
//     //     .then(response => response.json())
//     //     .then(count => {
//     //       this.setState(Object.assign(this.state.user, {entries: count}));
//     //     });
//     //   }
//     //   this.displayFaceBox(this.calculateFaceLocation(response));
//     // })
//     // .catch((error) => console.log('error', error));
// 	// }
		

	
// 	onRouteChange = (route) => {
// 		if (route === 'signout') {
// 		  this.setState(initialState)
// 		} else if (route === 'home') {
// 		  this.setState({isSignedIn: true})
// 		}
// 		this.setState({route: route});
// 	}
	
// 	render() {
//     const { isSignedIn, imageUrl, route, box } = this.state;
//     return (
//       <div className="App">
//          <Particles className='particles'
//           params={particlesOptions}
//         />
//         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
//         { route === 'home'
//           ? <div>
//               <Logo />
//               <Rank
//                 name={this.state.user.name}
//                 entries={this.state.user.entries}
//               />
//               <ImageLinkForm
//                 onInputChange={this.onInputChange}
//                 onButtonSubmit={this.onButtonSubmit}
//               />
//               <FaceRecognition box={box} imageUrl={imageUrl} />
//             </div>
//           : (
//              route === 'signin'
//              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
//              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
//             )
//         }
//        </div>
//     );
//   }
// }



export default App;
