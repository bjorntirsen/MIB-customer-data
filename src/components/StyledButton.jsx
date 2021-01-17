import styled from "styled-components"

const StyledButton = styled.button`
    background: ${props => props.primary ? "#343A40" : "white"};
    color: ${props => props.primary ? "white" : "#343A40"};
    border-color: ${props => props.primary ? "white" : "#343A40"};

    font-size: 1rem;
    margin: 0.3rem;
    padding: 0.25rem 1rem;
    border: 2px solid;
    border-radius: 100px;

    &:hover, &:focus, &:active {
        background: ${props => props.primary ? "white" : "#343A40"};
        color: ${props => props.primary ? "#343A40" : "white"};
        border-style: dashed;
        text-decoration: none;
        outline: none;
    }

`;

export { StyledButton }
