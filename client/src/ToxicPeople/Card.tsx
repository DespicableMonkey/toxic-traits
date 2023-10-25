import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './main.css'
interface PersonCardProps {
  name: string;
  image: string;
  description: string[];
}

export default function PersonCard(props: PersonCardProps) {
  return (
    <Card sx={{ width: "100%",  height: "100%"}}>
      <CardActionArea>
        <img className="cardphoto" src={props.image} alt={props.name}>
        </img>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            <div className="namehead">
              {props.name}
            </div>
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
