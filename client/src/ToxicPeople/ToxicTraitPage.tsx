import React from 'react';
import { Grid } from '@mui/material';
import PersonCard from './Card';
import { ToxicPerson, IToxicPerson } from '../../../server/src/models/toxicperson.model'

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
  return (
    <div>
        <h1> hello </h1>
        <Grid container spacing={3}>
            {people.map((person, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                <PersonCard name={person.firstName} image={person.pictureUrl} />
                </Grid>
            ))}
        </Grid>
    </div>
    
  );
}

export default ToxicTraitsPage;
