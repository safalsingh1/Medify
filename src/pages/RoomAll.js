import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import "./HoverOpen.css";

const RoomCard = ({ room, handleButtonClick, openRoomId, handleFileChange, patientForBookedRoom, formData, handleChange, bookRoom, loading }) => {
  const { _id, roomImage, roomNumber, type, status, patientEmail } = room;

  return (
    <div key={_id} style={{ marginTop: "30px" }}>
      <div style={{ display: "flex", border: "0px solid black", width: "fit-content", minWidth: "300px" }}>
        <MDBCard
          style={{
            width: "250px",
            height: "440px",
            borderRadius: "30px",
            border: "1px solid black",
            boxShadow: "2px 2px 2px",
          }}
        >
          <div style={{ width: "100%" }} className="image-container" onClick={() => document.getElementById(`fileInput${_id}`).click()}>
            <MDBCardImage
              src={roomImage}
              fluid
              alt="..."
              style={{ borderRadius: "0px", height: "200px",width:"100%" }}
            />
            <input
              id={`fileInput${_id}`}
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, _id)}
            />
          </div>
          <MDBCardBody>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <MDBCardTitle>
                <h4 style={{ color: "black" }}>RoomNumber: {roomNumber}</h4>
              </MDBCardTitle>
            </div>
            <div
              style={{
                background: "#f5f5f5",
                padding: "7px",
                width: "220px",
                borderLeft: "10px solid #05095e",
                marginLeft: "-10px",
              }}
            >
              <h5>Type: {type}</h5>
              <h5>Status: {status}</h5>
              <h6>Patient: {patientEmail}</h6>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", alignItems: "center" }}>
              <Link to={{ pathname: `/rooms/${_id}`, state: { room } }}>
                <MDBBtn style={{ borderRadius: "20px" }}>See More</MDBBtn>
              </Link>
            </div>
          </MDBCardBody>
        </MDBCard>
        <div className="button-container">
          <input
            type="button"
            value="Rotated text"
            id="rotate"
            onClick={() => handleButtonClick(_id, status, patientEmail)}
            style={{
              height: "50px",
              backgroundColor: "blue",
              color: "white",
              borderRadius: "50px",
              width: "300px",
            }}
          />
        </div>
        <div className={`posted-content ${openRoomId === _id ? "open" : ""}`}>
          <MDBCard className={`content-inside ${openRoomId === _id ? "open" : ""}`} style={{ marginTop: "40px" }}>
            {status === "Occupied" ? (
              <MDBCardBody>
                <MDBCardTitle>{patientForBookedRoom?.fullName}</MDBCardTitle>
                <MDBCardText>Email: {patientForBookedRoom?.email}</MDBCardText>
                <div>
                  <img src={patientForBookedRoom?.coverImage} alt="Patient" style={{ height: "80px", width: "100px" }} />
                </div>
                <MDBBtn>See More</MDBBtn>
              </MDBCardBody>
            ) : (
              <MDBCardBody>
                <MDBCardTitle>Book Room</MDBCardTitle>
                <form onSubmit={bookRoom}>
                  <div className="form-outline mb-4">
                    <input
                      style={{ border: "1px solid lightgrey" }}
                      type="text"
                      id="form2Example11"
                      className="form-control"
                      name="patientEmail"
                      value={formData.patientEmail}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="form2Example11">
                      PatientEmail or FullName
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <h3 style={{ color: "black" }}>Fee: 1000 per Night</h3>
                  </div>
                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 pb-3 pt-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Booking in..." : "Book"}
                    </button>
                  </div>
                </form>
              </MDBCardBody>
            )}
          </MDBCard>
        </div>
      </div>
    </div>
  );
};

const RoomAll = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openRoomId, setOpenRoomId] = useState(null);
  const [patientForBookedRoom, setPatientForBookedRoom] = useState(null);
  const [formData, setFormData] = useState({
    patientEmail: "",
    status: "Occupied",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/room/getall", {
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
      setRooms(data?.message);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getPatientByEmail = async (email) => {
    try {
      const response = await fetch(`/api/room/getpatientinroom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ patientEmail: email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data?.message;
    } catch (error) {
      setError(error);
    }
  };

  const bookRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/room/update/${openRoomId}`, {
        method: "PUT",
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
      console.log("Room Booking", data);
      setFormData({ patientEmail: "" });
      fetchRooms();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async (roomId, roomStatus, email) => {
    if (roomStatus === "Occupied" && email) {
      const patient = await getPatientByEmail(email);
      setPatientForBookedRoom(patient);
    }
    setOpenRoomId((prevId) => (prevId === roomId ? null : roomId));
  };

  const handleFileChange = async (event, roomId) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('roomImage', file);

        const response = await fetch(`/api/room/updatepic/${roomId}`, {
          method: 'PUT',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);
        fetchRooms(); // Refresh the rooms data after updating the image
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="doctorall">
      <div style={{ padding: "40px" }}>
        <h1>All Rooms</h1>
        <div style={{ display: "flex", gap: "10%", flexWrap: "wrap" }}>
          {rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              handleButtonClick={handleButtonClick}
              openRoomId={openRoomId}
              handleFileChange={handleFileChange}
              patientForBookedRoom={patientForBookedRoom}
              formData={formData}
              handleChange={handleChange}
              bookRoom={bookRoom}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomAll;
