import Error from './Error';

const Error404 = () => {
    return (
        <Error statusCode="404" title="We can’t find that page" detail="The page you are looking for does not exist." />
    );
};

export default Error404;
