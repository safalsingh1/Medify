import React, { useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

export default function RegisterPatient() {
  const [formData, setFormData] = useState({
    fullName: '',
    patientname: '',
    email: '',
    password: '',
    role: '',
    totalLeaveinaYear: '',
    department: '',
    avatar: null,
    coverImage: null,
  });



  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: files[0] }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, patientname, password, role, totalLeaveinaYear, department, avatar, coverImage } = formData;

    const data = new FormData();
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('patientname', patientname);
    data.append('password', password);
    data.append('role', role);
    data.append('totalLeaveinaYear', totalLeaveinaYear);
    data.append('department', department);
    data.append('avatar', avatar);
    if (coverImage) {
      data.append('coverImage', coverImage);
    }

    try {
      const response = await fetch('/api/patients/register', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      alert('User registered successfully');
      console.log(response);
    } catch (error) {
        console.log(error)
    //   alert(error.message);
    }
  };

  return (
    <div className='all'>

      <MDBTabsContent style={{ padding: "0px 50px", margin: "30px",}}>
      
            <form onSubmit={handleRegisterSubmit} style={{border:"2px solid black" ,boxShadow:"2px 2px 6px black",borderRadius:"30px",padding:"30px"}}>
              <div className='text-center mb-3'>
                <h1>Register Patient:</h1>
                <p>Sign up with:</p>

                <MDBBtn floating color="secondary" className='mx-1'>
                  <MDBIcon fab icon='facebook-f' />
                </MDBBtn>

                <MDBBtn floating color="secondary" className='mx-1'>
                  <MDBIcon fab icon='google' />
                </MDBBtn>

                <MDBBtn floating color="secondary" className='mx-1'>
                  <MDBIcon fab icon='twitter' />
                </MDBBtn>

                <MDBBtn floating color="secondary" className='mx-1'>
                  <MDBIcon fab icon='github' />
                </MDBBtn>
              </div>

              <p className='text-center'>or:</p>

              <MDBInput className='mb-4' id='fullName' label='Name' value={formData.fullName} onChange={handleInputChange} />
              <MDBInput className='mb-4' id='patientname' label='Username' value={formData.patientname} onChange={handleInputChange} />
              <MDBInput className='mb-4' type='email' id='email' label='Email address' value={formData.email} onChange={handleInputChange} />
              <MDBInput className='mb-4' type='password' id='password' label='Password' value={formData.password} onChange={handleInputChange} />
              <MDBInput className='mb-4' id='role' label='Role' value={formData.role} onChange={handleInputChange} />
              <MDBInput className='mb-4' id='totalLeaveinaYear' label='Total Leave in a Year' value={formData.totalLeaveinaYear} onChange={handleInputChange} />
              <MDBInput className='mb-4' id='department' label='Department' value={formData.department} onChange={handleInputChange} />
              <h4 style={{color:"black"}}> Avatar:</h4>
              <MDBInput className='mb-4' type='file' id='avatar'  onChange={handleFileChange} />
            <h4 style={{color:"black"}}>CoverImage:
                </h4>  
              <MDBInput className='mb-4' type='file' id='coverImage' onChange={handleFileChange} />

              <MDBCheckbox
                wrapperClass='d-flex justify-content-center mb-4'
                id='form8Example6'
                label='I have read and agree to the terms'
                defaultChecked
              />

              <MDBBtn type='submit' className='mb-4' block>
                Register
              </MDBBtn>
            </form>
       
      </MDBTabsContent>
    </div>
  );
}
