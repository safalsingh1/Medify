import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

function CreateMedicine() {
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    batchNumber: '',
    expiryDate: '',
    quantity: '',
    reorderLevel: '',
    price: '',
    dosageperday: '',
    doctorId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/medicine/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      console.log('Medicine created successfully', data);
      // Reset the form
      setFormData({
        name: '',
        manufacturer: '',
        batchNumber: '',
        expiryDate: '',
        quantity: '',
        reorderLevel: '',
        price: '',
        dosageperday: '',
        doctorId: ''
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='all'>
      <h2>Create Medicine</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{border:"2px solid blue",boxShadow:"2px 2px 5px blue",padding:"20px",margin:"20px",borderRadius:"30px"}}>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput name='name' value={formData.name} onChange={handleChange} id='form6Example1' label='Medicine Name' />
          </MDBCol>
          <MDBCol>
            <MDBInput name='manufacturer' value={formData.manufacturer} onChange={handleChange} id='form6Example2' label='Manufacturer' />
          </MDBCol>
        </MDBRow>

        <MDBInput wrapperClass='mb-4' name='batchNumber' value={formData.batchNumber} onChange={handleChange} id='form6Example3' label='Batch Number' />
        <MDBInput wrapperClass='mb-4' type='date' name='expiryDate' value={formData.expiryDate} onChange={handleChange} id='form6Example4' label='Expiry Date' />
        <MDBInput wrapperClass='mb-4' type='number' name='quantity' value={formData.quantity} onChange={handleChange} id='form6Example5' label='Quantity' />
        <MDBInput wrapperClass='mb-4' type='number' name='reorderLevel' value={formData.reorderLevel} onChange={handleChange} id='form6Example6' label='Reorder Level' />
        <MDBInput wrapperClass='mb-4' type='number' name='price' value={formData.price} onChange={handleChange} id='form6Example7' label='Price' />
        <MDBInput wrapperClass='mb-4' type='number' name='dosageperday' value={formData.dosageperday} onChange={handleChange} id='form6Example8' label='Dosage Per Day' />
        {/* <MDBInput wrapperClass='mb-4' type='number' name='quantityChanged' value={formData.quantityChanged} onChange={handleChange} id='form6Example9' label='Quantity Changed' /> */}
        <MDBInput wrapperClass='mb-4' type='text' name='doctorId' value={formData.doctorId} onChange={handleChange} id='form6Example10' label='Doctor ID' />

        <MDBBtn className='mb-4' type='submit' block disabled={loading}>
          {loading ? 'Creating...' : 'Create Medicine'}
        </MDBBtn>
      </form>
    </div>
  );
}

export default CreateMedicine;
