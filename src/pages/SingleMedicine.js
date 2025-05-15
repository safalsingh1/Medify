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
import './singlePatient.css'
import PatientDocApp from "./PatientDocApp";

function SingleMedicine() {
  const { id } = useParams();
  const location = useLocation();
  const [medicine, setMedicine] = useState(location.state?.medicine || null);
  const [loading, setLoading] = useState(!medicine);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [changes, setChanges] = useState([]);
  const [avgRating, setAvgRating] = useState('');
  const extractDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    "name": "",
    "price": 20,
    "manufacturer": "",
    "expiryDate": "",
    "reorderLevel": 0,
    "dosageperday": 0,
    "quantityChanged": 0
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateMedicine = async (quantityChanged) => {
    try {
      const response = await fetch(`/api/medicine/update/doctoridinbody/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...medicine,
          quantityChanged,
          doctorId:"6657086db3d2f16d34315a0f"
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMedicine(data.message);
      setChanges(data.message.changesby || []);
      alert("Medicine updated successfully");
    } catch (error) {
      alert(error);
    }
  };

  const getMedicine = async () => {
    try {
      const response = await fetch(`/api/medicine/getmedicine/${id}`, {
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
      setMedicine(data?.message);
      setChanges(data?.message?.changesby || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getRatings = async () => {
    try {
      const response = await fetch(`/api/ratings/medicine/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const datax = await response.json();
      setRatings(datax?.data?.ratings || []);
      setAvgRating(datax?.data?.averageRating || '');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const [centredModalrating, setCentredModalrating] = useState(false);

  const [rating, setRating] = useState(0);

  const toggleOpenrating = () => {
    setCentredModalrating(!centredModalrating);
  };

  

  const handleStarClick =  (value) => {
    setRating(value);
    console.log('Selected rating:', rating);
  };

  const [formdataRating,setformDatarating]=useState({
    type_id:id,
    rating_value:rating,
    rating_type:"Medicine"
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
        rating_type: "Medicine"
      });
      console.log(data)
      alert(`Rating given as ${rating}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (!medicine) {
      getMedicine();
      getRatings();
    }
  }, [id, medicine]);

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

  if (!medicine) {
    return <div>No medicine found</div>;
  }

  return (
    <div className="all" style={{ overflowX: "hidden" }}>
      <MDBCard
        className="w-76 gradient-background-4"
        style={{
          marginLeft: "50px",
          marginRight: "100px",
          border: "2px solid black",
          boxShadow: "4px 4px 30px ",
          marginTop: "20px",
        }}
      >
        <MDBCardBody style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <MDBCardTitle>
              <h3>Medicine: {medicine.name}</h3>
            </MDBCardTitle>
            <MDBCardText>
              <h3>Manufacturer: {medicine.manufacturer}</h3>
            </MDBCardText>
            <MDBCardText>
              <h3>Price: ${medicine.price}</h3>
            </MDBCardText>
          </div>

          <div>
            <MDBCardText>
              <h3>Expiration Date: {extractDate(medicine.expirationDate)}</h3>
            </MDBCardText>
            <MDBCardText>
              <h3>Quantity: {medicine.quantity}</h3>
            </MDBCardText>
            <MDBCardText>
              <h3>Batch Number: {medicine.batchNumber}</h3>
            </MDBCardText>
          </div>

          <div>
            <MDBCardText>
              <h3>Reorder Level: {medicine.reorderLevel}</h3>
            </MDBCardText>
            <MDBCardText>
              <h3>Dosage Per Day: {medicine.dosageperday}</h3>
            </MDBCardText>

            <MDBBtn href="#">Buy Now</MDBBtn>
              <MDBBtn onClick={toggleOpenrating} style={{backgroundColor:"blue"}}>Rate the doctor</MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>

      <div style={{ display: "flex", gap: "3%" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "60%", alignItems: "center" }}>
          <h1 style={{ color: "black", fontFamily: "cursive", marginTop: "20px" }}>Changes</h1>
          {changes.map((change, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "80%", marginBottom: "10px" }}>
              <MDBCard style={{ borderRadius: "30px", width: "90%", height: "fit-content", marginTop: "10px", border: "1px solid black", boxShadow: "1px 1px 4px gray" }}>
                <MDBCardBody style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <h3 style={{ color: "black" }}>ChangeBy:{change?.doctorName}</h3>
                  <h3 style={{ color: "black", marginLeft: "30px" }}>Change:-({change?.quantityChanged})</h3>
                </MDBCardBody>
              </MDBCard>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "33%", border: "0px solid black", alignItems: "center" }}>
          <h2 style={{ fontFamily: "cursive", color: "black", marginLeft: "-80px" }}>Avg Rating: {avgRating} </h2>
          {ratings.map((rating, index) => (
            <div key={index} style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", width: "90%", marginBottom: "10px" }}>
              <MDBCard style={{ borderRadius: "30px", width: "90%", height: "fit-content", marginTop: "10px", border: "1px solid black", boxShadow: "1px 1px 4px gray" }}>
                <MDBCardBody style={{ display: "flex", flexDirection: "row", padding: "3px 18px 3px 20px", justifyContent: "center", alignItems: "center" }}>
                  <h3 style={{ margin: 0, color: "black" }}>Rating: {rating?.rating_value}</h3>
                  <div style={{ transform: "scale(0.8)" }}>
                    <PatientDocApp patientId={rating?.patient_id} value={false} />
                    <h6>{extractDate(rating?.createdAt)}</h6>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          ))}
        </div>
        <div>
          <h2>Update Medicine Details</h2>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="manufacturer"
              placeholder="Manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
            <input
              type="text"
              name="batchNumber"
              placeholder="Batch Number"
              value={formData.batchNumber}
              onChange={handleChange}
            />
            <input
              type="date"
              name="expiryDate"
              placeholder="Expiry Date"
              value={formData.expiryDate}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="number"
              name="reorderLevel"
              placeholder="Reorder Level"
              value={formData.reorderLevel}
              onChange={handleChange}
            />
            <input
              type="number"
              name="dosageperday"
              placeholder="Dosage Per Day"
              value={formData.dosageperday}
              onChange={handleChange}
            />
            <button type="button" onClick={() => updateMedicine(0)}>
              Update Medicine Details
            </button>
          </form>
          <h2>Manage Quantity</h2>
          <button type="button" onClick={() => updateMedicine(1)}>
            Add 1 Unit
          </button>
          <button type="button" onClick={() => updateMedicine(-1)}>
            Subtract 1 Unit
          </button>
        </div>
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
}

export default SingleMedicine;
