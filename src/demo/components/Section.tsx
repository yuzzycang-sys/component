import React from 'react'

interface SectionProps {
  title: string
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{
        fontSize: 18,
        fontWeight: 600,
        color: '#141414',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: '1px solid #f0f0f0',
      }}>
        {title}
      </h2>
      {children}
    </div>
  )
}
