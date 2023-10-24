import React from 'react';
import { TextField, Link, Typography, Grid  } from '@mui/material';
import PersonCard from './Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import { ToxicPerson, IToxicPerson } from '../../../server/src/models/toxicperson.model'
import { useNavigate } from "react-router-dom";

function ToxicTraitIndividual() {

    const navigate = useNavigate();
  
    function handleClick() {
      navigate("/ToxicTraitIndividual");
    }
  
  return (
    <div>
        <h1> toxic traits </h1>
        
    </div> 
    
  );
}

export default ToxicTraitIndividual;