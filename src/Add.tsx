import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Preloader } from './components/Preloader';
import useLocalStorage from './hooks/useLocalStorage';
import { Button } from './styledComponents/Button';
import { Error } from './styledComponents/Error';

const RadioBoxes = styled.div`
    display: flex;
    gap: 10px;
    margin: 4px 0;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 400px;
    resize: none;
`;

function Add() {
    const [verses, setVerses] = useLocalStorage('verses');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios
            .post(
                'http://localhost:3100/poems',
                { verses, category },
                { headers: { 'Content-`Type': 'application/json' } }
            )
            .then((res) => navigate('/'))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        axios
            .get('http://localhost:3100/categories')
            .then((res) => {
                setCategories(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(true);
                setError('Something went wrong, please try again later.');
            });
    }, []);

    const onChangeVerses = (event: any) => {
        setVerses(event.target.value);
    };

    if (isError) return <Error>{error}</Error>;
    if (isLoading) return <Preloader />;

    return (
        <div>
            <h1 className="darker-colour">Add Poem</h1>
            <form
                method="post"
                onSubmit={onSubmit}
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <Textarea value={verses} onChange={onChangeVerses}></Textarea>

                <RadioBoxes>
                    {categories.map((category: any) => (
                        <div key={categories.indexOf(category as never)}>
                            <input
                                type="radio"
                                name="category"
                                value={category._id}
                                id={category._id}
                                onChange={(e: any) => setCategory(category._id)}
                            />
                            <label htmlFor={category._id}>
                                {category.type}
                            </label>
                        </div>
                    ))}
                </RadioBoxes>
                <div>
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </div>
    );
}

export default Add;
