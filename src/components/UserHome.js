import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect } from 'react';
import { reportpets } from '../firebaseConfig';
function UserHome() {

  const [cityFilter, setCityFilter] = useState("");
  const [pets, setPets] = useState([]);

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  const filteredPets = pets.filter((pet) =>
    pet.city.toLowerCase().includes(cityFilter.toLowerCase())
  );

  const reportshelter=(id)=>{
    reportpets(id,true)
  }

  function handleClick(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
  }

  useEffect(() => {
    const dbb = getDatabase();
    const petsRef = ref(dbb, 'users/pets');

    const unsubscribe = onValue(petsRef, (snapshot) => {
      const petsData = snapshot.val();
      const petsArray = petsData ? Object.entries(petsData).map(([id, pet]) => ({ id, ...pet })) : [];
      setPets(petsArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
    <div className='container'  style={{width:"400px"}}>
      <div className="form-group">
          <label htmlFor="cityFilter" style={{marginLeft:"100px"}}>Filter by city</label>
          <input
            type="text"
            className="form-control"
            id="cityFilter"
            value={cityFilter}
            onChange={handleCityFilterChange}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
      {filteredPets.map((pet) => (
        <div class="card m-3 form-bg form-container">
          { pet.report? <span class="badge badge-danger" style={{width:"60px",marginBottom:"10px"}}>Reported</span>:
          <span class="badge badge-success" style={{width:"60px",marginBottom:"10px"}}>Trusted</span>}
            <span class="badge badge-success p-2" >{pet.name}</span> 
            <img
              src={pet.imageurl}
              class="card-img-top p-1 rounded-circle"
              width="100px"
              height="200px"
            ></img>

          <span class="badge badge-info p-2 m-2" >Breed : {pet.breed}</span>
          <span class="badge badge-info p-2 m-2" >City : {pet.city} , price : {pet.price} </span>
          <span class="badge badge-info p-2 m-2" >Gender : {pet.gender} , Age: {pet.age}  </span>

          <span class="badge badge-info p-2 m-2" >Phone Number : {pet.phonenumber}  </span>


			<div class="d-flex justify-content-around">
      <h5 className="card-title text-center">
        <button className="btn btn-success" onClick={() => handleClick(pet.phonenumber)}>Call For Enquiry</button>
      </h5>

        <h5 class="card-title text-center">
          <button className="btn btn-danger" onClick={()=>{reportshelter(pet.id)}}>Report</button>
        </h5>
		  </div>

        </div>
      ))}

    </div>
    </>
  );
}

export default UserHome