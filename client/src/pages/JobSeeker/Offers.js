import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Offers() {
  const [listOfRecruiterForms, setListOfRecruiterForms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/recruiter').then((response) => {
      setListOfRecruiterForms(response.data);
    });
  }, []);

  return (
    <div>
        <Link to='/createresume'>Create your Resume</Link>
        {listOfRecruiterForms.map((value, key) => (
            <div className='recruiterPost' key={key}>
            <div className='companyInfo'>
                <div className='nomEntreprise'> {value.nomEntreprise}</div>
                <div className='address'> {value.address} </div>
                <div className='City'> {value.City} </div>
            </div>
            <div className='posteInfo'>
                
            <div className='poste'> {value.poste}</div> 
                <div className='description'> {value.description}</div>
            </div>


            <div className='requirementsInfo'>
            
                <div className='experience'> {value.experience}</div>
                <div className='formations'> {value.formations}</div>
                <div className='skills'> {value.skills}</div>
                <div className='keywords'> {value.keywords}</div> 
            <div className='langues'> {value.langues}</div>
            </div>
            </div>
        ))}
    </div>
  );
}

export default Offers;
