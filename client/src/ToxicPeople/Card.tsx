import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface PersonCardProps {
  name: string;
  image: string;
  description: string[];
}

export default function PersonCard(props: PersonCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          {props.description.map((trait, index) => (
            <Typography gutterBottom variant="body2" component="div">
            {trait}
            </Typography>
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
