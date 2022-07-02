import styled from 'styled-components';
import { Button } from './Button';

export const CircularButton = styled(Button)`
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &.active {
        background: var(--primary-colour);
        color: var(--bg-colour);
    }
`;
