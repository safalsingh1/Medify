import React, { useEffect, useState } from 'react';
import DoctorPatApp from './DoctorPatApp';
import DoctorPatSecondApp from './DcotorPatSecondApp';
import DoctorList from './DoctorList';

const Team = () => {
  const [alldept, setAllDept] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const getAllDept = async () => {
    try {
      const response = await fetch('/api/department/getall', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setAllDept(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDept();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='home'>
      <h1>Departments</h1>
      <div style={{border:"2px solid orange",boxShadow:"2px 2px 10px orange",padding:"10px",borderRadius:"30px",margin:"30px"}}>
      {alldept.map((dept) => (<div style={{borderBottom:"2px solid black"}}>
        <div key={dept._id} >
          <h1>{dept?.name}</h1>
          <DoctorPatSecondApp doctorId={dept?.head?._id} value={false} />
        </div>
        <div>
         <DoctorList departmentId={dept._id}/>
       
        </div></div>
      ))}</div>
    </div>
  );
};

export default Team;
