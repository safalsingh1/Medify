import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect,useState } from 'react'
import "./Overview.css"
function OnlyMedicineMain({medicineId}) {

    const [medicine, setMedicine] = useState({});
    const [loading, setLoading] = useState(!medicine);
    const [error, setError] = useState(null);
    const fetchMedicine = async () => {
        try {
            const response = await fetch(`/api/medicine/getmedicine/${medicineId}`, {
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
            console.log("single medicine", data);
            setMedicine(data?.message);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
 useEffect(() => {
    fetchMedicine();
  }, []);

  return (
    <div>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error}</p>
    ) : (
      <div style={{padding:"10px",border:"1px solid black",borderRadius:"10px",boxShadow:"2px 2px 2px",backgroundColor:"lightgreen",marginTop:"10px"}}>
        <span style={{display:"flex",flexWrap:"wrap",gap:"10px",alignItems:"center"}}>
        <span> Medicine Name: {medicine?.name}</span>
        <span> Price: {medicine?.price}</span> <span>Dosage per Day: {medicine?.dosageperday}</span>
        <span> <MDBBtn style={{borderRadius:"30px",marginLeft:"40px"}} className='gradient-background-3'>Know More</MDBBtn>
            </span>
           
        </span>
   
   
    
      </div>
    )}
  </div>
  )
}

export default OnlyMedicineMain