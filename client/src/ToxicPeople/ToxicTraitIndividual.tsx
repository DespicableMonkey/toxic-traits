import React from 'react';
import { TextField, Link, Typography, Grid  } from '@mui/material';
import PersonCard from './Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import { ToxicPerson, IToxicPerson } from '../../../server/src/models/toxicperson.model'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



function ToxicTraitIndividual() {

    const { firstName } = useParams<{ firstName: string }>();
    const { pictureUrl } = useParams<{ pictureUrl: string }>();

  
  return (
    <div>
        <h1> {firstName} </h1>
        <Grid container justifyContent="center">
                <Grid item justifyContent="center"  xs={12} sm={6} md={4}>
                  <CardActions>
                  <Button type="button" >
                <PersonCard name={`${firstName}`} image={`${pictureUrl}`}  />
                </Button>
                </CardActions>
                </Grid>
            
        </Grid>
        
    </div> 
    
  );
}

export default ToxicTraitIndividual;