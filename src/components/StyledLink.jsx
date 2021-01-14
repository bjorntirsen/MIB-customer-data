import styled from "styled-components"
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};

    display: inline-block;
    font-size: 1rem;
    margin: 1rem;
    padding: 0.25rem 1rem;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

export { StyledLink }