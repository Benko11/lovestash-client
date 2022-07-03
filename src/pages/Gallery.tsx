import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GalleryImage } from '../components/GalleryImage';
import { Preloader } from '../components/Preloader';
import { Error } from '../styledComponents/Error';

const UploadZone = styled.label`
    width: 100%;
    height: 300px;
    border: 2px solid var(--primary-colour);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--darker-colour);

    &.active {
        border-style: dashed;
        background: hsla(168, 76%, 32%, 10%);
        color: hsla(168, 76%, 32%, 0%);
    }
`;

const GalleryContainer = styled.div`
    margin: 2rem 0 10rem 0;
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 1rem;
`;

export function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [classes, setClasses] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:3100/gallery`)
            .then((res) => {
                setGallery(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsError(true);
            });
    }, []);

    const onUpload = function (e: React.DragEvent) {
        e.preventDefault();

        const fileObject = { ...e.dataTransfer.files };
        const reader = new FileReader();
        reader.onload = function () {
            axios
                .post(
                    'http://localhost:3100/gallery',
                    {
                        contents: reader.result,
                        size: fileObject?.[0].size,
                        name: fileObject?.[0].name,
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                )
                .then((res) => {
                    const cloneGallery = [...gallery];
                    cloneGallery.push(res.data as never);
                    setGallery([...cloneGallery]);
                })
                .catch((err) => console.error(err));
        };
        reader.readAsDataURL(fileObject?.[0]);

        setClasses([]);
    };

    const preventDefaults = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const displayGallery = () => {
        if (isError)
            return <Error>Something went wrong, please try again later.</Error>;

        if (isLoading) return <Preloader />;

        const display: JSX.Element[] = [];
        let i = 0;
        gallery.map((image: any) => {
            display.push(<GalleryImage {...image} key={i++} />);
        });

        return display;
    };

    return (
        <div>
            <UploadZone
                htmlFor="hello"
                onDragEnter={preventDefaults}
                onDragStart={preventDefaults}
                onDragEnd={preventDefaults}
                onDragLeave={preventDefaults}
                onDrag={preventDefaults}
                onDropCapture={onUpload}
                onDragOver={(e) => {
                    e.preventDefault();
                    setClasses(['active']);
                }}
                className={classes.join(' ')}
            >
                <form method="post">
                    <input
                        type="file"
                        id="hello"
                        accept="image/*"
                        style={{ display: 'none ' }}
                    />
                    Drag an image here to add it to your Lovestash
                </form>
            </UploadZone>

            <GalleryContainer>{displayGallery()}</GalleryContainer>
        </div>
    );
}
