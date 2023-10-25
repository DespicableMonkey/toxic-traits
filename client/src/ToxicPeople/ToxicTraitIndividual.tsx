import React, { useState } from 'react';
import { TextField, Link, Typography, Grid  } from '@mui/material';
import PersonCard from './Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import { ToxicPerson, IToxicPerson } from '../../../server/src/models/toxicperson.model'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { postData } from '../util/api';
import { get } from 'http';
import './invid.css'

interface Person {
    _id: string;
    firstName: string;
    lastName: string;
    pictureUrl: string;
    toxicTraits: [string];
}


function ToxicTraitIndividual() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [person, setPerson] = useState(null)
    async function getPerson(id: string) {
      const res = await postData('toxic/get-trait-from-id', {
        id: id
      })
      console.log(res.data)
      if(!res.error) {
        setPerson(res.data)
      }
    }

    React.useEffect(()=>{
      if(id) {
        getPerson(id)
      }
      console.log(id)
    }, [])
    function goBack() {
      navigate(`/Toxic-Traits`);
    }

    async function del() {
      if(!person) {
        alert("Internal Error")
        return
      }
      let id = (person as Person)._id;
      const res = await postData('toxic/delete', {
        id: id
      });
      if (res.error) {
        alert("Error Deleting Person: " + res.error)
      }
      else {
        goBack()
      }
    }

  return (
    <div>
        { person &&
        <div>
            <div className="photowrapper">
              <img className="photoimg" src={(person as Person).pictureUrl}></img>
              <div className="photoverlay">

                <div className="phototext">
                    {(person as Person).firstName +  " " + (person as Person).lastName}
                </div>
              </div>
              <div className="topheader">
                <div className="backbutton" onClick={goBack}>
                Back
                </div>
                <div className="posright">
                <div className="updatebutton" onClick={goBack}>
                Update
                </div>
                <div className="deletebutton" onClick={del}>
                Delete
                </div>
                </div>

              </div>
            </div>
            
            <div className="traitwrapper">
            <div className="toxictitle">Toxic Traits</div>
            {(person as Person).toxicTraits.map((e, index) => (
                <div className="trait">{e}</div>
            ))}
            </div>
        </div>
        }
        
    </div> 
    
  );
}

export default ToxicTraitIndividual;