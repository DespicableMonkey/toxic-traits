import React from 'react';
import { TextField, Link, Typography, Grid  } from '@mui/material';
import PersonCard from './Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import { ToxicPerson, IToxicPerson } from '../../../server/src/models/toxicperson.model'
import { useNavigate } from "react-router-dom";

interface Person {
    _id: string;
    firstName: string;
    lastName: string;
    pictureUrl: string;
    toxicTraits: [string];
}


  const people : Person[] =  [
    {
        _id: '1',
        firstName: 'Kylie',
        lastName: 'Chang',
        pictureUrl: 'https://richmondmagazine.com/downloads/39615/download/Eat%26Drink_Ingredient_Corn1_GETTYIMAGES_rp0723.jpg?cb=226f9397bea90b2573b21c6ed73c69a6', 
        toxicTraits: ['selfish'],
      },
      {
        _id: '2',
        firstName: 'Carly',
        lastName: 'Googel',
        pictureUrl: 'https://richmondmagazine.com/downloads/39615/download/Eat%26Drink_Ingredient_Corn1_GETTYIMAGES_rp0723.jpg?cb=226f9397bea90b2573b21c6ed73c69a6', 
        toxicTraits: ['manipulative'],
      },
      {
        _id: '3',
        firstName: 'Pulkith',
        lastName: 'Paruchuri',
        pictureUrl: 'https://richmondmagazine.com/downloads/39615/download/Eat%26Drink_Ingredient_Corn1_GETTYIMAGES_rp0723.jpg?cb=226f9397bea90b2573b21c6ed73c69a6',
        toxicTraits: ['arrogant'],
      }
  ]

function ToxicTraitsPage() {

    const navigate = useNavigate();
  
    function handleClick() {
      navigate("/ToxicTraitIndividual");
    }
  
  return (
    <div>
        <h1> toxic traits </h1>
        <Grid item>
        <TextField 
          variant="outlined" 
          fullWidth
          placeholder="Search for people"
        />
      </Grid>
        <Grid container spacing={3}>
            {people.map((person, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <CardActions>
                  <Button type="button" onClick={handleClick}>
                <PersonCard name={person.firstName} image={person.pictureUrl}  />
                </Button>
                </CardActions>
                </Grid>
            ))}
        </Grid>
    </div>
    
  );
}

export default ToxicTraitsPage;
