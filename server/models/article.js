import mongoose from 'mongoose';


const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{
    timestamps: true
});


export default mongoose.model('Article', ArticleSchema);
