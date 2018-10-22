import React,{Component} from 'react'
import axios from 'axios';

export class Artworkdetail extends Component{
  constructor(props){
    super(props);
    this.state=({

      userVisitor:this.props.location.param1,
      artworkCreator:this.props.location.param2,
      arworkID:this.props.location.param3,
      artworkData:''

    })

    this.getArtwork()
  }

  getArtwork=()=>{
    axios.get(`http://localhost:3000/gallery/${this.state.arworkID}`)
    .then((res)=>{
      this.setState(this.state.artworkData=res.data);

    })
    .catch(e=>console.log(e))
  }

 render(){
   console.log(this.props)
   console.log(this.state);
   return(
      <div className="container artworkdetail-main" style={{
        backgroundColor:'AliceBlue',
        margin: '0 auto',
        maxWidth:800,
        height:400,
        color:'MidnightBlue',
        fontSize:30
      }}
      >
        <div className="row artworkdetail-header">
          <div className="col-md-2">{this.state.userVisitor}</div>
          <div className="col-md-6">{this.state.title}</div>
          <div className="col-md-2">{this.state.startBid}</div>
          <div className="col-md-2">{this.state.category}</div>
        </div>


        <div className="row">
          <div
            style={{
                float:'Left',
                overflow: 'auto',
                boxShadow: '6px 5px 5px black'
            }}
            className="col-md-4 artworkdetail-img"
          >
            <img alt="art" width="300px" src={this.state.pic_path}/>
          </div>
          <div className="col-md-8">

            <div
              style={{

                  margin:10,
                  border:'1px solid blue',
                  boxShadow: '2px 2px 2px 2px blue'
              }}
              className="artworkdetail-description"
            >
              {this.state.description}
            </div>
            <div className="artworkdetail-options">
              <button>First</button>
              <button>Second</button>
              <button>Tirch</button>
              this is an artwork from {this.state.artworkCreator}
            </div>
          </div>
        </div>
      </div>
   )
 }


}
