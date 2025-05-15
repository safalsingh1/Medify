import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/patients/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies with the request
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong.');
      }

      const responseData = await response.json();
      navigate('/overview');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const authenticateUser = useCallback(async () => {
    try {
      const response = await fetch('/api/patients/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong.');
      }

      const responseData = await response.json();
      if (responseData.statusCode === true) {
        navigate('/overview');
      }
    } catch (err) {
      setError(err.message);
    }
  }, [navigate]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: 'lightblue' }}>
      <div className="container  h-100"  >
        <div className="row d-flex justify-content-center align-items-center h-100" style={{border:"0px solid black"}}>
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-4 mx-md-4">
                    <div className="text-center">
                      <img 
                        // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" 
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwC52NXL7L-gEAYaCJifSG1ko3VMKH0TEgyg&s'
                        style={{ width: '115px',height:'100px',borderRadius:"150px",border:"3px solid blue" }} 
                        alt="logo" 
                      />
                      <h4 className="mt-1 mb-3 pb-1">We are The Medify Team</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p>Please login to your account</p>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      <div className="form-outline mb-4">
                        <input 
                          type="email" 
                          id="form2Example11" 
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Phone number or email address" 
                          required 
                        />
                        <label className="form-label" htmlFor="form2Example11">Username</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input 
                          type="password" 
                          id="form2Example22" 
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required 
                        />
                        <label className="form-label" htmlFor="form2Example22">Password</label>
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button 
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 pb-3 pt-3" 
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Logging in...' : 'Log in'}
                        </button>
                        <a className="text-muted" href="#!">Forgot password?</a>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button 
                          type="button" 
                          className="btn btn-outline-danger"
                          onClick={() => navigate('/registerpatient')}
                        >
                          Create new
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
