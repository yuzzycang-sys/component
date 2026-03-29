import React from 'react'
import { TopNav } from '../../components/TopNav'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

export function TopNavDemo() {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>TopNav</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        顶部导航栏，包含品牌 Logo、模块导航菜单、通知铃铛、用户头像等。
      </p>

      <Section title="基础用法">
        <DemoBox style={{ padding: 0, overflow: 'hidden' }}>
          <TopNav />
        </DemoBox>
        <CodeBlock code={`import { TopNav } from 'cetus-ui'

export function App() {
  return (
    <Layout>
      <TopNav />
      {/* content */}
    </Layout>
  )
}`} />
      </Section>

      <PropsTable props={[
        {
          name: '—',
          type: '—',
          required: false,
          description: 'TopNav 目前无外部 Props，所有数据（菜单项、用户名）均内部硬编码，可按需扩展为 props。',
        },
      ]} />
    </div>
  )
}
