import styled from 'styled-components';

export const Button = styled.button`
    background: none;
    border: 1px solid var(--lighter-colour);
    color: var(--lighter-colour);
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background: var(--lighter-colour);
        color: var(--bg-colour);
    }

    &:disabled {
        opacity: 0.5;
        background: #666 !important;
        color: #666 !important;
    }
`;
