import React,{Component} from 'react'

// eslint-disable-next-line
import { BrowserRouter as Route, Link } from 'react-router-dom';


import Background from '../logos/fondo.jpg';
import logo from '../logos/ArtCoffee-text.png';

export class Cover extends Component {
  constructor(props){
    super(props);
    this.state=({
      userLoggedName:this.props.user,
      userLoggedId:this.props.id,

    })
  }


render(){
  let userArtwork={
    pathname:"/gallery",
    param1:this.state.userLoggedName,
    param2:this.state.userLoggedId,
  }


  return(
    <div className="cover">
      <header className="App-header"
        style={{
          backgroundImage:`url(${Background})`,
          color:'black',
          fontFamily: 'Georgia',
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}>
        <h1>Your coffee for artist and art lovers all around the world</h1>
        <img src={logo} style={{width: 300,height: 200}} className="App-logo" alt="ArtCoffee" />
        <h2>Artist thrive here</h2>
        <p>The place where you can buy the better artworks or
        auction your creations</p>
      </header>
      <div className="cover-text" style={{
        backgroundImage:`url(${Background})`,
        boxShadow: '10px 10px 10px 10px black',
        maxWidth: '90%',
        margin: '0 auto',
        marginBottom: 20
      }}>
        <div className="cover-text-main"
          style={{
            fontSize:26,
            backgroundColor: '#8da7f310',
            maxWidth: '100%',
            margin: '0 auto',
            padding: 20
          }}>
          <pre>Main options you have</pre>
          <ul id="main-options">
            <li>
              <b>List all artorks</b>

              <button type="button">
                <Link to="/gallery">Go to gallery</Link>
              </button>

            </li>
            <li>
              <b>Go to table of contents by category</b>

              <button type="button">
                <Link to="/categorygallery">
                  artworks by category
                </Link>
              </button>

            </li>
            <li>
              <b>Go to table of contents by author</b>

              <button type="button">
                <Link to="/authorgallery">
                  artworks by author
                </Link>
              </button>

            </li>
            {this.props.user!==''?
            <li>
              <b>List your artwork</b>

              <button type="button">
                <Link to={userArtwork}>See your artork</Link>
              </button>

            </li>
            :
            <li>
              <b>Made login</b>

              <button type="button">
                <Link to="/login">Login</Link>
              </button>

            </li>
            }

          </ul>
        </div>

        <div className="cover-text-intro"
          style={{
            fontWeight: '100',
            fontSize: 26,
            backgroundColor: '#69696922',
            maxWidth: '100%',
            margin: '0 auto'
          }}>
          <div style={{textAlign:'justify',
            color:'black',
            fontWeight: '400',
            padding: 20
          }}>
            This app, ArtCoffee, is made with Create-react-app: It use React,
            React-route, Bootstrap; in the front side. And Express-generator:
            Node.js, Express, Mongoose and MongoDB as BBDD, in the back side.
            You can made sign-in as user, made login, load an artwork,
            upload an image for it, modify the artwork, "buy" it, delete..
            But, it's just a demonstration, of the use of React with a BackEnd,
            and BBDD MongoDB.
          </div>

        </div>
      </div>
    </div>

  )
}

}
