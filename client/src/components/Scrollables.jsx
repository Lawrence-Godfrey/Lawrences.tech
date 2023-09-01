import React, { useEffect, useRef } from 'react';
import { preventScrollChaining } from '../utils';


const ScrollableDiv = React.forwardRef((props, ref) => {
    const { children, className } = props;

    useEffect(() => {
        if (!ref) {
            return;
        }
        ref.current.addEventListener('wheel', preventScrollChaining);
        return () => {
            if (!ref.current) {
                return;
            }
            ref.current.removeEventListener('wheel', preventScrollChaining);
        };
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
});

ScrollableDiv.displayName = 'ScrollableDiv';


const ScrollableTextArea = ({ value, onChange, onClick, className }) => {
    const ref = useRef(null);

    useEffect(() => {
        ref.current.addEventListener('wheel', preventScrollChaining);
        return () => {
            if (!ref.current) {
                return;
            }
            ref.current.removeEventListener('wheel', preventScrollChaining);
        };
    }, []);

    return (
        <textarea
            ref={ref}
            className={className}
            value={value}
            onChange={onChange}
            onClick={onClick}
        />
    );
};


export {
    ScrollableDiv,
    ScrollableTextArea,
};
