import React from 'react';

type Props = {
    name: string;
    contents: string;
};

export function GalleryImage({ contents, name }: Props) {
    return (
        <div>
            <img
                src={contents}
                alt={name}
                onClick={async () => {
                    const response = await fetch(contents);
                    const blob = await response.blob();
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob }),
                    ]);
                }}
            />
        </div>
    );
}
