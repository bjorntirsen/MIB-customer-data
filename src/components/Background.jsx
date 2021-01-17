import React from 'react'
import styled from "styled-components"
import image from '../images/MIB-logo-w730.png'

const Background = styled.div`
    background-image: linear-gradient(to bottom right, black, black, black, blue, black);
    position: fixed;
    z-index: -1;
    min-height: calc(100% - 56px);
    height: 100%;
    width: 100%;
`;

const BackgroundImage = styled.img`
    position: fixed;
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
