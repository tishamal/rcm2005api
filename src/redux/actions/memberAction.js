import { ActionTypes } from "../constans/actionTypes"

export const setMembers = (members) =>{
    return {
        type:ActionTypes.SET_MEMBERS,
        payload:members,
    };
};

export const filterMembers = (filterdMembers) =>{
    return {
        type:ActionTypes.FILTER_MEMBERS,
        payload:filterdMembers,
    };
};
export const setMember = (member) =>{
    return {
        type:ActionTypes.SELECTED_MEMBER,
        payload:member,
    };
};

