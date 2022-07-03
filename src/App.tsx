import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --bg-colour: rgb(26, 29, 26);
        --primary-colour: hsl(168, 76%, 42%);
        --darker-colour: hsl(168, 76%, 32%);
        --lighter-colour: hsl(168, 76%, 62%);
    }

    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: var(--bg-colour);
        color: #fff;
    }
    
    a {
        text-decoration: none;
        color: var(--primary-colour);
    }
    a:hover {
        color: var(--darker-colour);
    }
    .primary-colour {
        color: var(--primary-colour);
    }
    .darker-colour {
        color: var(--darker-colour);
    }
    .lighter-colour {
        color: var(--lighter-colour);
    }

    textarea,
    input {
        border: 1px solid var(--primary-colour);
        background: none;
        outline: none;
        color: hsl(168, 76%, 82%);
    }

    textarea:hover,
    input:hover,
    textarea:focus,
    input:focus {
        border-color: var(--lighter-colour);
    }

    textarea, input {
        font-family: 'SF Mono', monospace !important;
    }
`;

const Body = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(26, 29, 26, 0.5);
    backdrop-filter: blur(10px);
    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.5);
`;

const AppName = styled.div`
    margin: 0.25em 0.5em;
    font-size: 2em;
`;

const Navigation = styled.div`
    display: flex;
    margin-left: auto;
    gap: 20px;
    margin-right: 1rem;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
`;

const ContentInner = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
`;

const BreathingSpace = styled.div`
    margin: 1rem 0.5rem;
`;

function App() {
    return (
        <Body>
            <GlobalStyles />
            <Header>
                <Link to="/">
                    <AppName>Lovestash</AppName>
                </Link>

                <Navigation>
                    <Link to="/add">
                        <BreathingSpace>Add poem</BreathingSpace>
                    </Link>
                    <Link to="/add-category">
                        <BreathingSpace>Add category</BreathingSpace>
                    </Link>
                    <Link to="/gallery">
                        <BreathingSpace>Gallery</BreathingSpace>
                    </Link>
                </Navigation>
            </Header>

            <Content>
                <ContentInner>
                    <Outlet />
                </ContentInner>
            </Content>
        </Body>
    );
}

export default App;
