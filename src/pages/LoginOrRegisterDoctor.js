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

export default function LoginOrRegisterDoctor() {
  const [loginRegisterActive, setLoginRegisterActive] = useState('login');
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [formData, setFormData] = useState({
    fullName: '',
    doctorname: '',
    email: '',
    password: '',
    role: '',
    totalLeaveinaYear: '',
    department: '',
    avatar: null,
    coverImage: null,
  });

  const handleLoginRegisterClick = (tab) => {
    if (loginRegisterActive !== tab) {
      setLoginRegisterActive(tab);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const stateUpdate = loginRegisterActive === 'login' ? setLoginFormData : setFormData;
    stateUpdate((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: files[0] }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, doctorname, password, role, totalLeaveinaYear, department, avatar, coverImage } = formData;

    const data = new FormData();
    data.append('fullName', fullName);
    data.append('email', email);
    data.append('doctorname', doctorname);
    data.append('password', password);
    data.append('role', role);
    data.append('totalLeaveinaYear', totalLeaveinaYear);
    data.append('department', department);
    data.append('avatar', avatar);
    if (coverImage) {
      data.append('coverImage', coverImage);
    }

    try {
      const response = await fetch('/api/doctors/register', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      alert('User registered successfully');
      console.log(response);
      setLoginRegisterActive('login');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = loginFormData;

    try {
      const response = await fetch('/api/doctors/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log(data);
      alert('User logged in successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='all'>
      <MDBTabs pills justify className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('login')}
            active={loginRegisterActive === 'login'}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('register')}
            active={loginRegisterActive === 'register'}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent style={{ padding: "0px 50px", margin: "30px" }}>
        {
          loginRegisterActive === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div className='text-center mb-3'>
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

              <MDBInput className='mb-4' type='email' id='email' label='Email address' onChange={handleInputChange} />
              <MDBInput className='mb-4' type='password' id='password' label='Password' onChange={handleInputChange} />

              <label htmlFor="role">Choose a role:</label>
              <select name="role" id="role" onChange={handleInputChange} className='mb-4'>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="admin">Admin</option>
                <option value="compounder">Compounder</option>
                <option value="receptionist">Receptionist</option>
              </select>

              <MDBRow className='mb-4'>
                <MDBCol className='d-flex justify-content-center'>
                  <MDBCheckbox id='form7Example3' label='Remember me' defaultChecked />
                </MDBCol>
                <MDBCol>
                  <a href='#!'>Forgot password?</a>
                </MDBCol>
              </MDBRow>

              <MDBBtn type='submit' className='mb-4' block>
                Sign in
              </MDBBtn>

              <div className='text-center'>
                <p>
                  Not a member? <a href='#!' onClick={() => handleLoginRegisterClick('register')}>Register</a>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className='text-center mb-3'>
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
              <MDBInput className='mb-4' id='doctorname' label='Username' value={formData.doctorname} onChange={handleInputChange} />
              <MDBInput className='mb-4' type='email' id='email' label='Email address' value={formData.email} onChange={handleInputChange} />
              <MDBInput className='mb-4' type='password' id='password' label='Password' value={formData.password} onChange={handleInputChange} />
              <MDBInput className='mb-4' id='role' label='Role' value={formData.role} onChange={handleInputChange} />
              <MDBInput className='mb-4' id='totalLeaveinaYear' label='Total Leave in a Year' value={formData.totalLeaveinaYear} onChange={handleInputChange} />
              <MDBInput className='mb-4' id='department' label='Department' value={formData.department} onChange={handleInputChange} />
              
              <h4 style={{ color: "black" }}>Avatar:</h4>
              <MDBInput className='mb-4' type='file' id='avatar' onChange={handleFileChange} />
              
              <h4 style={{ color: "black" }}>Cover Image:</h4>
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
          )
        }
      </MDBTabsContent>
    </div>
  );
}
