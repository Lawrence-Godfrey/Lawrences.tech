import MarkdownEditor from './MarkdownEditor';
import EditableArticleTitle from './EditableArticleTitle';
import { useCallback, useState } from 'react';
import { updateArticle } from '../api/articles';

const ArticleEditor = ({ article }) => {
    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);

    const handleTitleChange = useCallback((newTitle) => {
        setTitle(newTitle);
    }, []);

    const handleContentChange = useCallback((newContent) => {
        setContent(newContent);
    }, []);

    const onSubmit = async () => {
        console.log(`Submitting ${title} and ${content}`);
        await updateArticle(article.id, {
            title,
            content,
        });
        window.location.href = `/articles/${article.id}`;
    };

    return (
        <div className="relative">
            <div className="flex justify-end items-start mt-8 mr-24">
                <button
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900
                focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700
                focus:z-10 focus:ring-4 focus:ring-gray-200"
                    onClick={onSubmit}
                >
                Publish
                </button>
                <button
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                    onClick={() => window.location.href = `/articles/${article.id}`}
                >
                Cancel
                </button>
            </div>

            <EditableArticleTitle defaultText={title} onChange={handleTitleChange}/>
            <div className="h-4"></div>
            <MarkdownEditor defaultText={content} onChange={handleContentChange}/>
        </div>
    );
};


export default ArticleEditor;
