import React from 'react'

interface DemoBoxProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export function DemoBox({ children, style }: DemoBoxProps) {
  return (
    <div style={{
      border: '1px solid #e8e8e8',
      borderRadius: 8,
      padding: 24,
      background: '#fafafa',
      marginBottom: 16,
      ...style,
    }}>
      {children}
    </div>
  )
}
