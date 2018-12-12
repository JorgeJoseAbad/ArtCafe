import React,{Component} from 'react'
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Route, Link } from 'react-router-dom';

import {Artwork} from '../artwork';
import Background from '../../logos/fondo.jpg';
import logo from '../../logos/ArtCoffee-text.png';

const apiUrl = process.env.NODE_ENV === 'production' ?
process.env.REACT_APP_PROD_API_URL
:
process.env.REACT_APP_DEV_API_URL;


const CategoryItem = (props) => {


    let myArt=props.art;
    const newTo = {
        pathname: "/artworkbycategory",
        param1: myArt,
      };

    console.log("in CategoryItem:",myArt)
    return (
         <div className="col-md-4">
           <div className="artwork-slide"
             style={{
               padding:5,
               marginBottom:20,
               height:100,
               backgroundImage:`url(${Background})`,
               backgroundSize: 'cover',
               boxShadow: '6px 5px 5px black'
             }}
             key="key"
            >
              <div className="artwork-category"
                style={{
                  fontSize: 26
                }}>
               {myArt}
               </div>
               <div className="link-to-category">
                 Go to <Link to={newTo}>{myArt}</Link> artworks
               </div>
           </div>
         </div>
    );
}

export class Categorygallery extends Component {
  constructor(props){
    super(props);
    this.state=({
      arrayCategory:[],
      arrayGallery:[]
    })

    this.getGallery();
  }

   getGallery=()=>{
    axios.get(`${apiUrl}/gallery`)
    .then((res)=>{
      console.log(res.data);
      if (this.props.location.param1===this.props.user){
        const newRes=res.data.filter(
          (item,index)=>
          item._creator.username===this.props.location.param1
      )

        this.setState({arrayGallery:newRes})

      } else {

        const arrCat=res.data.map(
          (item)=>
           item.category
        );
        this.setState({arrayGallery:res.data})
        this.setState({arrayCategory:arrCat})
      }
    })
    .catch(e=>console.log(e))
  }

  render(){

      let toNewArtwork;
      let localCategories=[];
      if (this.props.id&&(this.props.id!==''))

        toNewArtwork=<button>
                        <Link style={{color:'black'}} to="/newartwork">
                          Load a new artwork!!
                        </Link>
                      </button>
      else
        toNewArtwork=<div>You are no logged and can't load artwork</div>

      const categoryList = this.state.arrayCategory.map((art,index)=>{

         if (localCategories.indexOf(art)===-1){
           console.log(art);
           localCategories.push(art);
           console.log(localCategories);
           return <CategoryItem art={art} key={index}/>

         } else return null;




        })



    return(
      <div>
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

        <div className="page">
          <div className="wellcome"
            style={{
              backgroundColor: 'grey',
              marginTop:10,
              marginBottom: 10,
              fontSize: 22,
              color:'white'
            }}>
            {(this.props.user&&this.props.user!=='')?
              <div style={{fontSize: 16,paddingBottom: 5}}>
                <b>Wellcome {this.props.user} there are all this artwork for you</b>
                <div>And you can load a new artwork {toNewArtwork}</div>
              </div>
              :
              <b>Wellcome visitor! there are all this artwork for you</b>
             }
          </div>
          <div className="container-fluid">
            <div className="row">

              {categoryList}

            </div>
          </div>

        </div>
      </div>
    )}

}
