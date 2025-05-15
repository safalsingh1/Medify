import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';

function SingleRoomChange() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        roomNumber: "",
        type: "",
        status: "",
        patientEmail: ""
    });
    const [room, setRoom] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const updateRoom = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`/api/room/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setRoom(data?.message);
            alert("room change succesfulltys")
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoom = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/room/get/${id}`, {
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
            setRoom(data?.message);
            setFormData(data?.message); // Set form data with fetched room details
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoom();
    }, [id]);

    return (
        <div className='all'>
            <form 
                style={{ border: "2px solid black", margin: "30px", padding: "20px", borderRadius: "10px" }}
                onSubmit={updateRoom}
            >
                <MDBInput
                    id='form4Example1'
                    wrapperClass='mb-4'
                    label='Room Number'
                    name='roomNumber'
                    value={formData.roomNumber}
                    onChange={handleChange}
                />
                <MDBInput
                    type='text'
                    id='form4Example2'
                    wrapperClass='mb-4'
                    label='Type'
                    name='type'
                    value={formData.type}
                    onChange={handleChange}
                />
                <MDBInput
                    wrapperClass='mb-4'
                    textarea
                    id='form4Example3'
                    rows={4}
                    label='Patient Email'
                    name='patientEmail'
                    value={formData.patientEmail}
                    onChange={handleChange}
                />
                <label htmlFor="status">Change Status:</label>
                <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Available">Available</option>
                </select>

                <MDBBtn type='submit' className='mb-4' block>
                    Update Room
                </MDBBtn>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </div>
    );
}

export default SingleRoomChange;
