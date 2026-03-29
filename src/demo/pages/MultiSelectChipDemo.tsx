import React, { useState } from 'react'
import { MultiSelectChip } from '../../components/MultiSelectChip'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const GAME_OPTIONS = ['游戏A', '游戏B', '游戏C', '游戏D', '游戏E', '游戏F']
const MEDIA_OPTIONS = ['腾讯', '字节', '快手', '百度', 'Facebook', 'Google Ads', 'TikTok']
const OPTIMIZER_OPTIONS = ['张磊', '李明', '王芳', '陈刚', '赵静', '刘洋', '周晓']

export function MultiSelectChipDemo() {
  const [gameSelected, setGameSelected] = useState<string[]>(['游戏A', '游戏C'])
  const [gameExclude, setGameExclude] = useState(false)

  const [mediaSelected, setMediaSelected] = useState<string[]>([])
  const [mediaExclude, setMediaExclude] = useState(false)

  const [optSelected, setOptSelected] = useState<string[]>([])
  const [optExclude, setOptExclude] = useState(false)

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>MultiSelectChip</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        多选筛选芯片，支持搜索、全选、排除模式、批量输入（精确/模糊匹配）。
      </p>

      <Section title="基础用法">
        <DemoBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MultiSelectChip
                label="游戏"
                options={GAME_OPTIONS}
                selected={gameSelected}
                onChange={setGameSelected}
                exclude={gameExclude}
                onExcludeChange={setGameExclude}
              />
              <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                已选：{gameSelected.length > 0
                  ? (gameExclude ? `排除 ${gameSelected.join('、')}` : gameSelected.join('、'))
                  : '不限'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MultiSelectChip
                label="媒体"
                options={MEDIA_OPTIONS}
                selected={mediaSelected}
                onChange={setMediaSelected}
                exclude={mediaExclude}
                onExcludeChange={setMediaExclude}
              />
              <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                已选：{mediaSelected.length > 0
                  ? (mediaExclude ? `排除 ${mediaSelected.join('、')}` : mediaSelected.join('、'))
                  : '不限'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MultiSelectChip
                label="优化师"
                options={OPTIMIZER_OPTIONS}
                selected={optSelected}
                onChange={setOptSelected}
                exclude={optExclude}
                onExcludeChange={setOptExclude}
              />
              <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                已选：{optSelected.length > 0
                  ? (optExclude ? `排除 ${optSelected.join('、')}` : optSelected.join('、'))
                  : '不限'}
              </span>
            </div>
          </div>
        </DemoBox>
        <CodeBlock code={`import { MultiSelectChip } from 'cetus-ui'

const [selected, setSelected] = useState<string[]>([])
const [exclude, setExclude] = useState(false)

<MultiSelectChip
  label="游戏"
  options={['游戏A', '游戏B', '游戏C', '游戏D']}
  selected={selected}
  onChange={setSelected}
  exclude={exclude}
  onExcludeChange={setExclude}
/>`} />
      </Section>

      <Section title="带注释列（optionAnnotations）">
        <DemoBox>
          <MultiSelectChip
            label="媒体"
            options={['腾讯', '字节', '快手', 'Facebook']}
            optionAnnotations={{
              腾讯: { col1: '国内', col2: 'CPM' },
              字节: { col1: '国内', col2: 'CPC' },
              快手: { col1: '国内', col2: 'CPA' },
              Facebook: { col1: '海外', col2: 'CPM' },
            }}
            selected={mediaSelected}
            onChange={setMediaSelected}
            exclude={mediaExclude}
            onExcludeChange={setMediaExclude}
          />
        </DemoBox>
        <CodeBlock code={`<MultiSelectChip
  label="媒体"
  options={['腾讯', '字节', '快手', 'Facebook']}
  optionAnnotations={{
    腾讯: { col1: '国内', col2: 'CPM' },
    字节: { col1: '国内', col2: 'CPC' },
  }}
  selected={selected}
  onChange={setSelected}
  exclude={exclude}
  onExcludeChange={setExclude}
/>`} />
      </Section>

      <PropsTable props={[
        { name: 'label', type: 'string', required: true, description: '芯片标签文字' },
        { name: 'options', type: 'string[]', required: true, description: '可选项列表' },
        { name: 'optionAnnotations', type: "Record<string, { col1?: string; col2?: string }>", required: false, description: '每个选项的附注说明（展示在下拉列表中）' },
        { name: 'selected', type: 'string[]', required: true, description: '已选值' },
        { name: 'onChange', type: '(selected: string[]) => void', required: true, description: '选值变化回调' },
        { name: 'exclude', type: 'boolean', required: true, description: '是否开启排除模式（NOT IN）' },
        { name: 'onExcludeChange', type: '(exclude: boolean) => void', required: true, description: '排除模式切换回调' },
      ]} />
    </div>
  )
}
