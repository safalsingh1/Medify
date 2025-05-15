import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  MDBInput
} from "mdb-react-ui-kit";
import "./Overview.css";
import "./singleDoctor.css";
import "./Rating.css"
import PatientDocApp from "./PatientDocApp";

const SingleDoctor = () => {
  const [centredModal, setCentredModal] = useState(false);
  const [modalappointmentid, setModalAppointmentId] = useState("");
  const [appointmentIdChange, setAppointmentIdChange] = useState("");
  const [centredModalrating, setCentredModalrating] = useState(false);

  const toggleOpenrating = () => {
    setCentredModalrating(!centredModalrating);
  };

  



  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setUpdatedContent(comment.content);
  };
  const handleUpdateClick = () => {
    // Perform the update logic here, such as making an API call to update the comment in the backend
    console.log("Updated Comment:", updatedContent);

    // After updating, clear the editing state
    updateComment();
    setEditingCommentId(null);
  };


const updateComment = async () => {
  try {
    const response = await fetch(`/api/comments/update/${editingCommentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content:`${updatedContent}` }),
    });
    if (!response.ok) {
      throw new Error("Failed to update comment");
    } else {
      console.log("Comment updated successfully");
    } 
    fetchComments()
  } catch (error) {
    console.error("Error updating comment:", error);
  } 
};

  const toggleOpen = (appointmentId) => {
    setModalAppointmentId(appointmentId);
    console.log("modal appointment id is", appointmentId);
    setCentredModal(true);
  };
  const closeModal = () => {
    setCentredModal(false);
  };

  const { id } = useParams();
  const location = useLocation();
  const [doctor, setDoctor] = useState(location.state?.doctor || null);
  const [loading, setLoading] = useState(!doctor);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [comments, setComments] = useState([]);

  const [formData, setFormData] = useState({
    diagnosis: "",
    diagnosisfee: "",
    medicines: [],
  });

  const [centredModal2, setCentredModal2] = useState(false);

  const toggleOpen2 = () => setCentredModal2(!centredModal2);
  const [formData2, setFormData2] = useState({
    doctorId: `${id}`,
    time: "",
    date: "",
    status: "Scheduled",
    reason: "",
  });
  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const [centredModal3, setCentredModal3] = useState(false);

  const toggleOpen3 = () => setCentredModal3(!centredModal3);
  const [formData3, setFormData3] = useState({
    fullName: "",
    email: "",
    department: "",
    doctorname: "",
    role: "",
  });
  const handleChange3 = (e) => {
    setFormData3({ ...formData3, [e.target.name]: e.target.value });
  };

  const [centredModalappoichange, setCentredModalAppoiChange] = useState(false);

  const toggleOpenappoinchange = (appointmentIdchangecd) => {
    console.log("hellochbcscb",appointmentIdchangecd)
    setCentredModalAppoiChange(!centredModalappoichange);
    setAppointmentIdChange(appointmentIdchangecd);
    console.log("modal appointment id is", appointmentIdchangecd);
  };

  const [formdatappoichange, setFormDataAppoichange] = useState({
    status: "",
    date: "",
    time: "",
    reason: "",
  });
  const handleChangeappoichange = (e) => {
    setFormDataAppoichange({
      ...formdatappoichange,
      [e.target.name]: e.target.value,
    });
  };
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createDiagnosis = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/diagnosis/create/${modalappointmentid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log("diagnosis creation", data);
      setFormData({ diagnosis: "", diagnosisfee: "", medicines: [] });
      setCentredModal(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageClick = () => {
    document.getElementById("fileInput").click(); // Trigger file input click
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      await updateUserCoverImage(file);
    }
  };

  const updateUserCoverImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", file);

      const response = await fetch("/api/doctors/cover-image", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const extractDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const updateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("helllcjkenco");
    try {
      const response = await fetch(`/api/doctors/update-account`, {
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
      setFormData3({
        fullName: "",
        email: "",
        department: "",
        doctorname: "",
        role: "",
      });
      setCentredModal3(false);
      fetchDoctor();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("helllo");
    try {
      const response = await fetch(`/api/appointment/createby/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData2),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log("appointment creation", data);
      setFormData2({ time: "", date: "", reason: "" });
      setCentredModal2(false);
      fetchAppointments();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`/api/doctors/getbyid/${id}`, {
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
      // console.log("single doctor", data);
      setDoctor(data?.message);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const formData = { doctorId: id };
      const formbody = JSON.stringify(formData);
      console.log(formbody);
      const response = await fetch(
        `/api/appointment/inbody/seenbypatient/doctor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: formbody,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      const responseData = await response.json();
      // console.log(responseData.message);
      setAppointments(responseData.message);
      setLoading(false)
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchComments = async () => {
    try {
      const formData = { doctorId: id };
      const formbody = JSON.stringify(formData);
      console.log(formbody);
      const response = await fetch(`/api/comments/getall/doctor/seebypatient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: formbody,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      const responseData = await response.json();
      // console.log(responseData.message);
      setComments(responseData.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const [rating, setRating] = useState(0);

  const handleStarClick =  (value) => {
    setRating(value);
    console.log('Selected rating:', rating);
  };

  const [formdataRating,setformDatarating]=useState({
    type_id:id,
    rating_value:rating,
    rating_type:"Doctor"
  })
  const createRating = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/ratings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdataRating),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setformDatarating({
        type_id: id,
        rating_value: 0,
        rating_type: "Doctor"
      });
      console.log(data)
      alert(`Rating given as ${rating}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

 

  const updateAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("eee",appointmentIdChange);
    console.log("body",formdatappoichange)
    try {
      const response = await fetch(`/api/appointment/update/${appointmentIdChange}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdatappoichange),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("appointment updation", data);
      setFormDataAppoichange({ status: "",
      date: "",
      time: "",
      reason: "" });
      setCentredModalAppoiChange(false);
      fetchAppointments();
    } catch (error) {
      setError(error);
    } finally {
    }}


    const [formdatacomment, setFormDataComment] = useState({
     content:"",
     doctorId:`${id}`
    });

    const handleChangecomment = (e) => {
      setFormDataComment({ ...formdatacomment, [e.target.name]: e.target.value });
    };
    const createComment = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      console.log("body",formdatacomment)
      try {
        const response = await fetch(`/api/comments/patient`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formdatacomment),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("comment creation", data);
        // setFormData3({  });
        // setCentredModal3(false);
        alert("comment added")
        fetchComments();  
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    if (!doctor) {
      fetchDoctor();
      fetchAppointments();
      fetchComments();
    }
  }, [id, doctor]);


  useEffect(() => {
    setformDatarating(prevState => ({
      ...prevState,
      rating_value: rating
    }));
  }, [rating]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="doctorall">
      <MDBCard
        className="w-76  "
        style={{
          marginLeft: "30px",
          marginRight: "60px",
          border: "0px solid black",
          boxShadow: "4px 4px 9px 5px ",
          marginTop: "20px",
          backgroundColor:"#2978A0"
          
        }}
      >
        <MDBCardBody>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* onClick={handleImageClick}niche lagega */}
            <div style={{ width: "15%" }} className="image-container">
              <MDBCardImage
                src={doctor.coverImage}
                fluid
                alt="..."
                style={{
                  borderRadius: "100px",
                  width: "180px",
                  height: "180px",
                }}
                className=""
              />
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div
              style={{ backgroundColor: "", width: "35%", marginLeft: "70px" }}
            >
              <MDBCardTitle>
                {" "}
                <h2>FullName:{doctor.fullName}</h2>
              </MDBCardTitle>
              <MDBCardTitle>
                <h4>DoctorName: {doctor.doctorname}</h4>
              </MDBCardTitle>
              <MDBCardText>
                <h4>Email: {doctor.email}</h4>
              </MDBCardText>
              <MDBCardText>
                <h4>Department: {doctor.department}</h4>
              </MDBCardText>
            </div>

            <div style={{ backgroundColor: "", width: "30%" }}>
              <div style={{ marginTop: "15px" }}>
                {" "}
                <img
                  className="rounded-10 shadow-4"
                  src={doctor.avatar}
                  alt="Avatar"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "150px",
                  }}
                />
                <span
                  className="badge badge-info rounded-pill d-inline"
                  style={{
                    fontSize: "1.5em",
                    padding: "15px 15px",
                    marginLeft: "20px",
                  }}
                >
                  {doctor.role}
                </span>
              </div>

              <MDBCardText>
                <h4>LeavesLeft:{doctor.totalLeaveinaYear}</h4>
              </MDBCardText>

              <MDBCardText>
                <h4>Average Rating:</h4>
              </MDBCardText>
            </div>

            <div
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <MDBBtn
                href="#"
                style={{
                  backgroundColor: "#47A8BD",
                  borderRadius: "20px",
                  border: "2px solid white",
                }}
                onClick={toggleOpen2}
              >
                Set Appointment
              </MDBBtn>
              <MDBBtn onClick={toggleOpenrating} style={{backgroundColor:"#47A8BD"}}>Rate the doctor</MDBBtn>
              <MDBBtn
                href="#"
                style={{
                  backgroundColor: "#47A8BD",
                  borderRadius: "20px",
                  border: "2px solid white",
                }}
                onClick={toggleOpen3}
              >
                Change Info
              </MDBBtn>
            </div>
          </div>

          {/* <MDBBtn href='#'>Button</MDBBtn>
         
         
          
          <MDBCardText><h2>Average RATING:</h2></MDBCardText> */}

          <div></div>
        </MDBCardBody>
      </MDBCard>

      <h1
        style={{
          fontFamily: "Lato",
          margin: "30px 0px 0px 50px",
          textDecoration: "underline",
        }}
      >
        Appointments:
      </h1>

      {/* Render other details as needed */}
      <div
        className="container"
        style={{
          display: "flex",
          gap: "4%",
          flexDirection: "row !important",
          marginLeft: "55px",
          marginTop: "20px",
        
          width: "100%",
          overflowX: "scroll",
          overflowY: "hidden",
          borderRadius: "10px",
          padding: "40px",
          backgroundColor:"#2978A0"
        }}
      >
        {appointments.map((appointment) => (<>
          <div
            key={appointment._id}
            style={{
              width: "30%",
              boxShadow: "3px 3px 7px grey",
              border: " 1px solid lightblue",
              borderRadius: "10px",
              minWidth: "350px",
           
            }}
          >
            <MDBCard style={{ borderRadius: "12px", height: "100%" }}>
              <MDBCardBody>
                <PatientDocApp patientId={appointment?.patient} value={true} />
                <div style={{ width: "100%", marginLeft: "10px" }}>
                  <MDBCardTitle>
                    <h4 style={{ color: "black" }}>
                      Reason:{appointment?.reason}
                    </h4>
                  </MDBCardTitle>
                  <MDBCardText>
                    <h6 style={{ color: "black" }}>Time:{appointment?.time}</h6>
                  </MDBCardText>
                  <MDBCardText>
                    <h6 style={{ color: "black" }}>
                      AppointmentDate:{extractDate(appointment?.date)}
                    </h6>
                  </MDBCardText>
                  <MDBCardText>
                    <h6 style={{ color: "black" }}>
                      Created At:{extractDate(appointment?.createdAt)}
                    </h6>
                  </MDBCardText>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4 style={{ color: "black" }}>Status:</h4>
                    <MDBBtn
                      style={{
                        backgroundColor: "lightblue",
                        border: "2px solid white",
                        borderRadius: "30px",
                      }}
                    >
                      {appointment?.status}
                    </MDBBtn>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",marginTop:"20px"}}>

               
                <MDBBtn
                  onClick={() => toggleOpen(appointment._id)}
                  style={{ borderRadius: "40px",marginBottom:"10px",backgroundColor:"#785589" }}
                >
                  Create Diagnosis
                </MDBBtn>{" "}
                <MDBBtn
                 onClick={() => toggleOpenappoinchange(appointment._id)}
                  style={{ borderRadius: "40px",backgroundColor:"#AF1B3F" }}
                >
                  Update Diagnosis
                </MDBBtn>{" "}
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>


<div>
     
<MDBModal tabIndex='-1' open={centredModalappoichange} onClose={() => setCentredModalAppoiChange(false)}>
  <MDBModalDialog centered>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle>Update Appointment</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={() => setCentredModalAppoiChange(false)}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
      <form onSubmit={updateAppointment}>
                <div className="form-outline mb-4" style={{display:"flex",flexDirection:"column"}}>
                <label className="form-label" htmlFor="form2Example11">
                    Time
                  </label>
                  <input
                    type="time"
                    id="form2Example11"
                    className="form-control"
                    name="time"
                    onChange={handleChangeappoichange}

                    style={{border:"2px solid blue"}}
                  />
                 
                </div>
                
                <div className="form-outline mb-4"  style={{display:"flex",flexDirection:"column"}}>
                <label className="form-label" htmlFor="form2Example11">
                    Date
                  </label>
                  <input
                    type="date"
                    id="form2Example11"
                    className="form-control"
                    name="date"
                   
                    onChange={handleChangeappoichange}
                    style={{border:"2px solid blue"}}
                  />
                  
                </div>
                <div className="form-outline mb-4" style={{display:"flex",flexDirection:"column"}}>
                  <label className="form-label" htmlFor="form2Example22">
                    Reason
                  </label>
                  <input
                    type="text"
                    id="form2Example22"
                    className="form-control"
                    name="reason"
                    
                    onChange={handleChangeappoichange}
                    required
                    style={{border:"2px solid blue"}}
                  />
                 
                </div>


                <div className="form-outline mb-4" style={{display:"flex",flexDirection:"column"}}>
                <label for="status">Status:</label>

<select name="status" id="status">
  <option value="Scheduled">Scheduled</option>
  <option value="Completed">Completed</option>
  <option value="Cancelled">Cancelled</option>
</select>
                 
                </div>

                <div className="text-center pt-1 mb-5 pb-1">
                  <button
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 pb-3 pt-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Setting it..." : "Set Appointment"}
                  </button>
                </div>
              </form>
      </MDBModalBody>
      <MDBModalFooter>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>
      </div></>
        ))}
      </div>

      <h1
        style={{
          fontFamily: "Lato",
          margin: "30px 0px 0px 50px",
        }}
      >
        Comments:
        {/* {comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <MDBCard
              style={{
                borderRadius: "30px",
                width: "80%",
                height: "55px",
                marginTop: "10px",
                border: "1px solid black",
                boxShadow: "1px 1px 4px gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "",
              }}
            >
              <MDBCardBody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h3 style={{ color: "black" }}>{comment.content}</h3>
                
                <PatientDocApp patientId={comment.patient} value={false} />
              </MDBCardBody>
            </MDBCard>
          </div>
        ))} */}
{comments.map((comment) => (
        <div
          key={comment._id}
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent:"center"
          }}
        >
          <MDBCard
            style={{
              borderRadius: "0px",
              width: "95%",
              height: "auto",
              marginTop: "10px",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              padding:"0px !important"
            }}
          >
            <MDBCardBody
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent:"space-between",
                alignItems: "center",
                padding:"0px 7px 0px 7px"
              }}
            >
              {editingCommentId === comment._id ? (
                <input
                  type="text"
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  style={{ flex: 1, marginRight: "0px" }}
                />
              ) : (
                <h3 style={{ color: "black" }}>{comment.content}</h3>
              )}
              
              <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
              <p
                onClick={() =>
                  editingCommentId === comment._id
                    ? handleUpdateClick()
                    : handleEditClick(comment)
                }
                style={{ marginLeft: "10px",borderRadius:"20px", cursor:"pointer"}}
              >
             {editingCommentId === comment._id ? <i class="fas fa-edit" ></i> : <i class="fas fa-edit "></i>}
              </p>
              <PatientDocApp patientId={comment.patient} value={false} /></div>
            </MDBCardBody>
          </MDBCard>
        </div>
      ))}
        <div style={{marginTop:"20px"}}>
        <form onSubmit={createComment} style={{display:"flex",gap:"2%",justifyContent:"center",alignItems:"center"}}>
        <MDBInput label="comment" id="comment" name="content" type="text" onChange={handleChangecomment} style={{width:"65%"}} />
        <MDBBtn type='submit' block style={{width:"20%"}}>
           Comment on Doctor
      </MDBBtn>
    </form>
        </div>
      </h1>

      <MDBModal tabIndex="-1" open={centredModal} onClose={closeModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Diagnosis</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={createDiagnosis}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form2Example11"
                    className="form-control"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    placeholder="Diagnosis"
                    required
                  />
                  <label className="form-label" htmlFor="form2Example11">
                    Diagnosis
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="number"
                    id="form2Example22"
                    className="form-control"
                    name="diagnosisfee"
                    value={formData.diagnosisfee}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="form2Example22">
                    Diagnosis fee
                  </label>
                </div>
                <div className="text-center pt-1 mb-5 pb-1">
                  <button
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 pb-3 pt-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating in..." : "Create"}
                  </button>
                </div>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <div>
        <MDBModal
          tabIndex="-1"
          open={centredModal2}
          onClose={() => setCentredModal2(false)}
        >
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Set Appointment</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleOpen2}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form onSubmit={createAppointment}>
                  <div
                    className="form-outline mb-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label className="form-label" htmlFor="form2Example11">
                      Time
                    </label>
                    <input
                      type="time"
                      id="form2Example11"
                      className="form-control"
                      name="time"
                      onChange={handleChange2}
                      required
                      style={{ border: "2px solid blue" }}
                    />
                  </div>

                  <div
                    className="form-outline mb-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label className="form-label" htmlFor="form2Example11">
                      Date
                    </label>
                    <input
                      type="date"
                      id="form2Example11"
                      className="form-control"
                      name="date"
                      onChange={handleChange2}
                      required
                      style={{ border: "2px solid blue" }}
                    />
                  </div>
                  <div
                    className="form-outline mb-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label className="form-label" htmlFor="form2Example22">
                      Reason
                    </label>
                    <input
                      type="text"
                      id="form2Example22"
                      className="form-control"
                      name="reason"
                      value={formData2.reason}
                      onChange={handleChange2}
                      required
                      style={{ border: "2px solid blue" }}
                    />
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 pb-3 pt-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Setting it..." : "Set Appointment"}
                    </button>
                  </div>
                </form>
              </MDBModalBody>
              <MDBModalFooter></MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>

      <div>
        <MDBModal
          tabIndex="-1"
          open={centredModal3}
          onClose={() => setCentredModal3(false)}
        >
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Change Account Details</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleOpen3}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form onSubmit={updateAccount}>
                  <div
                    className="form-outline mb-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label className="form-label" htmlFor="emailInput">
                      Email
                    </label>
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

                  <div
                    className="form-outline mb-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label className="form-label" htmlFor="fullNameInput">
                      Full Name
                    </label>
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

                  <div
                    className="form-outline mb-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label className="form-label" htmlFor="departmentInput">
                      Department
                    </label>
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

                  <div
                    className="form-outline mb-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label className="form-label" htmlFor="doctorNameInput">
                      Doctor Name
                    </label>
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

                  <div
                    className="form-outline mb-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label className="form-label" htmlFor="carSelect">
                      Car
                    </label>
                    <select
                      name="role"
                      id="carSelect"
                      className="form-control"
                      onChange={handleChange3}
                      required
                      style={{ border: "2px solid blue" }}
                    >
                      <option value="doctor">doctor</option>
                      <option value="admin">admin</option>
                      <option value="compounder">compounder</option>
                      <option value="receptionist">receptionist</option>
                      <option value="nurse">nurse</option>
                    </select>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 pb-3 pt-3"
                      type="submit"
                      disabled={loading}
                    >
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

      

      <div>
     

<MDBModal tabIndex='-1' open={centredModalrating} onClose={() => setCentredModalrating(false)}>
  <MDBModalDialog centered>
    <MDBModalContent style={{width:"fit-content",height:"fit-content"}} >
     
    <MDBModalBody style={{ width: "400px", height: "100px", backgroundColor: "lightblue" }}>
      <div className="star-wrapper" style={{ display: "flex" }}>
        {[5, 4, 3, 2, 1].map((value) => (
          <a
            href="#"
            key={value}
            className={`fas fa-star ${value <= rating ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleStarClick(value);
            }}
          ></a>
        ))}
      </div>
      <div className="wrapper">
        <script
          type="text/javascript"
          src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
          data-name="bmc-button"
          data-slug="gitlabBilal"
          data-color="#FFDD00"
          data-emoji=""
          data-font="Cookie"
          data-text="Buy me a coffee"
          data-outline-color="#000000"
          data-font-color="#000000"
          data-coffee-color="#ffffff"
        ></script>
      </div>
     
    </MDBModalBody>
    <div style={{display:"flex",justifyContent:"space-between",padding:"0px 30px 0px 20px"}}>
            <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
            <h1>4</h1>
            <h1>5</h1>

      </div>
      <MDBModalFooter>
        <MDBBtn color='secondary' onClick={toggleOpenrating}>
          Close
        </MDBBtn>
        <MDBBtn onClick={createRating}>Save changes</MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>
      </div>


    </div>
  );
};

export default SingleDoctor;
