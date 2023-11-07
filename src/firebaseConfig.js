import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set,get ,update,remove } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCIMSLrHbta_9TzAjAmZZkWu8H5Y0-_E0o",
  authDomain: "pets-management-system-6906d.firebaseapp.com",
  projectId: "pets-management-system-6906d",
  storageBucket: "pets-management-system-6906d.appspot.com",
  messagingSenderId: "1089209302960",
  appId: "1:1089209302960:web:6e9fc207500b3487642075"
};


export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export function register(phonenumber, fullname, email,usertype,aadharcard,address,password){
    const dbb = getDatabase();
    set(ref(dbb, 'users/' + phonenumber), {
      username: fullname,
      email: email,
      usertype:usertype,
      aadharcard:aadharcard,
      address:address,
      password:password
    });
    alert("Registration Successfull")
}

export function addpets(id, name, breed,age,gender,shelyteraadhar,phonenumber,imageurl,price,city){
    const dbb = getDatabase();
    set(ref(dbb, 'users/pets/' + id), {
        name: name,
        breed: breed,
        age:age,
        gender:gender,
        shelyteraadhar:shelyteraadhar,
        phonenumber:phonenumber,
        imageurl:imageurl,
        price:price,
        city:city
    });
    alert("added Successfull")
}

export function reportpets(id,status) {
    const dbb = getDatabase();
    const petsRef = ref(dbb, 'users/pets/' + id);

    get(petsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const petData = snapshot.val();
            petData["report"] = status;
            update(petsRef, petData).then(() => {
                alert('Reported successfully!');
            }).catch((error) => {
                console.error('Error Reporting: ', error);
            });
        } else {
            console.error('Pet data not found!');
        }
    }).catch((error) => {
        console.error('Error getting pet data: ', error);
    });
}

export function deletePet(id) {
    const db = getDatabase();
    const petRef = ref(db, 'users/pets/' + id);
  
    remove(petRef).then(() => {
      alert('Pet deleted successfully!');
    }).catch((error) => {
      console.error('Error deleting pet: ', error);
    });
  }

