import React from 'react'
import { Outlet } from "react-router-dom"


export default function Host() {
    return (
        <>
            <h1>Host Dashboard here</h1>
            <Outlet />
        </>
        
    )
}