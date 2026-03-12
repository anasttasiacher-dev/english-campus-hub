import React from 'react';

interface Props {
  content: string;
}

export default function SimpleMarkdown({ content }: Props) {
  // Very simple markdown renderer
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableKey = 0;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const headers = tableRows[0];
    const body = tableRows.slice(2); // skip separator
    elements.push(
      <div key={`table-${tableKey++}`} className="overflow-x-auto my-4">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-muted/50">
              {headers.map((h, i) => <th key={i} className="px-3 py-2 text-left font-semibold text-foreground border-b border-border">{h.trim()}</th>)}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-b border-border last:border-0">
                {row.map((cell, ci) => <td key={ci} className="px-3 py-2 text-muted-foreground">{renderInline(cell.trim())}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
  };

  const renderInline = (text: string): React.ReactNode => {
    // Bold
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    let key = 0;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
      parts.push(<strong key={key++} className="font-semibold text-foreground">{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    if (parts.length === 0) return text;
    return <>{parts}</>;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.includes('|') && line.trim().startsWith('|')) {
      if (!inTable) inTable = true;
      const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (cells.every(c => /^[\s-:]+$/.test(c))) {
        tableRows.push(cells);
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
      inTable = false;
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-heading text-xl font-bold text-foreground mt-6 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-heading text-lg font-semibold text-foreground mt-5 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('- ')) {
      elements.push(<li key={i} className="text-sm text-muted-foreground ml-4 mb-1 list-disc">{renderInline(line.slice(2))}</li>);
    } else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, '');
      elements.push(<li key={i} className="text-sm text-muted-foreground ml-4 mb-1 list-decimal">{renderInline(text)}</li>);
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-sm text-muted-foreground mb-1">{renderInline(line)}</p>);
    }
  }
  if (inTable) flushTable();

  return <div>{elements}</div>;
}
