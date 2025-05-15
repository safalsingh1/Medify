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

const DoctorAll = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors/alldoctor', {
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
        setDoctors(data?.message);
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
      <h1>All Doctors</h1>
      <div style={{ padding: "30px" }}>
        {doctors.map((doctor) => (
          <div key={doctor._id}>
            <MDBCard style={{ width: "250px", height: "400px", borderRadius: "30px", border: "1px solid black", boxShadow: "2px 2px 2px" }}>
              <MDBCardImage src={doctor.coverImage} fluid alt='...' style={{ borderRadius: "20px" }} />
              <a>
                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
              </a>
              <MDBCardBody>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <MDBCardTitle><h2 style={{color:"black"}}>{doctor.doctorname}</h2></MDBCardTitle>
                  <img
                    className='rounded-8 shadow-4'
                    src={doctor.avatar}
                    alt='Avatar'
                    style={{ width: '50px', height: '50px', borderRadius: "100px" }}
                  />
                </div>
                <div style={{ background: "#f5f5f5", padding: "7px", width: "220px", borderLeft: "10px solid #05095e", marginLeft: "-10px" }}>
                  <h5>FullName: {doctor.fullName}</h5>
                  <h5>Depart.: {doctor.department}</h5>
                  <h6>Email: {doctor.email}</h6>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", alignItems: "center" }}>
                  <Link to={{ pathname: `/doctor/${doctor._id}`, state: { doctor } }}>
                    <MDBBtn style={{ borderRadius: "20px" }}>See More >></MDBBtn>
                  </Link>
                  <MDBCardText>
                    <span className="badge badge-info rounded-pill d-inline">{doctor.role}</span>
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

export default DoctorAll;
