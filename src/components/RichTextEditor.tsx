import React, { useEffect, useRef } from 'react';

interface RichTextEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  hasError?: boolean;
  disabled?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  id,
  value,
  onChange,
  placeholder,
  minHeight = '160px',
  hasError = false,
  disabled = false,
}) => (
  <RichTextEditorField
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    minHeight={minHeight}
    hasError={hasError}
    disabled={disabled}
  />
);

const RichTextEditorField: React.FC<RichTextEditorProps> = ({
  id,
  value,
  onChange,
  placeholder,
  minHeight = '160px',
  hasError = false,
  disabled = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const format = (command: string) => {
    if (disabled) return;
    editorRef.current?.focus();
    document.execCommand(command);
    onChange(editorRef.current?.innerHTML ?? '');
  };

  return (
    <div className={`overflow-hidden rounded-xl border bg-surface transition-colors ${
      hasError ? 'border-red-500' : 'border-line focus-within:border-brand-dark'
    }`}>
      <div className="flex items-center gap-1 border-b border-line px-3 py-2">
        {[
          ['bold', 'B'],
          ['italic', 'I'],
          ['underline', 'U'],
          ['insertUnorderedList', '• List'],
        ].map(([command, label]) => (
          <button
            key={command}
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => format(command)}
            disabled={disabled}
            className="rounded px-2 py-1 text-xs font-semibold text-brand-dark hover:bg-brand-dark/10 disabled:opacity-50"
            aria-label={label}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        id={id}
        contentEditable={!disabled}
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder}
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        style={{ minHeight }}
        className="rich-text-editor w-full resize-y overflow-y-auto px-4 py-3 text-sm text-ink outline-none empty:before:pointer-events-none empty:before:text-muted/60 empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
};
