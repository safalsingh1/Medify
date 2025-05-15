import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCardSubTitle,
  MDBBadge,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import p1 from '../assets/p1.jpg'
function BillComp() {
  const { diagnosisId, patientId } = useParams();
  const [loading, setLoading] = useState(true);
  const[patient,setPatient]=useState(null)
  const [bill, setBill] = useState(null);
  const [sending, setSending] = useState(null);
  const [showloadorformordatacard, setShowloadorformordatacard] = useState(0);
  const [medicinearray, setMedicineArray] = useState([]);

  const [formData, setFormData] = useState({
    diagnosisID: `${diagnosisId}`,
    patientId: `${patientId}`,
    deadline: 0,
    address: ""
  });

  const extractDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
  const [totalsummedical, setTotalsummedical] = useState(0);
  const calculatethetotalmedicalsum = (arr) => {
    let sum = arr.reduce((acc,curr) => 
       acc + curr.price
    ,0);
    setTotalsummedical(sum);
    
  }
  const totalfee= totalsummedical + sending?.diagnosisfee;

  console.log(totalsummedical)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchPatient = async () => {
    try {
      const response = await fetch(`/api/patients/getbyid/${patientId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("single patient", data);
      setPatient(data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  const getBillBydiagnosisId = async () => {
    try {
      const response = await fetch(`/api/bill/getbydiagnosisid/${diagnosisId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("got the bill", data);

      setBill(data?.message?.bill[0]);

      setMedicineArray(data?.message?.sending?.medicinearray);
      setSending(data?.message?.sending);
      calculatethetotalmedicalsum(data?.message?.sending?.medicinearray);

      setShowloadorformordatacard(2);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const createBill = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData, "is the create called yes");
    try {
      const response = await fetch(`/api/bill/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("creating bill", data);
      setBill(data?.message);
      await getBillBydiagnosisId();
      setFormData({ diagnosisID: diagnosisId, patientId: patientId, deadline: 0, address: "ce" });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const checkifalreadyexist = async () => {
    try {
      const response = await fetch(`/api/bill/checkbyid/${diagnosisId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("check if already exist", data);
      if (data?.message) {
        await getBillBydiagnosisId();
      } else {
        setShowloadorformordatacard(1);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkifalreadyexist();
    fetchPatient();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='all'>
      <h1 style={{marginLeft:"40px"}}>Bill</h1>
      {showloadorformordatacard === 0 && (<div>Loading</div>)}
      {showloadorformordatacard === 1 && (
        <div>
          <h2 style={{ color: "black" }}>Create Bill</h2>
          <form onSubmit={createBill}>
            <div className="form-outline mb-4">
            <label  htmlFor="form2Example12">Address</label>
              <input 
                type="text" 
                id="form2Example12" 
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
               
                required 
                style={{border:"2px solid black",borderRadius:"10px"}}
              />
     
              <label for="form2Example11">Deadline</label>
              <input 
                type="number" 
                id="form2Example11" 
                className="form-control"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                placeholder="Deadline" 
                required 
                style={{border:"2px solid black",borderRadius:"10px"}}
              />
              
            </div>
            <div className="text-center pt-1 mb-5 pb-1">
              <button 
                className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 pb-3 pt-3" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
      {showloadorformordatacard === 2 && bill && (
        <div>
          {/* Render bill details */}
          {/* <p>Bill ID: {bill.id}</p> */}


          <div style={{border:"0px solid black",width:'93%'}}>
    <div style={{padding:"30px",width:"104%"}}>
<MDBCard style={{ boxShadow:"2px 2px 6px black",border:"2px solid black",width:"100%"}}>
      <MDBCardBody style={{display:"flex",justifyContent:"space-between"}}>
        <img src={patient?.coverImage} alt="" style={{ borderRadius: "100px",
         width: "150px",
        height: "150px",}}/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <MDBCardText><h4 style={{color:"black"}}>Fullname: {patient?.fullName}
            </h4></MDBCardText>
        <MDBCardText><h4 style={{color:"black"}}>Email: {patient?.email}</h4></MDBCardText>
        <MDBCardText><h4 style={{color:"black"}}>Patientname: {patient?.patientname}</h4></MDBCardText>
       
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <img
                  className="rounded-10 shadow-4"
                  src={patient?.avatar}
                  alt="Avatar"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "150px",
                  }}
                />
         <MDBBtn href='#'>Go somewhere</MDBBtn>
       
         </div>
      
      </MDBCardBody>
    </MDBCard></div>


    

</div>




<div style={{display:"flex",gap:"3%"}}>
<div style={{display:"flex",justifyContent:"center",width:"45%",alignItems:"center",border:"2px solid blue",boxShadow:"2px 2px 2px",overflowX:"scroll",overflowY:"hidden",borderRadius:"20px",padding:"20px",marginLeft:"30px"}}>

           <div>
           
          <h2 style={{color:"black"}}>TotalMedicalFee: {totalsummedical}</h2>
          {medicinearray.map((medicine) => (
          <div key={medicine._id} style={{border:"0px solid black",width:"fit-content"}}>
            <MDBCard style={{ width: "250px", height: "fit-content", borderRadius: "30px", border: "1px solid black", boxShadow: "2px 2px 2px" }}>
              <MDBCardImage src={p1} fluid alt='...' style={{ borderRadius: "20px" }} />
              <a>
                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
              </a>
              <MDBCardBody>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <MDBCardTitle><h4 style={{color:"black"}}>Name: {medicine.name}</h4></MDBCardTitle>
                 
                </div>
                <div style={{ background: "#f5f5f5", padding: "7px", width: "220px", borderLeft: "10px solid #05095e", marginLeft: "-10px" }}>
                  <h5>Manufacturer: {medicine.manufacturer}</h5>
                  <h5>Batch No.: {medicine.batchNumber}</h5>
                  <h6>QuantityLeft: {medicine.quantity}</h6>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", alignItems: "center" }}>
                  <Link to={{ pathname: `/medicines/${medicine._id}`, state: { medicine } }}>
                    <MDBBtn style={{ borderRadius: "20px" }}>See More </MDBBtn>
                  </Link>
                  <MDBCardText>
                    <span className="badge badge-info rounded-pill d-inline">Dose:{medicine.dosageperday} per day</span>
                  </MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))} </div> 
          </div>

       <div style={{display:"flex",justifyContent:"center",width:"45%",padding:"20px"}}>

    
          <div style={{height:"fit-content",width:"100%",border:"2px solid blue",boxShadow:"2px 2px 2px"}}>
          <MDBCard style={{height:"fit-content"}}>
      <MDBCardBody>
        <MDBCardTitle>Diagnosis(Bill)</MDBCardTitle>
        <MDBCardSubTitle>Bill Payment</MDBCardSubTitle>
        <MDBCardText>
           <h3 style={{color:"black"}}>Diagnosis Result:{sending?.diagnosis}</h3>
        </MDBCardText>
        <MDBCardText>
           <h3 style={{color:"black"}}>Diagnosis Fee:{sending?.diagnosisfee}</h3>
        </MDBCardText>
        <MDBCardText>
           <h3 style={{color:"black",textWrap:"wrap"}}>Address(to be sent): {bill.address}</h3>
        </MDBCardText>
        <MDBCardText>
           <h3 style={{color:"black"}}>Deadline :{bill.deadline}</h3>
        </MDBCardText>
        <MDBBadge color='success' pill style={{padding:"10px"}}>
            <h4>{bill?.paid ? "Paid" : "Unpaid"}</h4> 
            </MDBBadge>
      </MDBCardBody>
    </MDBCard>
          </div>
        
          </div>
         
          </div>

<div style={{display:"flex",justifyContent:"center",borderRadius:"2px 2px 2px blue",padding:"50px",gap:"10%"}}>
  <h1>Total Bill : {totalfee}</h1>
  <button type="button" class="btn btn-success" data-mdb-ripple-init style={{borderRadius:"20px",padding:"8px 24px 0px 24px"}}> <h3>Pay Bill</h3> </button>
</div>

         
        </div>
      )}
    </div>
  );
}

export default BillComp;
