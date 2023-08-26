import React, { useEffect, useRef } from 'react';
import { preventScrollChaining } from '../utils';


const ScrollableDiv = ({ children, className }) => {
    const ref = useRef(null);

    useEffect(() => {
        ref.current.addEventListener('wheel', preventScrollChaining);
        return () => {
            ref.current.removeEventListener('wheel', preventScrollChaining);
        };
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};


const ScrollableTextArea = ({ value, onChange, className }) => {
    const ref = useRef(null);

    useEffect(() => {
        ref.current.addEventListener('wheel', preventScrollChaining);
        return () => {
            ref.current.removeEventListener('wheel', preventScrollChaining);
        };
    }, []);

    return (
        <textarea
            ref={ref}
            className={className}
            value={value}
            onChange={onChange}
        />
    );
};


export {
    ScrollableDiv,
    ScrollableTextArea,
};
