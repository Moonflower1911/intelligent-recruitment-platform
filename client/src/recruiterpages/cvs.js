import React, {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import axios from "axios";

function CV(){
    let { id }=useParams();
    const [CvObject, SetCvObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/jobseeker/byId/${id}`).then((response) => {
            SetCvObject(response.data);
        });
    },[id]);
    return (
        <div>
            {CvObject.nom}
        </div>
    )
}

export default CV;