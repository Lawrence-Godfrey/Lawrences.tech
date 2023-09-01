import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MarkdownEditor from './MarkdownEditor';
import EditableArticleTitle from './EditableArticleTitle';
import { createArticle, updateArticle } from '../api/articles';
import { useAppContext } from '../context/appContext';

const ArticleEditor = ({ article }) => {
    const { user } = useAppContext();
    const navigate = useNavigate();

    const defaultTitle = 'Your Title';
    const defaultContent = 'Add your Markdown here\n\nFor example: \n**bold** \n*italic* \n`code`\n\n# Heading 1\n' +
        '## Heading 2\n### Heading 3\n\n- list item 1\n- list item 2\n- list item 3\n\n1. list item 1\n2. list ' +
        'item 2\n3. list item 3\n\n[link](https://www.google.com)\n\n![image](https://picsum.photos/200/300)';

    const [title, setTitle] = useState(article ? article.title : defaultTitle);
    const [content, setContent] = useState(article ? article.content : defaultContent);

    const handleTitleChange = useCallback((newTitle) => {
        setTitle(newTitle);
    }, []);

    const handleContentChange = useCallback((newContent) => {
        setContent(newContent);
    }, []);

    useEffect(() => {
        if (article) {
            setTitle(article.title);
            setContent(article.content);
        } else {
            setTitle(defaultTitle);
            setContent(defaultContent);
        }
    }, [article]);

    const onSubmit = useCallback(async () => {
        if (article) {
            await updateArticle(article.id, {
                title,
                content,
            });
        } else {
            article = await createArticle({
                title,
                content,
                author: user.id,
            });
        }
        window.location.href = `/articles/${article.id}`;
    }, [title, content, article, user]);

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
                    onClick={() => navigate(-1)}
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
