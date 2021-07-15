import React, {useEffect} from "react";
import axios from "axios";
import Member from "./Member";
import { setMembers } from "../redux/actions/memberAction";
import { useDispatch, useSelector } from "react-redux";
import CustomDataGridContainer from "./CustomGridContainer";


const MemberList = () => {

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
    console.log(members)

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'Fname',
          headerName: 'First Name',
          width: 200,
          editable: true,
        },
        {
          field: 'Lname',
          headerName: 'Last Name',
          width: 200,
          editable: true,
        },
        {  field: 'phone_number1',
          headerName: 'Mobile Number / WhatsappId',
          width: 150,
          editable: true,
        },
        {
          field: 'phone_number2',
          headerName: 'Mobile Number 2',
          width: 150,
          editable: true,
        },
        {
          field: 'country',
          headerName: 'Country',
          width: 150,
          editable: true,
        },
           {
          field: 'address',
          headerName: 'address',
          width: 200,
          editable: true,
        },
        {
            field: 'profession',
            headerName: 'Profession',
            width: 150,
            editable: true,
          },
          {
            field: 'profession_add',
            headerNacme: 'Profession Details',
            width: 250,
            editable: true,
          },
          {
            field: 'blood',
            headerName: 'Blood Group',
            width: 150,
            editable: true,
          },
          {
            field: 'comment',
            headerName: 'Comment',
            width: 300,
            editable: true,
          },
      ];
      
      const rows = members;
    return (
        <div>
            <h3>Contributions</h3>
            <CustomDataGridContainer rows={rows} columns={columns}/>
        </div>

    )
}

export default MemberList;