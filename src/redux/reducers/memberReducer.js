import { ActionTypes } from "../constans/actionTypes";

const initialState = {
    members : [ {
        id:[]
    }
        
    ],
    filterdMembers : [ 
    ]
}
export const memberReducer = (state = initialState ,{type,payload}) => {
    switch (type) {
        case ActionTypes.SET_MEMBERS:
            return {...state,members:payload};
        case ActionTypes.FILTER_MEMBERS:
                return {...state,filterdMembers:payload};
    
        default:
            return state;
    }
}

export default memberReducer;