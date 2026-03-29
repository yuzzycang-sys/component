import React, { useState } from 'react'
import { Pagination } from '../../components/Pagination'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

export function PaginationDemo() {
  const [page1, setPage1] = useState(1)
  const [pageSize1, setPageSize1] = useState(10)

  const [page2, setPage2] = useState(3)
  const [pageSize2, setPageSize2] = useState(20)

  const [page3, setPage3] = useState(1)
  const [pageSize3, setPageSize3] = useState(50)

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Pagination</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        分页组件，基于 Ant Design Pagination 封装，支持总条数展示、每页条数切换，右对齐布局。
      </p>

      <Section title="基础用法（共 235 条）">
        <DemoBox style={{ padding: 0, background: '#fff' }}>
          <Pagination
            total={235}
            page={page1}
            pageSize={pageSize1}
            onPageChange={setPage1}
            onPageSizeChange={size => { setPageSize1(size); setPage1(1) }}
          />
        </DemoBox>
        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          当前第 {page1} 页，每页 {pageSize1} 条
        </div>
        <CodeBlock code={`import { Pagination } from 'cetus-ui'

const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)

<Pagination
  total={235}
  page={page}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={size => { setPageSize(size); setPage(1) }}
/>`} />
      </Section>

      <Section title="大数据量（共 12,480 条）">
        <DemoBox style={{ padding: 0, background: '#fff' }}>
          <Pagination
            total={12480}
            page={page2}
            pageSize={pageSize2}
            onPageChange={setPage2}
            onPageSizeChange={size => { setPageSize2(size); setPage2(1) }}
          />
        </DemoBox>
        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          当前第 {page2} 页，每页 {pageSize2} 条
        </div>
      </Section>

      <Section title="超大分页（共 1,000,000 条）">
        <DemoBox style={{ padding: 0, background: '#fff' }}>
          <Pagination
            total={1000000}
            page={page3}
            pageSize={pageSize3}
            onPageChange={setPage3}
            onPageSizeChange={size => { setPageSize3(size); setPage3(1) }}
          />
        </DemoBox>
        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          当前第 {page3} 页，每页 {pageSize3} 条，共 {Math.ceil(1000000 / pageSize3).toLocaleString('zh-CN')} 页
        </div>
      </Section>

      <PropsTable props={[
        { name: 'total', type: 'number', required: true, description: '总条数' },
        { name: 'page', type: 'number', required: true, description: '当前页码（从 1 开始）' },
        { name: 'pageSize', type: 'number', required: true, description: '每页条数' },
        { name: 'onPageChange', type: '(p: number) => void', required: true, description: '页码变化回调' },
        { name: 'onPageSizeChange', type: '(s: number) => void', required: true, description: '每页条数变化回调' },
      ]} />
    </div>
  )
}
