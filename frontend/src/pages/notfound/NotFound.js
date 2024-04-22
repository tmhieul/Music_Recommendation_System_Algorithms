import React from "react";
import { useNavigate } from "react-router-dom";

export function NotFound(){

    const navigate = useNavigate()

    function backToHome(){
        navigate('/');
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1 style={{color: 'var(--white-color)', fontSize: '36px', marginTop: '3rem'}}>Oops!</h1>
            <h3 style={{color: 'var(--gray-color)', fontSize: '24px'}}>Error 404: This page you are looking for might have been removed had its name </h3>
            <h3 style={{color: 'var(--gray-color)', fontSize: '24px'}}>changed or is temporarily unavailable</h3>
            <img src="https://i.imgur.com/Lxwibl2.png" style={{width: '30%', margin:'2rem auto'}} alt="This animate 404"/>
            <br/>
            <button className="btn-primary" onClick={backToHome}>Back to Home</button>
        </div>
    )
}