import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DoctorPatSecondApp({ doctorId,value }) {
    const location = useLocation();
    const [patient, setPatient] = useState(location.state?.patient || null);
    const [loading, setLoading] = useState(!patient);
    const [error, setError] = useState(null);

    const fetchDoctor = async () => {
        try {
            const response = await fetch(`/api/doctors/getbyid/${doctorId}`, {
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
            console.log("single doctor", data);
            setPatient(data?.message);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!patient) {
            fetchDoctor();
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (<>
   {  value ? 
       ( <div style={{ display: "flex",borderBottom:"2px   solid lightgray" ,flexDirection:"column",backgroundColor:"lavender",borderRadius:"20px"}}>
        <h4 style={{color:"black",marginLeft:"10px"}}>Doctor:</h4>
        <div style={{display:"flex",justifyContent:"space-around"}}>
            <h5>DoctorName: {patient.doctorname}</h5>
            <img src={patient.avatar} alt={patient.doctorname} style={{ height: "56px", width: "60px", borderRadius: "30px" }} /></div>
        </div>):(
             <div style={{display:"flex",backgroundColor:"lightblue",width:"fit-content",padding:"15px",borderRadius:"10px"}}>
             <h4 style={{paddingRight:"10px",color:"black"}}>Head: {patient.doctorname}</h4>
             <img src={patient.avatar} alt={patient.doctorname} style={{ height: "40px", width: "40px", borderRadius: "30px",marginLeft:"10px" }} /></div>
         
        )}</>
    );
}

export default DoctorPatSecondApp;
