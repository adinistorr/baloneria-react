import React from 'react'

export default function Header(props) {
    const backgroundImage = `url('${ props.backgroundImage }')`
    return (
        <>
            <div className="background-full-bg" style={{backgroundImage: backgroundImage}}></div>
            <div className="wrapper-full-bg">
                <h1 className="text-center">{props.title}</h1>
            </div>
        </>
    )
}