import React, { useState } from 'react'
import { ViewBar } from '../../components/ViewBar'
import type { ViewItem } from '../../components/ViewSelectorDropdown'
import type { ShareMode } from '../../components/ShareViewModal'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const INITIAL_VIEWS: ViewItem[] = [
  { id: '1', name: '全量视图', type: 'mine', owner: '张磊', pinned: true, shareMode: 'private', sharedWith: [] },
  { id: '2', name: '腾讯-华东', type: 'mine', owner: '张磊', pinned: true, shareMode: 'private', sharedWith: [] },
  { id: '3', name: '字节-游戏A', type: 'shared', owner: '李明', pinned: false, shareMode: 'specific', sharedWith: ['张磊'] },
  { id: '4', name: '快手月度汇总', type: 'mine', owner: '张磊', pinned: false, shareMode: 'private', sharedWith: [] },
  { id: '5', name: '公共模板', type: 'public', owner: '管理员', pinned: false, shareMode: 'public', sharedWith: [] },
]

export function ViewBarDemo() {
  const [views, setViews] = useState<ViewItem[]>(INITIAL_VIEWS)
  const [selectedView, setSelectedView] = useState<string | null>('全量视图')
  const [pinnedViews, setPinnedViews] = useState<string[]>(['全量视图', '腾讯-华东'])
  const [activePinnedTag, setActivePinnedTag] = useState<string | null>('全量视图')

  const handleTogglePin = (id: string) => {
    const view = views.find(v => v.id === id)
    if (!view) return
    setViews(prev => prev.map(v => v.id === id ? { ...v, pinned: !v.pinned } : v))
    if (pinnedViews.includes(view.name)) {
      setPinnedViews(prev => prev.filter(n => n !== view.name))
    } else {
      setPinnedViews(prev => [...prev, view.name])
    }
  }

  const handleSaveNew = (name: string) => {
    const newView: ViewItem = {
      id: String(Date.now()),
      name,
      type: 'mine',
      owner: '当前用户',
      pinned: false,
      shareMode: 'private',
      sharedWith: [],
    }
    setViews(prev => [...prev, newView])
  }

  const handleShareView = (id: string, shareMode: ShareMode, sharedWith: string[]) => {
    setViews(prev => prev.map(v => v.id === id ? { ...v, shareMode, sharedWith } : v))
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>ViewBar</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        视图管理栏，支持选择/保存/固定视图，固定视图以标签形式展示在工具栏上。
      </p>

      <Section title="基础用法">
        <DemoBox style={{ padding: 0, background: '#f8f9fa' }}>
          <ViewBar
            views={views}
            selectedView={selectedView}
            onSelectView={setSelectedView}
            onTogglePin={handleTogglePin}
            onSaveNew={handleSaveNew}
            pinnedViews={pinnedViews}
            activePinnedTag={activePinnedTag}
            onClickPinnedTag={name => setActivePinnedTag(prev => prev === name ? null : name)}
            onShareView={handleShareView}
          />
        </DemoBox>
        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          当前选中视图：<strong style={{ color: '#141414' }}>{selectedView || '（未选择）'}</strong>
          {' '}｜ 固定视图：<strong style={{ color: '#141414' }}>{pinnedViews.join('、') || '（无）'}</strong>
        </div>
        <CodeBlock code={`import { ViewBar } from 'cetus-ui'
import type { ViewItem } from 'cetus-ui'

const [views, setViews] = useState<ViewItem[]>([...])
const [selectedView, setSelectedView] = useState<string | null>(null)
const [pinnedViews, setPinnedViews] = useState<string[]>([])
const [activePinnedTag, setActivePinnedTag] = useState<string | null>(null)

<ViewBar
  views={views}
  selectedView={selectedView}
  onSelectView={setSelectedView}
  onTogglePin={handleTogglePin}
  onSaveNew={handleSaveNew}
  pinnedViews={pinnedViews}
  activePinnedTag={activePinnedTag}
  onClickPinnedTag={name => setActivePinnedTag(prev => prev === name ? null : name)}
  onShareView={handleShareView}
/>`} />
      </Section>

      <PropsTable props={[
        { name: 'views', type: 'ViewItem[]', required: true, description: '所有视图列表' },
        { name: 'selectedView', type: 'string | null', required: true, description: '当前选中视图名称' },
        { name: 'onSelectView', type: '(name: string) => void', required: true, description: '选择视图回调' },
        { name: 'onTogglePin', type: '(id: string) => void', required: true, description: '切换视图固定状态' },
        { name: 'onSaveNew', type: '(name: string) => void', required: true, description: '另存为新视图回调' },
        { name: 'pinnedViews', type: 'string[]', required: true, description: '固定的视图名称列表（用于显示标签）' },
        { name: 'activePinnedTag', type: 'string | null', required: true, description: '当前激活的固定标签名' },
        { name: 'onClickPinnedTag', type: '(name: string) => void', required: true, description: '点击固定标签的回调' },
        { name: 'onShareView', type: '(id: string, shareMode: ShareMode, sharedWith: string[]) => void', required: true, description: '保存分享设置回调' },
      ]} />
    </div>
  )
}
