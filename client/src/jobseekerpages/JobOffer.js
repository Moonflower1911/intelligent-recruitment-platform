import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

function JobOffer() {
    let {id}= useParams();
    const [JobOfferObject ,setJobOfferObject] = useState({});
    
    useEffect(() => {
        axios.get(`http://localhost:3001/recruiter/byId/${id}`).then((response) => {
          setJobOfferObject(response.data);
        });
    }, [id]);

  return (
    <div>
       {JobOfferObject.nomEntreprise} 
    </div>
  )
}

export default JobOffer
