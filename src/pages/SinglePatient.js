import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "./singlePatient.css";
import "./singleDoctor.css";

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
} from "mdb-react-ui-kit";
import "./Overview.css";
import DoctorPatApp from "./DoctorPatApp";
import PatientDocApp from "./PatientDocApp";
import OnlyMedicineMain from "./OnlyMedicineMain";

function SinglePatient() {
  const { id } = useParams();
  const location = useLocation();
  const [patient, setPatient] = useState(location.state?.patient || null);
  const [loading, setLoading] = useState(!patient);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [diagnosises, setDiagnosis] = useState([]);
  const [diagnosisPatientName, setDiagnosisPatientName] = useState('');
  const [diagnosisEmail, setDiagnosisEmail] = useState('');
  const [diagnosisFullName, setDiagnosisFullName] = useState('');
  const [centredModal, setCentredModal] = useState(false);
  const [currentDiagnosisId, setCurrentDiagnosisId] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageClick = () => {
    document.getElementById('fileInput').click(); 
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      await updateUserCoverImage(file);
    }
  };

  
  const [centredModal3, setCentredModal3] = useState(false);

  const toggleOpen3 = () => setCentredModal3(!centredModal3);
  const [formData3, setFormData3] = useState({
       fullName:"",
       email:"",
       department:"",
       patientname:"",
  });
  const handleChange3 = (e) => {
    setFormData3({ ...formData3, [e.target.name]: e.target.value });
  };

  const updateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("helllcjkenco")
    try {
      const response = await fetch(`/api/patients/update-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData3),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log("appointment creation", data);
      setFormData3({ fullName:"",
      email:"",
      department:"",
      patientname:""});
      setCentredModal3(false);
      fetchPatient()
    
    }

    catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserCoverImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('coverImage', file);

      const response = await fetch('/api/patients/cover-image', {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert('Success:', data);
      fetchPatient();

    } catch (error) {
      console.error('Error:', error);
    }
  };
  const toggleOpen = (diagnosisId) => {
    setCentredModal(!centredModal);
    setCurrentDiagnosisId(diagnosisId);
  };

  const extractDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchDiagnosis = async () => {
    try {
      const response = await fetch(`/api/diagnosis/patient/${id}`, {
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
      console.log("hello", data?.message[0]?.diagnosis[0].appointment[0].patient);
      setDiagnosisFullName(data?.message[0]?.fullName);
      setDiagnosisEmail(data?.message[0]?.email);
      setDiagnosisPatientName(data?.message[0]?.patientName);
      setDiagnosis(data?.message[0]?.diagnosis);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatient = async () => {
    try {
      const response = await fetch(`/api/patients/getbyid/${id}`, {
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
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const formData = { patientId: id };
      const formbody = JSON.stringify(formData);
      console.log(formbody);
      const response = await fetch(
        `/api/appointment/getall/bystaff`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: formbody,
        }
      );
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      const responseData = await response.json();
      console.log("appointment", responseData.message);
      setAppointments(responseData.message);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!patient) {
      fetchDiagnosis();
      fetchPatient();
      fetchAppointments();
    }
  }, [id, patient, diagnosises]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='all' style={{ backgroundColor: "#F2F1EF" }}>
      <div style={{ display: "flex", gap: "3%" }}>
        <div style={{ border: "0px solid black", width: '60%' }}>
          <div style={{ padding: "30px", width: "104%" }}>
            <MDBCard style={{ boxShadow: "2px 2px 6px black", border: "2px solid black", width: "100%" }}>
              <MDBCardBody style={{ display: "flex", justifyContent: "space-between" }}>
  {/* onClick={handleImageClick}niche lagega */}
  <div>
      <div className="image-container" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        <img src={patient?.coverImage} alt="" style={{ borderRadius: '90px', width: '150px', height: '150px' }} />
      </div>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <MDBCardText><h4 style={{ color: "black" }}>Fullname: {patient?.fullName}</h4></MDBCardText>
                  <MDBCardText><h4 style={{ color: "black" }}>Email: {patient?.email}</h4></MDBCardText>
                  <MDBCardText><h4 style={{ color: "black" }}>Patientname: {patient?.patientname}</h4></MDBCardText>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <img className="rounded-10 shadow-4" src={patient?.avatar} alt="Avatar" style={{ width: "70px", height: "70px", borderRadius: "150px" }} />

                  <MDBBtn href='#' onClick={toggleOpen3}>Update Account</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>


          <div className="container" style={{ width: "100%", overflowX: "scroll", height: "450px", overflowY: "hidden", border: "2px solid black", borderRadius: "40px", padding: "30px", position: "relative", margin: "0px 20px 0px 20px", boxShadow: "2px 2px 5px blue", backgroundColor: "white" }}>
            <h1 style={{ fontFamily: "Lucida Handwriting", position: "sticky", top: "0", left: "0px", textDecoration: "underline" }}> Your Appointments</h1>
            <div style={{ display: "flex", gap: "5%", flexDirection: "row !important", marginLeft: "0px", marginTop: "20px" }}>
              {appointments.map((appointment) => (
                <div key={appointment._id} style={{ width: "43%", boxShadow: "3px 3px 5px lightblue", border: "3px solid lightblue", borderRadius: "30px", marginTop: "20px" }}>
                  <MDBCard style={{ borderRadius: "30px", width: "100%", height: "100%" }}>
                    <MDBCardBody>
                      <div style={{ width: "100%", marginLeft: "10px" }}>
                        <MDBCardTitle><h4 style={{ color: "black" }}>Reason:{appointment.reason}</h4></MDBCardTitle>
                        <MDBCardText><h6 style={{ color: "black" }}>Time:{appointment.time}</h6></MDBCardText>
                        <MDBCardText><h6 style={{ color: "black" }}>AppointmentDate:{extractDate(appointment.date)}</h6></MDBCardText>
                        <MDBCardText><h6 style={{ color: "black" }}>Created At:{extractDate(appointment.createdAt)}</h6></MDBCardText>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}><h4 style={{ color: "black" }}>Status:</h4>
                          <MDBBtn style={{ backgroundColor: "lightblue", border: "2px solid white", borderRadius: "30px" }}>{appointment.status}</MDBBtn>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container" style={{ border: "3px solid black", width: "33%", height: "99vh", overflowY: "scroll", marginTop: "20px", backgroundColor: "white", padding: "0px 25px 25px 30px", borderRadius: "20px", position: "relative", overflowX: "hidden", boxShadow: "2px 2px 4px black" }}>
          <h1 className="gradient-background-1" style={{ fontFamily: "Lucida Handwriting", position: "sticky", top: "0px", zIndex: "5", border: "2px solid white", color: "white", width: "125%", marginLeft: "-50px", textAlign: "center" }}> Medical History</h1>
          {diagnosises.map((diagnosis) => (
            <div key={diagnosis._id}>
              <MDBCard style={{ border: "2px solid black", marginTop: "10px", boxShadow: "2px 2px 5px blue" }}>
                <MDBCardBody>
                  <MDBCardTitle><h4 style={{ fontFamily: "sans-serif", color: "black", fontSize: "28px", fontWeight: "bold" }}>Diagnosis:{diagnosis?.diagnosis}</h4></MDBCardTitle>
                  <MDBCardText>
                    <h4 style={{ color: "black" }}>Diagnosis Fee:{diagnosis?.diagnosisfee}</h4>
                  </MDBCardText>
                  <div>
                    <h3>Appointment details of it:</h3>
                    <DoctorPatApp doctorId={diagnosis?.appointment[0]?.doctor} value={true} />
                    <PatientDocApp patientId={diagnosis?.appointment[0]?.patient} value={true} />
                  </div>
                  <div>
                    <h3>Medicines:</h3>
                    {diagnosis?.medicines.map((medicine, index) => (
                      <div key={index}>
                        <OnlyMedicineMain medicineId={medicine} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <Link to={`/selectmedicine/fordiagnosis/${diagnosis._id}/${id}`}><MDBBtn style={{ backgroundColor: "blue", border: "2px solid black", borderRadius: "30px" }}
                    >Change Medicine</MDBBtn></Link>
                    <MDBBtn style={{ backgroundColor: "blue", border: "2px solid black", borderRadius: "30px", marginLeft: "40px" }} onClick={() => toggleOpen(diagnosis._id)}>Pay Bill</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
              <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
                <MDBModalDialog centered>
                  <MDBModalContent style={{ backgroundColor: "lightblue", width: "190%", padding: "50px", position: "relative" }}>
                    <button onClick={toggleOpen} style={{ border: "1px solid white", borderRadius: "20px", position: "absolute", top: "-10px", left: "-10px", backgroundColor: "darkred", color: "white", zIndex: "39", padding: "0px 7px 0px 7px" }}><i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <MDBModalBody style={{ display: "flex", justifyContent: "space-between", }}>
                      <MDBBtn color='secondary' onClick={toggleOpen} style={{ backgroundColor: "blue", borderRadius: "30px", border: "3px solid white", marginLeft: "-30px" }}>
                        <h5 style={{ color: "white" }}>Wait for the med</h5>
                      </MDBBtn>
                      <Link to={`/paybill/${currentDiagnosisId}/${id}`}>
                        <MDBBtn color='secondary' onClick={toggleOpen} style={{ backgroundColor: "blue", borderRadius: "30px", border: "3px solid white" }}>
                          <h5 style={{ color: "white" }}>Pay Bill</h5>
                        </MDBBtn>
                      </Link>
                    </MDBModalBody>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </div>
          ))}
        </div>

      </div>


      <div>

      <div>
      <MDBModal tabIndex='-1' open={centredModal3} onClose={() => setCentredModal3(false)}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Change Account Details</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleOpen3}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <form onSubmit={updateAccount} >
              <div className="form-outline mb-4" style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label" htmlFor="emailInput">Email</label>
                <input
                  type="email"
                  id="emailInput"
                  className="form-control"
                  name="email"
                  onChange={handleChange3}
                  required
                  style={{ border: "2px solid blue" }}
                />
              </div>

              <div className="form-outline mb-4" style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label" htmlFor="fullNameInput">Full Name</label>
                <input
                  type="text"
                  id="fullNameInput"
                  className="form-control"
                  name="fullName"
                  onChange={handleChange3}
                  required
                  style={{ border: "2px solid blue" }}
                />
              </div>

              <div className="form-outline mb-4" style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label" htmlFor="departmentInput">Department</label>
                <input
                  type="text"
                  id="departmentInput"
                  className="form-control"
                  name="department"
                  onChange={handleChange3}
                  required
                  style={{ border: "2px solid blue" }}
                />
              </div>

              <div className="form-outline mb-4" style={{ display: "flex", flexDirection: "column" }}>
                <label className="form-label" htmlFor="doctorNameInput">Doctor Name</label>
                <input
                  type="text"
                  id="doctorNameInput"
                  className="form-control"
                  name="doctorName"
                  onChange={handleChange3}
                  required
                  style={{ border: "2px solid blue" }}
                />
              </div>

            

              <div className="text-center pt-1 mb-5 pb-1">
                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 pb-3 pt-3" type="submit" disabled={loading}>
                  {loading ? "Updating it..." : "Update Details"}
                </button>
              </div>
            </form>
          </MDBModalBody>
          <MDBModalFooter></MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
      </div>
      </div>
    </div>
  );
}

export default SinglePatient;
