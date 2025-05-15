import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import p1 from '../assets/p1.jpg';

const MedicineAdditionPanel = () => {
    const navigate = useNavigate();

  const {patientId,diagnosisId} = useParams();  
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [openMedicineId, setOpenMedicineId] = useState([]);
  const AddtoMedicineList = (id, name) => {
    setSelectedMedicines(prevSelected => [...prevSelected, { id, name }]);
  };
const [appointmentId,setAppointmentId]=useState(null);
  const RemoveFromMedicineList = (id) => {
    setSelectedMedicines(prevSelected => prevSelected.filter(medicine => medicine.id !== id));
  };

  const getMedicineIds = () => {
    const ids = selectedMedicines.map(medicine => medicine.id);
    setOpenMedicineId(ids)
    console.log("ids arw",ids);
    return ids;
  };

  
  const fetchDiagnosis = async () => {
    try {
      const response = await fetch(`/api/diagnosis/patient/${patientId}`, {
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
      navigate(`/patient/${patientId}`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  const addMedicines = async () => {
    try {
      const response = await fetch(`/api/diagnosis/update/addmedicines/${diagnosisId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ medicines: getMedicineIds() }),
      });
      if(response.ok){
        alert("Medicines added successfully");
        // window.history.back(); // Navigate back after alert
        // window.location.reload(); // Reload the window after alert
      }
      fetchDiagnosis()
    }
     

    catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }}

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
      <div style={{ display: "flex", flexDirection: "row", gap: "3%" }}>
        <div style={{ padding: "30px", width: "55%", border: "1px solid black", height: "94vh", overflowY: "scroll", flexWrap: "wrap", display: "flex", justifyContent: "center", gap: "60px" }}>
          {medicines.map((medicine) => (
            <div key={medicine._id} style={{ border: "0px solid black", width: "fit-content" }}>
              <MDBCard style={{ width: "250px", height: "fit-content", borderRadius: "30px", border: "1px solid black", boxShadow: "2px 2px 2px" }}>
                <MDBCardImage src={p1} fluid alt='...' style={{ borderRadius: "20px" }} />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
                <MDBCardBody>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <MDBCardTitle><h4 style={{ color: "black" }}>Name: {medicine.name}</h4></MDBCardTitle>
                  </div>
                  <div style={{ background: "#f5f5f5", padding: "7px", width: "220px", borderLeft: "10px solid #05095e", marginLeft: "-10px" }}>
                    <h5>Manufacturer: {medicine.manufacturer}</h5>
                    <h5>Batch No.: {medicine.batchNumber}</h5>
                    <h6>QuantityLeft: {medicine.quantity}</h6>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", alignItems: "center", flexWrap: "wrap" }}>
                    <Link to={{ pathname: `/medicines/${medicine._id}`, state: { medicine } }}>
                      <MDBBtn style={{ borderRadius: "20px" }} className='gradient-background-5'>See More </MDBBtn>
                    </Link>
                    <MDBBtn
                      style={{ borderRadius: "20px" }}
                      onClick={() => AddtoMedicineList(medicine._id, medicine.name)}
                      className='gradient-background-1'
                    >
                      Select
                    </MDBBtn>
                    <MDBCardText style={{ marginTop: "8px" }}>
                      <span className="badge badge-info rounded-pill d-inline">Dose: {medicine.dosageperday} per day</span>
                    </MDBCardText>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          ))}
        </div>
        <div style={{ width: "30%" }}>
          <h2 style={{ color: "black", border: "2px solid black" }}>Medicines Added</h2>
          {selectedMedicines.map((medicine) => (
            <div key={medicine.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{color:"black"}}>{medicine.name}</h4>
              <btn style={{ borderRadius: "20px",cursor:"pointer" }} onClick={() => RemoveFromMedicineList(medicine.id)}><i class="fa fa-trash" aria-hidden="true" style={{color:"red"}}></i>
</btn>
            </div>
          ))}
          <MDBBtn style={{ borderRadius: "20px", marginTop: "20px" }} onClick={addMedicines}>Get Selected Medicine IDs</MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default MedicineAdditionPanel;
