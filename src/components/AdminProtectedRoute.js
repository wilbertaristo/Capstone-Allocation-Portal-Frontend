import React from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom"

export const AdminProtectedRoute = ({component: Component, ...rest}) => {
    const storeAuthenticated = useSelector(state => state.auth.authenticated);
    const isAdmin = useSelector(state => state.auth.admin);

    return(
        <Route
            {...rest}
            render = {props => {
                if(storeAuthenticated && isAdmin){
                    return <Component {...props}/>
                } else {
                    return <Redirect to="/home"/>
                }
            }}
        />
    )
}
