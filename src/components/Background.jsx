import React from 'react'
import styled from "styled-components"
import image from '../images/MIB-logo-w730.png'

const Background = styled.div`
    background-image: linear-gradient(to bottom right, black, black, black, blue, black);
    position: absolute;
    z-index: -1;
    height: calc(100% - 56px);
    width: 100%;
`;

const BackgroundImage = styled.img`
    position: absolute;
    max-width: 80%;
    width: 730px;
    bottom: 0;
    right: 0;
    z-index: -1;
`;

export default function LoginPage() {
    return (
        <>
            <Background />
            <BackgroundImage src={image} />
        </>
    )
}
