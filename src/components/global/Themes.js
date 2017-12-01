import React from 'react';
import styled from 'styled-components';

export const P = ({children, ...rest}) => {return <StyledP {...rest}>{children}</StyledP>};
export const SECTION = ({children}) => {return <StyledSection>{children}</StyledSection>};

const StyledP = styled.p`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
`;

const StyledSection = styled.section`
    margin-bottom: 3rem;
`;