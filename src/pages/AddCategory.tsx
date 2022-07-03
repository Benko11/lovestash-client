import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../styledComponents/Button';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
function AddCategory() {
    const [category, setCategory] = useState('');
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios
            .post(
                'http://localhost:3100/categories',
                { type: category },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((res) => setCategory(''))
            .catch((err) => console.error(err));
    };

    const onChangeCategory = (event: any) => {
        setCategory(event.target.value);
    };

    return (
        <div>
            <h1 className="darker-colour">Add category</h1>
            <Form method="post" onSubmit={onSubmit}>
                <input
                    type="text"
                    value={category}
                    onChange={onChangeCategory}
                />
                <div>
                    <Button type="submit">Add</Button>
                </div>
            </Form>
        </div>
    );
}

export default AddCategory;
