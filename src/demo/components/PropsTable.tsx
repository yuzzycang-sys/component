import React from 'react'

interface PropDef {
  name: string
  type: string
  required?: boolean
  default?: string
  description: string
}

interface PropsTableProps {
  props: PropDef[]
}

export function PropsTable({ props }: PropsTableProps) {
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
        API
      </h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 13,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}>
        <thead>
          <tr style={{ background: '#fafafa' }}>
            {['参数', '说明', '类型', '必填', '默认值'].map(h => (
              <th key={h} style={{
                padding: '10px 16px',
                textAlign: 'left',
                fontWeight: 600,
                color: '#262626',
                borderBottom: '1px solid #f0f0f0',
                borderTop: '1px solid #f0f0f0',
                whiteSpace: 'nowrap',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr key={p.name} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0' }}>
                <code style={{
                  background: '#f0f0f0',
                  borderRadius: 3,
                  padding: '1px 6px',
                  fontSize: 12,
                  color: '#d32f2f',
                  fontFamily: "'SFMono-Regular', Consolas, monospace",
                }}>
                  {p.name}
                </code>
              </td>
              <td style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0', color: '#595959' }}>
                {p.description}
              </td>
              <td style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0' }}>
                <code style={{
                  background: '#f0f0f0',
                  borderRadius: 3,
                  padding: '1px 6px',
                  fontSize: 12,
                  color: '#0d47a1',
                  fontFamily: "'SFMono-Regular', Consolas, monospace",
                }}>
                  {p.type}
                </code>
              </td>
              <td style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0', color: p.required ? '#f5222d' : '#8c8c8c' }}>
                {p.required ? '是' : '否'}
              </td>
              <td style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0', color: '#8c8c8c' }}>
                {p.default || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
