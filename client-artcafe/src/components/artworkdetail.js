import React,{Component} from 'react'
import axios from 'axios';
import Background from '../logos/fondo.jpg';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export class Artworkdetail extends Component{
  constructor(props){
    super(props);
    this.state=({
      userVisitor:this.props.location.param1,
      artworkCreator:this.props.location.param2,
      artworkID:this.props.location.param3,
      artworkData:'',
      selectedFile:null,
      result:'You can change image, edit data, or delete your artwork.',

    });
    this.getArtwork();

    this.fileInput = React.createRef(); //optative!!!

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleselectedFile=this.handleselectedFile.bind(this);
  }

  getArtwork=()=>{
    axios.get(`http://localhost:3000/gallery/${this.state.artworkID}`)
    .then((res)=>{
      this.setState({artworkData:res.data});

    })
    .catch(e=>console.log(e))
  }

  handleselectedFile = event => {
      let selectedFile = document.getElementById('pic_path').files[0];
      this.setState({
        selectedFile: selectedFile,
      })
    }

  handleSubmit = event =>{
    console.log(event)
    console.log(this.fileInput.current.files[0]);
    event.preventDefault();
    const data = new FormData()
    data.append('artworkImage', this.state.selectedFile)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    axios.post(`http://localhost:3000/gallery/upload/${this.state.artworkID}`
      ,data,config)
    .then((res)=>{
      console.log(res)
      this.setState({result:res.data})
    })
    .catch(
      e=>{console.log(e);
          this.setState({result:'Image load error'})
        },
    )
 }

 render(){
   let newToEdit={
     pathname: "/editartwork",
     param1: this.state.artworkID

   }

   let toDelete={
     pathname: "/delete",
     param1: this.state.artworkID

   }

   let artworkToBuy={
     pathname:"/buy",
     param1:this.state.artworkID,
     param2:this.state.artworkData,
     param3:this.state.userVisitor,
   }


   const {pic_path}=this.state.artworkData;

   let options;

   if (this.state.userVisitor===this.state.artworkCreator)
      options=
      <div>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <label htmlFor="pic_path">
            Upload a new photo for this artwork
          </label>
          <input
            style={{maxWidth: 500}}
            type="file"
            name="pic_path"
            id="pic_path"
            accept=".jpg, .jpeg, .png"
            ref={this.fileInput}
            onChange={this.handleselectedFile}
          />
          <input
            type="hidden" value="<%= artwork._id%>"
            name="_id" id="upload-photo"
            className="form-control"
          />

          <input
             type="submit"
             value="Submit"
             className="btn btn-primary"
          />
        </form>

        <div>
          <button
            type="button"
            className="btn btn-primary"
            style={{color:'black'}}
          >
            <Link
              to={newToEdit}
              style={{color:'black'}}
              >
              EDIT
            </Link>
          </button>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-primary"
            style={{color:'black'}}

          >
          <Link
            to={toDelete}
            style={{color:'black'}}
            >
            DELETE
          </Link>
          </button>
        </div>

        <div
          style={{
            fontSize: 14,
            color: 'blue',
          }}>
          Hi {this.state.artworkCreator}: {this.state.result}
        </div>

      </div>

   else options=
     <div>
       <b>This is a ganga {this.state.startBid}</b>
       <Link to={artworkToBuy} type="button"
       className="btn btn-secondary"
        style={{
          color:'black'
        }}
       > BUY IT!!!<
       /Link>
     </div>

   return(

    <div className="row">

            <div className="col-sm-12 artworkdetail-main"
              style={{
                backgroundImage:`url(${Background})`,
                color:'black',
                border: '2px solid hsla(155, 50%, 10%, 1)',
                margin: '0 auto',
                height:'fit-content',
                fontSize:24,
                maxWidth: '90%',
              }}
            >

              <div
                className="artworkdetail-header"
                style={{
                  backgroundColor:'rgba(103, 33, 33, 0.2)',
                }}
              >
                <div className="row">
                  <div className="col-sm-2">{this.state.userVisitor}</div>
                  <div className="col-sm-6">{this.state.artworkData.title}</div>
                  <div className="col-sm-2">{this.state.artworkCreator}</div>
                  <div className="col-sm-2">{this.state.artworkData.category}</div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4">
                  <div className="artworkdetail-img"
                    style={{
                        boxShadow: '6px 5px 5px black',
                        border: '1px solid black',
                        width: 'inherit',
                        padding:0
                    }}>
                    <img
                      alt="art"
                      style={{width:'inherit',height:'auto'}}
                      src={pic_path}
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div
                    className="artworkdetail-description"
                    style={{
                        margin:10,
                        border:'1px solid blue',
                        boxShadow: '2px 2px 2px 2px blue'
                    }}
                  >
                    {this.state.artworkData.description}
                  </div>
                  <div
                    className="artworkdetail-options"
                  >
                    {options}
                  </div>
                </div>
              </div>
            </div>

    </div>


  )
 }


}
