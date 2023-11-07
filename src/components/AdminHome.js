import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect,useState } from 'react';
import { deletePet, reportpets } from '../firebaseConfig';

function AdminHome() {

  const [pets, setPets] = useState([]);
  const [cityFilter, setCityFilter] = useState("");

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  const filteredPets = pets.filter((pet) =>
    pet.city.toLowerCase().includes(cityFilter.toLowerCase())
  );

  const reportshelter=(id)=>{
    reportpets(id,false)
  }

  function handleClick(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
  }

  const deletepets=(id)=>{
    deletePet(id)
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
    <div className='container-fluid mt-3 mb-3'>
      <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">pet.report</th>
              <th scope="col">pet.name</th>
              <th scope="col">pet.breed</th>
              <th scope="col">pet.city</th>
              <th scope="col">pet.price</th>
              <th scope="col">pet.gender</th>
              <th scope="col">pet.age</th>
              <th scope="col">Report Trusted</th>
              <th scope="col">Call To Verify</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
          {filteredPets.map((pet) => (
            <tr>
              <th scope="row">{pet.id}</th>
              <td>{pet.report ? "Reported":"Trusted"}</td>
              <td>{pet.name}</td>
              <td>{pet.breed}</td>
              <td>{pet.city}</td>
              <td>{pet.price}</td>
              <td>{pet.gender}</td>
              <td>{pet.age}</td>
              <td><button type="button" class="btn btn-outline-success" onClick={()=>{reportshelter(pet.id)}}>Trusted</button></td>
              <td><button type="button" class="btn btn-outline-info" onClick={() => handleClick(pet.phonenumber)} >Call to Verify</button></td>
              <td><button type="button" class="btn btn-outline-danger" onClick={()=>{deletepets(pet.id)}}>Delete</button></td>
            </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default AdminHome