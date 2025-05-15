import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import p1 from '../assets/p1.jpg'
const MedicineAll = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('/api/medicine/getall', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data?.message);
        setMedicines(data?.message);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='doctorall'>
      <h1>All Medicines</h1>
      <Link to={"/addmedicine"}>
      <MDBBtn style={{ borderRadius: "20px" }}>Create Medicine</MDBBtn>
      </Link>
      <div style={{ padding: "30px", width: "100%",border:"0px solid black",flexWrap:"wrap",display:"flex",gap:"60px" }}>   
          {medicines.map((medicine) => (
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
        ))}
      </div>
    </div>
  );
};

export default MedicineAll;
