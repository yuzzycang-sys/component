import React, { useState } from 'react'
import { QuickTagBar } from '../../components/QuickTagBar'
import type { QuickTag } from '../../components/QuickTagBar'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const INITIAL_TAGS: QuickTag[] = [
  {
    id: '1',
    label: '腾讯-华东',
    color: 'blue',
    active: true,
    owner: '张磊',
    updatedAt: '2026-03-01',
    mainChannels: ['大咖-腾讯'],
    subChannels: [],
    vis: 'private',
    authUsers: [],
  },
  {
    id: '2',
    label: '字节-游戏A',
    color: 'green',
    active: false,
    owner: '李明',
    updatedAt: '2026-03-10',
    mainChannels: ['大咖-头条'],
    subChannels: [],
    vis: 'private',
    authUsers: [],
  },
  {
    id: '3',
    label: '快手高消耗',
    color: 'orange',
    active: false,
    owner: '王芳',
    updatedAt: '2026-03-15',
    mainChannels: ['大咖-快手'],
    subChannels: [],
    vis: 'partial',
    authUsers: ['张磊'],
  },
  {
    id: '4',
    label: '测试标签',
    color: 'purple',
    active: true,
    owner: '陈刚',
    updatedAt: '2026-03-20',
    mainChannels: [],
    subChannels: [],
    vis: 'public',
    authUsers: [],
  },
]

export function QuickTagBarDemo() {
  const [tags, setTags] = useState<QuickTag[]>(INITIAL_TAGS)
  const [manageMsg, setManageMsg] = useState('')

  const handleToggleTag = (id: string) => {
    setTags(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t))
  }

  const handleReorder = (newTags: QuickTag[]) => {
    setTags(newTags)
  }

  const activeTags = tags.filter(t => t.active).map(t => t.label)

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>QuickTagBar</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        快捷标签栏，展示用户配置的预设标签，支持单击激活/取消、拖拽排序。每个标签对应一组预设的渠道筛选条件。
      </p>

      <Section title="基础用法">
        <DemoBox style={{ background: '#fff', padding: 0 }}>
          <QuickTagBar
            tags={tags}
            onToggleTag={handleToggleTag}
            onManage={() => setManageMsg('点击了"管理快捷标签"按钮')}
            onReorderTags={handleReorder}
          />
        </DemoBox>
        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          {manageMsg && <span style={{ color: '#1677ff', marginRight: 12 }}>{manageMsg}</span>}
          已激活标签：<strong style={{ color: '#141414' }}>{activeTags.join('、') || '（无）'}</strong>
        </div>
        <CodeBlock code={`import { QuickTagBar } from 'cetus-ui'
import type { QuickTag } from 'cetus-ui'

const [tags, setTags] = useState<QuickTag[]>([
  {
    id: '1',
    label: '腾讯-华东',
    color: 'blue',       // 'blue' | 'green' | 'orange' | 'purple' | ...
    active: true,
    owner: '张磊',
    mainChannels: ['大咖-腾讯'],
    subChannels: [],
    vis: 'private',      // 'private' | 'partial' | 'public'
    authUsers: [],
  },
])

<QuickTagBar
  tags={tags}
  onToggleTag={id => setTags(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t))}
  onManage={() => setShowManageModal(true)}
  onReorderTags={newTags => setTags(newTags)}
/>`} />
      </Section>

      <PropsTable props={[
        { name: 'tags', type: 'QuickTag[]', required: true, description: '标签列表' },
        { name: 'onToggleTag', type: '(id: string) => void', required: true, description: '切换标签激活状态' },
        { name: 'onManage', type: '() => void', required: true, description: '点击"快捷标签"管理按钮的回调' },
        { name: 'onReorderTags', type: '(tags: QuickTag[]) => void', required: false, description: '拖拽排序后的新顺序回调' },
      ]} />
    </div>
  )
}
