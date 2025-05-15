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

const PatientAll = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        //for this the login of patient is required
        const response = await fetch('/api/patients/allpatient', {
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
        setPatients(data?.message);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='doctorall'>
      <h1>All Patients</h1>
      <div style={{ padding: "30px" }}>
        {patients.map((patient) => (
          <div key={patient._id}>
            <MDBCard style={{ width: "250px", height: "fit-content", borderRadius: "30px", border: "1px solid black", boxShadow: "2px 2px 2px" }}>
              <MDBCardImage src={patient.coverImage} fluid alt='...' style={{ borderRadius: "20px" }} />
              <a>
                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
              </a>
              <MDBCardBody>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <MDBCardTitle><h2 style={{color:"black"}}>{patient.patientname}</h2></MDBCardTitle>
                  <img
                    className='rounded-8 shadow-4'
                    src={patient.avatar}
                    alt='Avatar'
                    style={{ width: '50px', height: '50px', borderRadius: "100px" }}
                  />
                </div>
                <div style={{ background: "#f5f5f5", padding: "7px", width: "220px", borderLeft: "10px solid #05095e", marginLeft: "-10px" }}>
                  <h5 styke>FullName: {patient.fullName}</h5>
                  {/* <h5>Depart.: {doctor.department}</h5> */}
                  <h6>Email: {patient.email}</h6>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", alignItems: "center" }}>
                  <Link to={{ pathname: `/patient/${patient._id}`, state: { patient } }}>
                    <MDBBtn style={{ borderRadius: "20px" }}>See More</MDBBtn>
                  </Link>
                  {/* <MDBCardText>
                    <span className="badge badge-info rounded-pill d-inline">{doctor.role}</span>
                  </MDBCardText> */}
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAll;
