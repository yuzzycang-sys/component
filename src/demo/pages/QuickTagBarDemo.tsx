import React, { useState } from 'react'
import { QuickTagBar } from '../../components/QuickTagBar'
import { QuickTagModal } from '../../components/QuickTagModal'
import type { QuickTag } from '../../components/QuickTagBar'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const INITIAL_TAGS: QuickTag[] = [
  {
    id: '1',
    label: '大咖-头条全量',
    color: 'blue',
    active: true,
    owner: '张三',
    updatedAt: '2026-03-28T10:30:00Z',
    mainChannels: ['大咖-头条-头条btt', '大咖-头条-头条btoutiao', '大咖-头条-头条btt_and', '大咖-头条-头条btt_ios'],
    subChannels: ['tt00zs01', 'tt00zs02', 'tt00fx01'],
    vis: 'public',
    authUsers: [],
  },
  {
    id: '2',
    label: '大咖-快手iOS',
    color: 'green',
    active: true,
    owner: '张三',
    updatedAt: '2026-03-27T16:45:00Z',
    mainChannels: ['大咖-快手-快手ksa'],
    subChannels: ['ks_ios_01', 'ks_ios_02'],
    vis: 'private',
    authUsers: [],
  },
  {
    id: '3',
    label: '乐乐-海外投放',
    color: 'purple',
    active: false,
    owner: '李明',
    updatedAt: '2026-03-25T09:00:00Z',
    mainChannels: ['乐乐-Facebook-FB_ll_01', '乐乐-Facebook-FB_ll_02', '乐乐-Google Ads-GG_ll_01'],
    subChannels: [],
    vis: 'partial',
    authUsers: ['张三', '王芳'],
  },
  {
    id: '4',
    label: '星海-TikTok',
    color: 'cyan',
    active: false,
    owner: '张三',
    updatedAt: '2026-03-26T14:20:00Z',
    mainChannels: ['星海-TikTok-TK_xh01', '星海-TikTok-TK_xh02', '星海-TikTok-TK_xh03'],
    subChannels: ['tk_brand_01'],
    vis: 'private',
    authUsers: [],
  },
  {
    id: '5',
    label: '广点通-高ROI',
    color: 'orange',
    active: false,
    owner: '王芳',
    updatedAt: '2026-03-24T11:10:00Z',
    mainChannels: ['大咖-广点通-广点通gdt01', '大咖-广点通-广点通gdt02'],
    subChannels: ['gdt_main_a01', 'gdt_main_a02'],
    vis: 'partial',
    authUsers: ['张三', '陈刚'],
  },
  {
    id: '6',
    label: '乐乐-头条+快手',
    color: 'red',
    active: true,
    owner: '张三',
    updatedAt: '2026-03-23T08:30:00Z',
    mainChannels: ['乐乐-头条-头条ltt01', '乐乐-头条-头条ltt02', '乐乐-快手-快手lks01'],
    subChannels: ['ll_tt_mix01'],
    vis: 'public',
    authUsers: [],
  },
  {
    id: '7',
    label: '大咖-安卓全渠道',
    color: 'gold',
    active: false,
    owner: '陈刚',
    updatedAt: '2026-03-22T17:00:00Z',
    mainChannels: ['大咖-头条-头条btt', '大咖-头条-头条btt_and', '大咖-快手-快手ksb', '大咖-广点通-广点通gdt01'],
    subChannels: ['tt00zs01', 'ks_all_01', 'gdt_main_a01'],
    vis: 'partial',
    authUsers: ['张三', '李明', '王芳'],
  },
  {
    id: '8',
    label: '星海-百度品牌',
    color: 'magenta',
    active: false,
    owner: '李明',
    updatedAt: '2026-03-21T13:40:00Z',
    mainChannels: ['星海-百度-BD_xh01'],
    subChannels: ['bd_brand_01', 'bd_brand_02'],
    vis: 'private',
    authUsers: [],
  },
  {
    id: '9',
    label: '全游戏-头条汇总',
    color: 'blue',
    active: false,
    owner: '张三',
    updatedAt: '2026-03-20T10:15:00Z',
    mainChannels: [
      '大咖-头条-头条btt', '大咖-头条-头条btoutiao',
      '乐乐-头条-头条ltt01', '乐乐-头条-头条ltt02',
      '星海-头条-头条xh01',
    ],
    subChannels: [],
    vis: 'public',
    authUsers: [],
  },
  {
    id: '10',
    label: '低消耗渠道',
    color: 'green',
    active: false,
    owner: '王芳',
    updatedAt: '2026-03-19T15:50:00Z',
    mainChannels: ['大咖-快手-快手ksb', '乐乐-快手-快手lks01', '星海-百度-BD_xh01'],
    subChannels: ['ks_all_01', 'bd_brand_01'],
    vis: 'partial',
    authUsers: ['张三'],
  },
]

export function QuickTagBarDemo() {
  const [tags, setTags] = useState<QuickTag[]>(INITIAL_TAGS)
  const [showModal, setShowModal] = useState(false)

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
            onManage={() => setShowModal(true)}
            onReorderTags={handleReorder}
          />
        </DemoBox>
        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          已激活标签：<strong style={{ color: '#141414' }}>{activeTags.join('、') || '（无）'}</strong>
        </div>

        {showModal && (
          <QuickTagModal
            tags={tags}
            onSave={setTags}
            onClose={() => setShowModal(false)}
          />
        )}
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
