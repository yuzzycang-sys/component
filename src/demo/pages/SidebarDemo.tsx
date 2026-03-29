import React from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

export function SidebarDemo() {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Sidebar</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        左侧导航面板，支持多级展开/收起菜单，内置三级：平台 → 分析类目 → 媒体。
      </p>

      <Section title="基础用法">
        <DemoBox style={{ padding: 0, overflow: 'hidden', display: 'flex', minHeight: 280 }}>
          <Sidebar />
          <div style={{ flex: 1, padding: 24, color: '#8c8c8c', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            内容区域
          </div>
        </DemoBox>
        <CodeBlock code={`import { Sidebar } from 'cetus-ui'

export function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main>...</main>
    </div>
  )
}`} />
      </Section>

      <PropsTable props={[
        {
          name: '—',
          type: '—',
          required: false,
          description: 'Sidebar 目前内部管理展开/选中状态，菜单项硬编码（快手/腾讯/头条）。可按需扩展为受控组件。',
        },
      ]} />
    </div>
  )
}
