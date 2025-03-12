import {  useState, useEffect } from "react";
import { AuthContext } from "./auth-context";
// import { useNavigate } from 'react-router-dom'
import { useQuery,  } from '@tanstack/react-query'
import {  authApi, getCurrentUserQueryOptions } from "@/services"
import { useReducer } from "react";


const initialState={
  currentUser:null
}
const stateReducer=(state,action)=>{
  switch (action.type) {
    case 'SET_USER':

return {
  ...state,
  currentUser:action.payload
}
    default: {
      throw new Error(`Unhandled action type`);
    }
}
}

export const AuthProvider=({children})=>{

    // const [user, setUser] = useState(null)

    const [state, dispatch] = useReducer(stateReducer, initialState)

    // const value = { state, dispatch }

const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery({queryKey:['authUser'],queryFn: authApi.getCurrentUser,
    retry: 1,
    select: (data) => data.data,
    onSuccess: (data) => {
      console.log(data)
      // stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });



// const hasRole = role => {
//   return user?.role==role || false
// }

// // Check if user is admin
//   const isAdmin = () => hasRole('admin');

//   // Check if user is uploader
//   const isUploader = () => hasRole('uploader');

//   // Check if user owns a resource
// const isOwner = resourceUserId => {
//   // eslint-disable-next-line no-undef
//   return user?._id === resourceUserId
// }

// // Check if user can edit a resource (admin or owner)
// const canEdit = resourceUserId => {
//   return isAdmin() || isOwner(resourceUserId)
// }
const value = {
  user,
  // setUser,
  state,
  dispatch,
  // isAuthenticated: !!user,
 loading: isLoading||isFetching,
  // isFetching,
  // hasRole,
  // isAdmin,
  // isUploader,
  // isOwner,
  // canEdit
}


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
