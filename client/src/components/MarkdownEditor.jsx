import React, { useEffect, useRef, useState } from 'react';
import { ScrollableDiv, ScrollableTextArea } from './Scrollables';
import ReactMarkdown from 'react-markdown';
import { populateLineToIdMap, scrollToLine } from '../utils';


const MarkdownEditor = ({ defaultText, onChange }) => {
    const [markdown, setMarkdown] = useState(defaultText || '');
    const previewRef = useRef(null);
    const lineToIdMap = useRef({});

    useEffect(() => {
        setMarkdown(defaultText);
        populateLineToIdMap(markdown, lineToIdMap);
    }, [markdown, defaultText]);

    const handleClick = (e) => {
        const textarea = e.target;
        const cursorPosition = textarea.selectionStart;
        const lines = textarea.value.substring(0, cursorPosition).split('\n');
        const lineNumber = lines.length;
        const targetId = lineToIdMap.current[lineNumber];
        scrollToLine(targetId);
    };

    const handleMarkdownChange = (e) => {
        const text = e.target.value;
        setMarkdown(text);
        populateLineToIdMap(text, lineToIdMap);

        const textarea = e.target;
        const cursorPosition = textarea.selectionStart;
        const lines = textarea.value.substring(0, cursorPosition).split('\n');
        const lineNumber = lines.length;
        const targetId = lineToIdMap.current[lineNumber];
        scrollToLine(targetId);

        onChange(text);
    };


    return (
        <div className="flex">
            <div className="flex mx-5 w-full">
                {/* Editor */}
                <div className="flex-1 p-4 rounded">
                    <div className="flex-1 p-4">
                        <h2 className="text-xl mb-6 text-center">Markdown</h2>
                        <ScrollableTextArea
                            className="w-full h-[600px] p-4 rounded resize-none focus:ring-0 hide-scrollbar
                        border border-gray-200"
                            value={markdown}
                            onChange={handleMarkdownChange}
                            onClick={handleClick}
                        />
                    </div>
                </div>

                {/* Preview */}
                <div className="flex-1 p-4 rounded">
                    <div className="flex-1 p-4">
                        <h2 className="text-xl mb-6 text-center">Preview</h2>
                        <ScrollableDiv ref={previewRef} className="prose overflow-y-auto h-[600px] p-4 rounded
                        hide-scrollbar">
                            {markdown.split('\n').map((line, i) => (
                                <div key={i} id={`line-${i + 1}`}>
                                    <ReactMarkdown>{line}</ReactMarkdown>
                                </div>
                            ))}
                        </ScrollableDiv>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;
