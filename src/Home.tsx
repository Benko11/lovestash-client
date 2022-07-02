import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Preloader } from './components/Preloader';
import { Button } from './styledComponents/Button';
import { Category } from './styledComponents/Category';
import { CircularButton } from './styledComponents/CircularButton';
import { DayMarker } from './styledComponents/DayMarker';
import { Error } from './styledComponents/Error';
import { NightMarker } from './styledComponents/NightMarker';

const Poem = styled.div`
    margin-bottom: 30px;
`;

const PoemVerses = ({ className, children }: any) => (
    <div className={className}>{children}</div>
);

const StyledPoemVerses = styled(PoemVerses)`
    white-space: pre;
    margin: 8px 0;
    font-family: 'SF Mono', monospace;
    cursor: pointer;

    &.sent {
        text-decoration: line-through;
    }
`;

const Statistics = styled.div`
    position: fixed;
    bottom: 50px;
    left: 50px;
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.3);
    padding: 0.5rem 1rem;
`;

const StatisticsLine = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SideMenu = styled.div`
    position: fixed;
    right: 40px;
`;

export default function Home() {
    const [poems, setPoems] = useState([]);
    const [displayedPoems, setDisplayedPoems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [toggleSendStates, setToggleSendStates] = useState<boolean[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [onlyUnsent, setOnlyUnset] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:3100/poems')
            .then((res) => {
                const length: number = res.data.length;
                setToggleSendStates(Array(length).fill(false));
                setPoems(res.data);
                setDisplayedPoems(res.data);

                axios
                    .get('http://localhost:3100/categories')
                    .then((res) => {
                        setCategories(res.data);
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        setIsError(true);
                        setError(
                            'Something went wrong, please try again later'
                        );
                        console.error(err);
                    });
            })
            .catch((err) => {
                setIsError(true);
                setError('Something went wrong, please try again later');
                console.error(err);
            });
    }, []);

    useEffect(() => {
        const card: any = {};

        categories.forEach((c: any) => {
            const filteredPoems = poems.filter(
                (p: any) => p.category === c._id
            ).length;
            card[c.type] = filteredPoems;
        });
    }, [poems, categories]);

    const handleToggleSend = (poemId: string) => {
        const poem = poems.filter((p: any) => p._id === poemId)?.[0];
        const updating = [...toggleSendStates];

        updating[poems.indexOf(poem as never)] = true;
        setToggleSendStates(updating);

        axios
            .patch(`http://localhost:3100/poems/${poemId}/toggle`)
            .then((res) => {
                const clone = [...toggleSendStates];
                clone[poems.indexOf(poem as never)] = false;
                setToggleSendStates(clone);

                const clonePoems = [...poems];
                const select: any = clonePoems.filter(
                    (p: any) => p._id === poemId
                )[0];
                select.completed = !select.completed;
                setPoems(clonePoems);
            });
    };

    const printStatistics = () => {
        const dayNumber = displayedPoems.filter(
            (p) => (p as any).category === '62bcd37ff31d5349e17d8855'
        ).length;
        const nightNumber = displayedPoems.filter(
            (p) => (p as any).category === '62bcd389f31d5349e17d885b'
        ).length;
        return (
            <>
                <StatisticsLine>
                    <DayMarker>{dayNumber}</DayMarker>
                    DAY
                </StatisticsLine>
                <StatisticsLine>
                    <NightMarker>{nightNumber}</NightMarker>
                    NIGHT
                </StatisticsLine>
            </>
        );
    };

    useEffect(() => {
        if (onlyUnsent) {
            const filtered = poems.filter((p) => !(p as any).completed);
            setDisplayedPoems(filtered);
        } else {
            setDisplayedPoems([...poems]);
        }
    }, [onlyUnsent, poems]);

    if (isError) return <Error>{error}</Error>;

    if (isLoading) return <Preloader />;

    return (
        <div style={{ marginBottom: '4rem' }}>
            <Statistics>{printStatistics()}</Statistics>

            <SideMenu>
                <CircularButton
                    onClick={() => setOnlyUnset((prev) => !prev)}
                    className={onlyUnsent ? 'active' : ''}
                >
                    <FontAwesomeIcon icon={faEnvelopeOpenText} />
                </CircularButton>
            </SideMenu>

            {displayedPoems.map((poem: any) => (
                <Poem key={poems.indexOf(poem as never)}>
                    <StyledPoemVerses
                        onClick={() => {
                            console.log('click');
                            navigator.clipboard.writeText(poem.verses);
                        }}
                        className={poem.completed ? 'sent' : ''}
                    >
                        {poem.verses}
                    </StyledPoemVerses>

                    <Category>
                        <strong>Category: </strong>

                        {categories.length > 0 &&
                            (categories as any[]).filter(
                                (c: any) => c._id === poem.category
                            )[0].type}
                    </Category>

                    <Button
                        onClick={() => handleToggleSend(poem._id)}
                        disabled={
                            toggleSendStates[poems.indexOf(poem as never)]
                        }
                    >
                        Toggle Send
                    </Button>
                </Poem>
            ))}
        </div>
    );
}
