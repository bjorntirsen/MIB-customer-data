import styled from "styled-components"

const StyledButton = styled.button`
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};

    font-size: 1rem;
    margin: 1rem;
    padding: 0.25rem 1rem;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

export { StyledButton }
