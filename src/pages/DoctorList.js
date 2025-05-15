import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function DoctorList({ departmentId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const fetchDoctorsInDept = async () => {
    try {
      const response = await fetch(`/api/department/doctors/${departmentId}`, {
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
      setDoctors(data?.message);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorsInDept();
  }, [departmentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Name,Email</th>
            <th scope='col'>Role,Department</th>
            <th scope='col'>LeavesLeft</th>
            <th scope='col'>Position</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>
                <div className='d-flex align-items-center'>
                  <img
                    src={doctor.coverImage || 'https://mdbootstrap.com/img/new/avatars/8.jpg'}
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                  />
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{doctor.doctorname}</p>
                    <p className='text-muted mb-0'>{doctor.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{doctor?.role}</p>
                <p className='text-muted mb-0'>{doctor?.department}</p>
              </td>
              <td>
                <MDBBadge color={doctor.status === 'Active' ? 'success' : 'danger'} pill>
                  {doctor.totalLeaveinaYear}
                </MDBBadge>
              </td>
              <td>{doctor.role}</td>
              <td>
              <Link to={{ pathname: `/doctor/${doctor._id}`, state: { doctor } }}>
                    <MDBBtn style={{ borderRadius: "20px" }}>See More</MDBBtn>
                  </Link>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default DoctorList;
