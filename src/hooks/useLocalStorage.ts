import { useEffect, useState } from 'react';

function getSavedValue(key: string, initialValue: string | any) {
    const savedValue = JSON.parse(localStorage.getItem(key) || 'null');
    if (savedValue != 'null') {
        return savedValue;
    }

    if (initialValue instanceof Function) {
        return initialValue();
    }

    return initialValue;
}

export default function useLocalStorage(key: string, initialValue = '') {
    // do it only the first time
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);
    return [value, setValue];
}
