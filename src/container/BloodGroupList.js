import React, {useEffect} from "react";
import axios from "axios";
import {Select, MenuItem, InputLabel} from '@material-ui/core';


const BloodGroupList = () => {

    return (
        <>
                <MenuItem value="All">
                  <em>All</em>
                </MenuItem>
                <MenuItem value='O positive'>O positive</MenuItem>
                <MenuItem value='B positive'>B positive</MenuItem>
                <MenuItem value='AB positive'>B positive</MenuItem>
            
       </>

    )
}

export default BloodGroupList;