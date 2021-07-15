import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Grid, Paper, Card, CardContent, CardMedia, Box} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
 
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
 
  root: {
    display: 'flex',
    minHeight:'120px',
    width:'600px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 180,
  },
  contentBottom:{
    textAlign: "bottom",
  }
}));


const Member = () => {
    const classes = useStyles();
    const members = useSelector((state) => state.allMembers.filterdMembers)
    const renderList =  members.map((member) => {
    const {id,Fname,Lname,city,phone_number1,phone_number2,country,blood,profession,profession_add} = member;
    const imgSrc = 'https://2005-rcm-photos.s3.amazonaws.com/'+id+'.jpeg';   
    return (  
        <Grid item md={6} className="sections">
            <Card className={classes.root}>
                <CardMedia
                    className={classes.cover}
                    image={imgSrc}
                    title={Fname+' '+Lname}
                />

                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                    {Fname} {Lname}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <b>{profession} {profession_add}</b>
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Whatsapp Id {phone_number1}
                    </Typography>
                    <Typography color="default">
                        Lives in - {city}  {country}
                    </Typography>
                    <Typography color="default">
                        {blood}
                    </Typography>
                    </CardContent>
                </div>
            </Card>
            <br></br>
        </Grid>
            
        )
        
    });
    return (
        <>{renderList}</>
    );
    
}

export default Member;