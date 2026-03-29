import React from 'react'

interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre style={{
      background: '#f6f8fa',
      border: '1px solid #e1e4e8',
      borderRadius: 6,
      padding: '16px 20px',
      fontSize: 13,
      lineHeight: 1.6,
      overflowX: 'auto',
      marginBottom: 24,
      color: '#24292e',
      fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
    }}>
      <code>{code.trim()}</code>
    </pre>
  )
}
