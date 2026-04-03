import React, { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  onChange: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
};

const HEADING_OPTIONS = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

export const RichTextEditor: React.FC<Props> = ({ value, onChange, onImageUpload }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);

  useEffect(() => {
    if (!isCodeView && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '<p></p>';
    }
  }, [value, isCodeView]);

  const emitChange = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  const run = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    emitChange();
  };

  const handleImageInsert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let imageUrl = '';
    if (onImageUpload) {
      imageUrl = await onImageUpload(file);
    } else {
      imageUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.readAsDataURL(file);
      });
    }

    if (imageUrl) run('insertImage', imageUrl);
    e.target.value = '';
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <select
          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-sm"
          defaultValue="P"
          onChange={(e) => run('formatBlock', e.target.value)}
        >
          {HEADING_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <button type="button" onClick={() => run('bold')} className="px-2 py-1 text-sm border rounded">B</button>
        <button type="button" onClick={() => run('italic')} className="px-2 py-1 text-sm border rounded italic">I</button>
        <button type="button" onClick={() => run('underline')} className="px-2 py-1 text-sm border rounded underline">U</button>
        <button type="button" onClick={() => run('insertUnorderedList')} className="px-2 py-1 text-sm border rounded">• List</button>
        <button type="button" onClick={() => run('insertOrderedList')} className="px-2 py-1 text-sm border rounded">1. List</button>
        <button type="button" onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) run('createLink', url);
        }} className="px-2 py-1 text-sm border rounded">Link</button>
        <button type="button" onClick={() => run('justifyLeft')} className="px-2 py-1 text-sm border rounded">Left</button>
        <button type="button" onClick={() => run('justifyCenter')} className="px-2 py-1 text-sm border rounded">Center</button>
        <button type="button" onClick={() => run('justifyRight')} className="px-2 py-1 text-sm border rounded">Right</button>
        <label className="px-2 py-1 text-sm border rounded cursor-pointer">
          Image
          <input type="file" accept="image/*" className="hidden" onChange={handleImageInsert} />
        </label>
        <button type="button" onClick={() => setIsCodeView((prev) => !prev)} className="px-2 py-1 text-sm border rounded">
          {isCodeView ? 'Visual' : 'HTML'}
        </button>
      </div>

      {isCodeView ? (
        <textarea
          rows={14}
          className="w-full p-3 dark:bg-gray-800 outline-none font-mono text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={emitChange}
          className="min-h-[320px] p-3 dark:bg-gray-800 outline-none leading-relaxed"
          suppressContentEditableWarning
        />
      )}
    </div>
  );
};
