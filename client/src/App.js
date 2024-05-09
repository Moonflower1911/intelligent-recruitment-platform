
import './App.css';
import axios from "axios";
import { useEffect, useState} from "react"; 


function App() {

  const [listOfJobSeekerForms, setListOfJobSeekerForms] = useState([]);
  const [urlPath, setUrlPath] = useState(window.location.pathname);


  useEffect(() => {
    const fetchData = async () => {
      if (urlPath.includes("/recruiter/jobseeker")) {
        try {
          const response = await axios.get("http://localhost:3001/jobseeker");
          setListOfJobSeekerForms(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [urlPath]);



  return <div className="App">
      {listOfJobSeekerForms.map((value, key) => 
      {return <div className='jobseekerPost' >
      <div className='personalInfo'>
        <div className='nom' > {value.nom}</div>
        <div className='prenom'> {value.prenom} </div>
        <div className='email'> {value.email} </div>
        <div className='phoneNumber'> {value.phoneNumber} </div>
        <div className='address'> {value.address} </div>
      </div>
      <div className='body'>
        <div className='formations' > {value.formations}</div>
        <div className='experiences' > {value.experiences}</div>
        <div className='projetsAcademiques' > {value.projetsAcademiques}</div>
      </div>
      <div className='skills'>
      <div className='langues' > {value.langues}</div>
        <div  className='langages' > {value.langages}</div>
        <div className='logiciels' > {value.logiciels}</div>
      </div>
      </div>;
      })}
  </div>;
};

export default App;
