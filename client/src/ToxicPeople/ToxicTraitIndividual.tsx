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
import {Modal, Box} from '@mui/material';

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };


      async function updateTrait(id:string, firstname:string, lastname:string, pictureUrl: string, traits: string[] ) {
        const res = await postData('toxic/update', {
          id: id,
          firstName: firstname,
          lastName: lastname,
          pictureUrl: pictureUrl,
          toxictraits: traits,
        });
          if(!(res.error)) {
            handleClose()
            getPerson(id)
          } else {
            alert("Error Updating Person" + res.error)
          }
        }

    function isvalidURL(str: string) {
      let url;
      
      try {
        url = new URL(str);
      } catch (_) {
        return false;  
      }
    
      return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleUpdate = () => {
      let firstname = (document.getElementById("firstname") as HTMLInputElement).value
      let lastname = (document.getElementById("lastname") as HTMLInputElement).value
      let pictureUrl = (document.getElementById("pictureUrl") as HTMLInputElement).value
      let toxictraits = (document.getElementById("toxictraits") as HTMLInputElement).value

      let splits = toxictraits.split("\n").filter(e => (e.trim().length > 0))
      

      if(!firstname) {
        alert("Please Enter a First Name");
        return;
      }
      if(!lastname) {
        alert("Please enter a last name");
        return;
      }
      if(!pictureUrl || !(isvalidURL(pictureUrl))) {
        alert("Please enter a valid picture URL");
        return;
      }
      if(splits.length < 3 ) {
        alert("Please enter at least 3 traits");
        return;
      }
      if(person) {
        updateTrait((person as Person)._id, firstname, lastname, pictureUrl, splits)
      }
    }

    function arrayToString(traits: string[]) {
      let res = "";

      traits.forEach((e) => {
        res += (e + "\n")
      })
      res = res.slice(0, -1)

      return res
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
                <div className="updatebutton" onClick={handleOpen}>
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
            <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
           <div className="modalwrapper">
              <div className="modalheader">Update Trait</div>
              <div className="feilds">
                <TextField required id="firstname" label="First Name" variant="outlined" className="inputF" defaultValue={(person as Person).firstName} /  >
                <TextField required id="lastname" label="Last Name" variant="outlined" className="inputF" defaultValue={(person as Person).lastName} /  >
                <TextField required id="pictureUrl" label="Picture URL" variant="outlined" className="inputF" defaultValue={(person as Person).pictureUrl} /  >
              </div>
              <div className="desc">
                
                  Write each toxic trait on a new line
                
              </div>
              <div className="feilds">
                <TextField multiline required id="toxictraits" label="Toxic Traits" variant="outlined" className="inputF" 
                defaultValue={arrayToString((person as Person).toxicTraits)}
                
                /  >
              </div>
              <div className="footer">
                <div className="cancelbutton" onClick={handleClose}>Cancel</div>
                <div className="confirmbutton" onClick={handleUpdate}>Update</div>
              </div>
           </div>
          </Box>
        </Modal>
        </div>
        }
        
    </div> 
    
  );
}

export default ToxicTraitIndividual;