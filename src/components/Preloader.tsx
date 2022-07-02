import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled, { keyframes } from 'styled-components';

export function Preloader() {
    const rotate = keyframes`
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    `;

    const Icon = ({ className }: any) => (
        <p className={className}>
            <FontAwesomeIcon icon={faRotate} />
        </p>
    );

    const StyledIcon = styled(Icon)`
        padding: 20px 0;
        svg {
            width: 40px;
            height: 40px;
            animation: ${rotate} 1s linear infinite;
        }
    `;
    return <StyledIcon />;
}
