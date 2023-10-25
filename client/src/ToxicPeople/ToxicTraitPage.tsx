import { TextField, Link, Typography  } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, InputBase } from '@mui/material';
import PersonCard from './Card';
import { getData, postData } from '../util/api';
import Modal from '@mui/material/Modal';
import './main.css'
interface Person {
    _id: string;
    firstName: string;
    lastName: string;
    pictureUrl: string;
    toxicTraits: string[];
}

function ToxicTraitsPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [people, setPeople] = useState([]);
  
    function handleClick(id: string) {
      navigate(`/ToxicTraitIndividual/${id}`);
    }
    
    async function getAllPeople() {
      const res = await getData('toxic/get-all')
      console.log(res.data)
      if(!res.error) {
        //so the 'lol' thing works
        let tmp = res.data[1];
        res.data[1] = res.data[0]
        res.data[0] = tmp
        setPeople(res.data)
      }
    }


  const filteredPeople = people.filter(person => {
      let convPerson : Person = person
      return (
        convPerson.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convPerson.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convPerson.toxicTraits.some(trait => trait.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
 
    async function verifyAccount() {
      const res = await postData('toxic/get-trait-from-name', {
        firstName: "HI2",
        lastName: "HI",
      })

      if(!(res.error) && res.data) {
        const res2 = await postData('toxic/delete', {
          id: res.data._id
        })
        console.log("2" + res2.error)
        console.log("3" + res2.data)
      } else {
        console.log("NO DATA: " + res.error)
      }
    }

    async function createTrait(firstname:string, lastname:string, pictureUrl: string, traits: string[] ) {

      // const id_res = await postData('toxic/get-trait-from-name', {
      //   firstName: f,
      //   lastName: l,
      // })

      // if(id_res.data) {
      //   const del_res = await postData('toxic/delete', {
      //     id: id_res.data._id
      //   })
      // }
      // console.log("STARTING")
      const res = await postData('toxic/create', {
        firstName: firstname,
        lastName: lastname,
        pictureUrl: pictureUrl,
        toxictraits: traits,
      });
      if (res.error) {
        console.log("ERROR")
        console.log(res.error.message)
        // console.log(res)
        // throw Error(res.error.message);
      }
      else {
        // console.log(JSON.stringify(res.data))
        console.log("SUCCESS")
        console.log(res.data)

      }
    }

    async function deletePerson(firstname:string, lastname: string) {

      const id_res = await postData('toxic/get-trait-from-name', {
        firstName: firstname,
        lastName: lastname,
      })

      if(id_res.data) {
        const del_res = await postData('toxic/delete', {
          id: id_res.data._id
        })
      }
    }
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
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
    const style2 = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    

    useEffect(()=>{
      
      // createTrait("Carly", "Googel", "https://richmondmagazine.com/downloads/39615/download/Eat%26Drink_Ingredient_Corn1_GETTYIMAGES_rp0723.jpg?cb=226f9397bea90b2573b21c6ed73c69a6",
        // ["sleeps at 10pm", "eats rx bars", "last name is googel"]
      // )
      // deletePerson("HI2", "HI")
      getAllPeople()
    }, [])

    async function createTrait2(firstname:string, lastname:string, pictureUrl: string, traits: string[] ) {
      const res = await postData('toxic/create', {
        firstName: firstname,
        lastName: lastname,
        pictureUrl: pictureUrl,
        toxictraits: traits,
      });
      if (res.error) {
        alert("Error Creating New Person: " + res.error)
      }
      else {
        handleClose()
        handleOpen2()
        getAllPeople()
      }
    }

    const handleSubmit = () => {
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
      if(!pictureUrl) {
        alert("Please enter a picture");
        return;
      }
      if(splits.length < 3 ) {
        alert("Please enter at least 3 traits");
        return;
      }
      createTrait2(firstname, lastname, pictureUrl, splits)
    }

  
  
  return (
    <div style={{ padding: '50px' }} className="overall">
        <div className="header">
          <h1> corny toxic traits! </h1>  
          <div className="newbutton" onClick={handleOpen}>Create New</div>
        </div>
        <Box sx={{ display: 'flex', mb: 2, boxShadow: 1, borderRadius: 2, p: 1, color: 'black', backgroundColor: 'white'}}>
          <SearchIcon sx={{ marginRight: 1 }} />
          <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
      </Box>
        <Grid container spacing={3}>
            {filteredPeople.map((person : Person, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  
                    <Button type="button" onClick={() => handleClick(person._id)} style={{width: "100%", height: "100%"}}>
                      <PersonCard name={person.firstName} image={person.pictureUrl} description={person.toxicTraits} />
                    </Button>
                  
                </Grid>
            ))}
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
           <div className="modalwrapper">
              <div className="modalheader">Create a New Toxic Trait</div>
              <div className="feilds">
                <TextField required id="firstname" label="First Name" variant="outlined" className="inputF" /  >
                <TextField required id="lastname" label="Last Name" variant="outlined" className="inputF" /  >
                <TextField required id="pictureUrl" label="Picture URL" variant="outlined" className="inputF"  /  >
              </div>
              <div className="desc">
                
                  Write each toxic trait on a new line
                
              </div>
              <div className="feilds">
                <TextField multiline required id="toxictraits" label="Toxic Traits" variant="outlined" className="inputF" /  >
              </div>
              <div className="footer">
                <div className="cancelbutton" onClick={handleClose}>Cancel</div>
                <div className="confirmbutton" onClick={handleSubmit}>Create</div>
              </div>
           </div>
          </Box>
        </Modal>

        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <div className="modalheader">Successfully created new Toxic Trait</div>
          </Box>
        </Modal>
    </div>
    
  );
}

export default ToxicTraitsPage;
