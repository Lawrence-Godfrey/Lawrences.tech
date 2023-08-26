import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ScrollableTextArea, ScrollableDiv } from './Scrollables';

const ArticleEditor = ({ article, onSubmit }) => {
    const [markdown, setMarkdown] = useState('');

    return (
        <div className="flex">
            {/* Editor */}
            <div className="flex-1 p-4">
                <h2 className="text-xl mb-4">Editor</h2>
                <ScrollableTextArea
                    className="w-full h-[700px] p-4 rounded border-0 resize-none focus:ring-0"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                />
            </div>

            {/* Preview */}
            <div className="flex-1 p-4 rounded">
                <h2 className="text-xl mb-4">Preview</h2>
                <ScrollableDiv className="prose overflow-y-auto h-[700px] p-4 rounded">
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </ScrollableDiv>
            </div>
        </div>
    );
};


export default ArticleEditor;
