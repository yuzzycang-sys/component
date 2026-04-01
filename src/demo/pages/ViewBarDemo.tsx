import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import { ViewBar } from '../../components/ViewBar'
import type { ViewItem } from '../../components/ViewSelectorDropdown'
import type { ShareMode } from '../../components/ShareViewModal'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const CURRENT_USER = '张磊'

type TagStub = { id: string; label: string; owner: string; vis: 'private' | 'partial' | 'public'; authUsers: string[] }

const TAG_STUBS: TagStub[] = [
  { id: 't1', label: '头条-安卓-激活',    owner: '张磊', vis: 'public',  authUsers: [] },
  { id: 't2', label: '快手-全渠道',       owner: '李明', vis: 'public',  authUsers: [] },
  { id: 't3', label: '广点通-核心ROI秘投', owner: '王芳', vis: 'private', authUsers: [] },
  { id: 't4', label: '抖音-内部测试包',    owner: '陈刚', vis: 'partial', authUsers: ['李明', '王芳'] },
]

function canUserAccessTag(userName: string, tag: TagStub): boolean {
  if (tag.vis === 'public') return true
  if (tag.owner === userName) return true
  if (tag.vis === 'partial' && tag.authUsers.includes(userName)) return true
  return false
}

type TagInfo = { id: string; label: string; owner: string; vis: string }
type PageStatus = { type: 'OK' } | { type: 'NO_PERMISSION'; missingTagsInfo: TagInfo[] }

const INITIAL_VIEWS: ViewItem[] = [
  { id: '1', name: '全量视图', type: 'mine', owner: '张磊', pinned: true, shareMode: 'private', sharedWith: [] },
  { id: '2', name: '腾讯-华东', type: 'mine', owner: '张磊', pinned: true, shareMode: 'private', sharedWith: [], tag_ids: ['t1', 't2'] },
  { id: '3', name: '字节-游戏A', type: 'shared', owner: '李明', pinned: false, shareMode: 'specific', sharedWith: ['张磊'] },
  { id: '4', name: '快手月度汇总', type: 'mine', owner: '张磊', pinned: false, shareMode: 'private', sharedWith: [] },
  { id: '5', name: '公共模板', type: 'public', owner: '管理员', pinned: false, shareMode: 'public', sharedWith: [] },
  { id: '6', name: '投放核心数据总览', type: 'shared', owner: '王芳', pinned: false, tag_ids: ['t3', 't4'] },
]

function NoPermissionView({ missingTagsInfo }: { missingTagsInfo: TagInfo[] }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 16, padding: '32px 20px',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: '#fff2f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Lock size={24} color="#ff4d4f" />
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#141414' }}>无法加载此视图</div>
      <div style={{ fontSize: 13, color: '#8c8c8c', textAlign: 'center', maxWidth: 380 }}>
        当前视图包含您无权访问的快捷标签。请联系标签所有者开放权限，或请视图创建者调整标签配置。
      </div>
      <div style={{ width: '100%', maxWidth: 380 }}>
        {missingTagsInfo.map(t => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', marginBottom: 8, borderRadius: 6,
            background: '#fff2f0', border: '1px solid #ffa39e',
          }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#cf1322' }}>「{t.label}」</span>
            <span style={{ fontSize: 12, color: '#999' }}>所有者：{t.owner}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ViewBarDemo() {
  const [views, setViews] = useState<ViewItem[]>(INITIAL_VIEWS)
  const [selectedView, setSelectedView] = useState<string | null>('全量视图')
  const [pinnedViews, setPinnedViews] = useState<string[]>(['全量视图', '腾讯-华东'])
  const [activePinnedTag, setActivePinnedTag] = useState<string | null>('全量视图')
  const [pageStatus, setPageStatus] = useState<PageStatus>({ type: 'OK' })

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

  const handleSelectView = (name: string) => {
    const view = views.find(v => v.name === name)
    if (view?.tag_ids && view.tag_ids.length > 0) {
      const missingTags: TagInfo[] = []
      for (const tagId of view.tag_ids) {
        const tag = TAG_STUBS.find(t => t.id === tagId)
        if (tag && !canUserAccessTag(CURRENT_USER, tag)) {
          missingTags.push({ id: tag.id, label: tag.label, owner: tag.owner, vis: tag.vis })
        }
      }
      if (missingTags.length > 0) {
        setPageStatus({ type: 'NO_PERMISSION', missingTagsInfo: missingTags })
        setSelectedView(name)
        return
      }
    }
    setPageStatus({ type: 'OK' })
    setSelectedView(name)
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
            onSelectView={handleSelectView}
            onTogglePin={handleTogglePin}
            onSaveNew={handleSaveNew}
            pinnedViews={pinnedViews}
            activePinnedTag={activePinnedTag}
            onClickPinnedTag={name => {
              setActivePinnedTag(prev => prev === name ? null : name)
              handleSelectView(name)
            }}
            onShareView={handleShareView}
          />
        </DemoBox>
        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          当前选中视图：<strong style={{ color: '#141414' }}>{selectedView || '（未选择）'}</strong>
          {' '}｜ 固定视图：<strong style={{ color: '#141414' }}>{pinnedViews.join('、') || '（无）'}</strong>
        </div>

        {pageStatus.type === 'NO_PERMISSION' && (
          <NoPermissionView missingTagsInfo={pageStatus.missingTagsInfo} />
        )}

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

      <Section title="标签无权限场景">
        <div style={{ fontSize: 13, color: '#666', marginBottom: 12, lineHeight: 1.8 }}>
          选择「<strong>投放核心数据总览</strong>」视图可触发无权限空态。该视图包含标签：
          <ul style={{ margin: '4px 0', paddingLeft: 20 }}>
            <li><code>广点通-核心ROI秘投</code> — 王芳私有标签（当前用户张磊无权限）</li>
            <li><code>抖音-内部测试包</code> — 陈刚部分可见标签（授权：李明、王芳，不含张磊）</li>
          </ul>
        </div>
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
