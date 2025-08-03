import mongoose from 'mongoose';

const buildMongoURL = () => {
    const {
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_HOST,
        MONGO_DB,
        MONGO_REPLICA_SET
    } = process.env;
    
    // If individual components are available, build the URL
    if (MONGO_USER && MONGO_PASSWORD && MONGO_HOST && MONGO_DB) {
        return `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?replicaSet=${MONGO_REPLICA_SET}&ssl=false`;
    }
    
    // Fallback to MONGO_URL if individual components aren't available
    return process.env.MONGO_URL;
};

const connectDB = (url) => {
    const mongoUrl = url || buildMongoURL();
    return mongoose.connect(mongoUrl);
}

export default connectDB;