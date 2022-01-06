import React from 'react'

export default function Footer({foot}) {
    return (
            <>
            
            <footer id={`footer${foot}`} className="w-100 my-4 text-center footer mt-auto" style={{color :  "#131313e8 !important", marginBottom: "0px !important"}} >
                <p> 2021 Tejas © All Rights Reserved </p>
            </footer>
    
            </>
        );
    
}
