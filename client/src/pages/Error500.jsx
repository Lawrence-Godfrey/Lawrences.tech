import Error from './Error';

const Error404 = () => {
    return (
        <Error statusCode="500" title="Internal Server Error" detail="Something has gone horribly wrong." />
    );
};

export default Error404;
