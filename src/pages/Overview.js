import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCarousel, MDBCarouselItem
} from 'mdb-react-ui-kit';
import doctor from "../assets/main1.jpg"
import dcmain from "../assets/main2.jpg"
import p1 from "../assets/p2.jpg"
import './Overview.css'

const Overview = () => {
  return (<div className='home'>
<div style={{width:"100%",display:"flex",alginItems:"center",justifyContent:"center",height:"440px",zIndex:"4"}}>
<MDBCarousel showControls>
      <MDBCarouselItem itemId={1}>
        <img src={dcmain} className='d-block ' alt='...'  style={{width:"85vw",height:"440px"}} />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src={doctor} className='d-block ' alt='...' style={{width:"85vw",height:"440px"}} />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src={p1} className='d-block ' alt='...'  style={{width:"85vw",height:"440px"}} />
      </MDBCarouselItem>
    </MDBCarousel>
</div>
<div style={{marginTop:"10px"}}></div>
 <div style={{display:"flex",gap:"30px",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
    <MDBCard style={{ width: "22%", position: "relative",border:"1px solid black",height:"150px"  }} className="gradient-background-1">
    <div style={{ position: "absolute", top: "40px", right: "10px", opacity: 0.5,color:"darkblue" }}>
        <i className="fa-solid fa-user-group fa-6x" ></i>
        </div>
        <MDBCardBody style={{ position: "relative", zIndex: 0 }}>
               
            <h4 style={{ color: "white",top:"5px",position:"absolute",left:"7px" }}>Patients</h4>

            <h1 style={{ color: "white", fontSize: "70px",bottom:"20px",position:"absolute",left:"20px" }}>123</h1>
         
        </MDBCardBody>
      </MDBCard>

      <MDBCard style={{ width: "22%", position: "relative",border:"1px solid black",height:"150px"  }} className="gradient-background-2">
    <div style={{ position: "absolute", top: "40px", right: "10px", opacity: 0.5,color:"maroon" }}>
        <i className="fa-solid fa-bed fa-6x" ></i>
        </div>
        <MDBCardBody style={{ position: "relative", zIndex: 0 }}>
               
            <h4 style={{ color: "white",top:"5px",position:"absolute",left:"7px" }}>Rooms</h4>

            <h1 style={{ color: "white", fontSize: "70px",bottom:"20px",position:"absolute",left:"20px" }}>23</h1>
         
        </MDBCardBody>
      </MDBCard>

      <MDBCard style={{ width: "22%", position: "relative",border:"1px solid black",height:"150px"  }} className="gradient-background-3">
    <div style={{ position: "absolute", top: "40px", right: "10px", opacity: 0.5,color:"darkblue" }}>
        <i className="fa-solid fa-user-group fa-6x" ></i>
        </div>
        <MDBCardBody style={{ position: "relative", zIndex: 0 }}>
               
            <h4 style={{ color: "white",top:"5px",position:"absolute",left:"7px" }}>Medicines</h4>

            <h1 style={{ color: "white", fontSize: "70px",bottom:"20px",position:"absolute",left:"20px" }}>123</h1>
         
        </MDBCardBody>
      </MDBCard>

      <MDBCard style={{ width: "22%", position: "relative",border:"1px solid black",height:"150px"  }} className="gradient-background-4">
    <div style={{ position: "absolute", top: "40px", right: "10px", opacity: 0.5,color:"darkblue" }}>
    <i className="fa-solid fa-stethoscope fa-6x"></i>
            </div>
        <MDBCardBody style={{ position: "relative", zIndex: 0 }}>
               
            <h4 style={{ color: "white",top:"5px",position:"absolute",left:"7px" }}>Doctors</h4>

            <h1 style={{ color: "white", fontSize: "70px",bottom:"20px",position:"absolute",left:"20px" }}>123</h1>
         
        </MDBCardBody>
      </MDBCard>

   
    </div>
    
    </div>

  );
};

export default Overview