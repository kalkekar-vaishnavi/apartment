import React, { useEffect, useState } from 'react';
import './data.css';
import search_icon from '../assets/search.png';
import axios from 'axios';

const Data = () => {
  const [selectedApartment, setSelectedApartment] = useState("");
  const [info, setInfo] = useState({ id: "", apartmentName: "", createdBy: "", createdDate: "", updatedDate: "", status: "", description: "" });
  const [apartments, setApartments] = useState([]); // Apartments from the backend
  const [searchTerm, setSearchTerm] = useState(''); // Ensure this is initialized as an empty string
  const [newBuilding, setNewBuilding] = useState({ id: '', apartmentName: '', createdBy: '', createdDate: '', updatedDate: '', status: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  // Stores the saved building data

  useEffect(() => {
    // Fetch apartment names from the backend when the component mounts
    axios.get('http://localhost:8084/api/apartments')
      .then(response => {
        setApartments(response.data); // Now store the entire apartment data
      })
      .catch(error => {
        console.error("There was an error fetching the apartments!", error);
      });
  }, []);

  const handleAddBuilding = () => {
    // Open the modal to enter new building data
    setIsModalOpen(true);
  };

  const handleSaveBuilding = () => {
    // Add the new building to the saved buildings list and to the apartments list

    setApartments([...apartments, newBuilding]); // Save the entire building data, not just the name

     //Close the modal
    setIsModalOpen(false);

    // Optionally, you can also send the data to the backend here
    axios.post('http://localhost:8084/api/apartments', newBuilding)
      .then(response => {
        console.log('Building added:', response.data);
      })
      .catch(error => {
        console.error('Error adding building:', error);
      });
  };

  const handleSelectApartment = (apartment) => {
    setInfo(apartment);  // Set the entire apartment data in the `info` state
    setSelectedApartment(apartment.apartmentName); // Set the selected apartment name
  };

  const filteredApartments = apartments.filter(apt =>
    apt.apartmentName && apt.apartmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <div className='search'>
        <input
          type="text"
          value={searchTerm}
          placeholder="Choose Apartment"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={search_icon} alt="Search Icon" />
        <div className='list'>
          {filteredApartments.map((apt, index) => (
            <label key={index} className='list-cell'>
              <input
                type="radio"
                value={apt.apartmentName}
                name="apartment"
                onClick={() => handleSelectApartment(apt)} // Pass the selected apartment data to the handler
              />
              {apt.apartmentName}
            </label>
          ))}
        </div>


        {/* Add Building Button */}
        <div className='add-building'>
          <button onClick={handleAddBuilding}>Add Apartment</button>
        </div>


 

      </div>

      {/* Modal for adding new building */}
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h4>Add New Building</h4>
            <input
              type='text'
              value={newBuilding.id}
              onChange={(e) => setNewBuilding({ ...newBuilding, id: e.target.value })}
              placeholder='Enter ID'
            />
            <input
              type='text'
              value={newBuilding.apartmentName}
              onChange={(e) => setNewBuilding({ ...newBuilding, apartmentName: e.target.value })}
              placeholder='Enter Apartment Name' />
            <input
              type='text'
              value={newBuilding.createdBy}
              onChange={(e) => setNewBuilding({ ...newBuilding, createdBy: e.target.value })}
              placeholder='Created By' />
            <input
              type='date'
              value={newBuilding.createdDate}
              onChange={(e) => setNewBuilding({ ...newBuilding, createdDate: e.target.value })}
              placeholder='Created Date' />
            <input
              type='date'
              value={newBuilding.updatedDate}
              onChange={(e) => setNewBuilding({ ...newBuilding, updatedDate: e.target.value })}
              placeholder='Updated Date' />
            <input
              type='text'
              value={newBuilding.status}
              onChange={(e) => setNewBuilding({ ...newBuilding, status: e.target.value })}
              placeholder='Status' />
            <input
              type='text'
              value={newBuilding.description}
              onChange={(e) => setNewBuilding({ ...newBuilding, description: e.target.value })}
              placeholder='Description' />
            <button onClick={handleSaveBuilding}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Data;
