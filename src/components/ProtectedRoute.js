import React from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom"

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const storeAuthenticated = useSelector(state => state.auth.authenticated);

    return(
        <Route
            {...rest}
            render = {props => {
                if(storeAuthenticated){
                    return <Component {...props}/>
                } else {
                    return <Redirect to="/login"/>
                }
            }}
        />
    )
}
