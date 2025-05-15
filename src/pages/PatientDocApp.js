import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PatientDocApp({ patientId,value }) {
    const location = useLocation();
    const [patient, setPatient] = useState(location.state?.patient || null);
    const [loading, setLoading] = useState(!patient);
    const [error, setError] = useState(null);

    const fetchPatient = async () => {
        try {
            const response = await fetch(`/api/patients/getbyid/${patientId}`, {
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
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!patient) {
            fetchPatient();
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
        <h4 style={{color:"black",marginLeft:"10px"}}>Patient:</h4>
        <div style={{display:"flex",justifyContent:"space-around"}}>
            <h5>Patientname: {patient.patientname}</h5>
            <img src={patient.avatar} alt={patient.patientname} style={{ height: "56px", width: "60px", borderRadius: "30px" }} /></div>
        </div>):(
             <div style={{display:"flex"}}>
             <h5 style={{paddingRight:"10px"}}>By: {patient.patientname}</h5>
             <img src={patient.avatar} alt={patient.patientname} style={{ height: "40px", width: "40px", borderRadius: "30px",marginLeft:"10px" }} /></div>
         
        )}</>
    );
}

export default PatientDocApp;
