import React, {useEffect} from "react";
import axios from "axios";
import Member from "./Member";
import { setMembers, filterMembers } from "../redux/actions/memberAction";
import { useDispatch, useSelector } from "react-redux";
import {Select, Button, MenuItem, TextField, InputLabel, Grid, FormControl, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttons: {
      margin: '20px',
  },
  heading: {
    margin: theme.spacing(1),
    fontSize: '30px',
    marginBottom: '40px',
    textAlign: 'left',
    fontFamily: 'Roboto',
},
}));


const Members = () => {
    const classes = useStyles();
    const dispatch =  useDispatch();
    const members = useSelector((state) => state.allMembers.members)
    const fetchMembers =async () =>{
        const response = await axios.get("https://l0qhsrip30.execute-api.us-east-1.amazonaws.com/Staging/api/item")
            .catch((err) => {
                console.log(err)
            });
        dispatch(setMembers(response.data.body))
        console.log(response.data.body)
    };

    useEffect(() => {
        fetchMembers();
    },[]);
    console.log('fetch')

    const filter =async () =>{  

      let city = document.getElementById('city.id').value;
      let fname = document.getElementById('fname.id').value;
      let lname = document.getElementById('lname.id').value;
      console.log(city);
      console.log(blood);
      console.log(profession);
      let filterd =members;
      if (fname !== '') {
        filterd = filterd.filter(u => u.Fname.toLowerCase().includes(fname.toLowerCase()));
      }
      if (lname !== '') {
        filterd = filterd.filter(u => u.Lname.toLowerCase().includes(lname.toLowerCase()));
      }
      if (city !== '') {
        filterd = filterd.filter(u => u.city.toLowerCase() === city.toLowerCase());
      }
      if (blood !== 'All' && blood !== '') {
         filterd = filterd.filter(u =>  u.blood === blood  );
      }
      if (profession !== 'All'&& profession !== '' ) {
        filterd = filterd.filter(u =>  u.profession === profession  );
      }
      dispatch(filterMembers(filterd))
    };
    const [blood, setBlood ] = React.useState('');
    const [profession, setProf ] = React.useState('');

    const handleChange = (event) => {
      setBlood(event.target.value);

    };
    const handleChangeProf = (event) => {
      setProf(event.target.value);

    };

    const bloodGrooups = members.map(b => b.blood);
    const uniqueBlood = bloodGrooups.filter((q, idx) => bloodGrooups.indexOf(q) === idx)

    const professions = members.map(b => b.profession);
    const uniqueprofessions = professions.filter((q, idx) => professions.indexOf(q) === idx)

    console.log(uniqueprofessions);

    return (
      <div>
          <h3 className={classes.heading}>2005 Api Welcome to the Brother Hood</h3>
          <div>
          
          <Grid container spacing={1} className="sections">
            <Grid item  md={2}>
              <TextField  variant="outlined" id="fname.id" label="First Name" style={{minWidth: 200}}/>
            </Grid>
            <Grid item  md={2}>
              <TextField  variant="outlined" id="lname.id" label="Last Name" style={{minWidth: 200}}/>
            </Grid>
            <Grid item  md={2}>
              <TextField  variant="outlined" id="city.id" label="City" style={{minWidth: 100}}/>
            </Grid>
            
            <Grid item  md={2}>
              <FormControl variant="outlined" style={{minWidth: 200}}>
                  <InputLabel id="bloodGroupLabel">Blood Group</InputLabel>
                  <Select
                    labelId="bloodGroupLabel"
                    id="blood.select.id"
                    value={blood}
                    onChange={handleChange}
                    label="Blood Group"
                  >
                    <MenuItem value="All">
                      <em>All</em>
                    </MenuItem>
                    {uniqueBlood.map(blood =>
                        <MenuItem value={blood}  >{blood} </MenuItem>
                    )}
                  </Select>
              </FormControl>
            </Grid>
            <Grid item  md={3}>
              <FormControl variant="outlined" style={{minWidth: 250}}>
                  <InputLabel id="demo-simple-select-outlined-label">Profession</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="profession.select.id"
                    value={profession}
                    onChange={handleChangeProf}
                    label="Profession"
                  >
                    <MenuItem value="All">
                      <em>All</em>
                    </MenuItem>
                    {uniqueprofessions.map(profession =>
                        <MenuItem value={profession}  >{profession} </MenuItem>
                    )}
                  </Select>
              </FormControl>
            </Grid>
            <Box className={classes.buttons} display="inline">
              <Button variant="contained" color="primary"  size="small" onClick={() => filter()}>Search</Button>
            </Box>
        </Grid>

        <br></br>
        <br></br>
      </div>
      <Grid container spacing={2} className="sections">
          <Member />
      </Grid>
      </div>

  )
}

export default Members;