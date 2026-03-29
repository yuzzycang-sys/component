import React, { useState } from 'react'
import { DataTable } from '../../components/DataTable'
import type { FilterCombination } from '../../components/MetricFilterPopover'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const DEMO_COMBOS: FilterCombination[] = [
  {
    id: '1',
    name: '高消耗（≥3万）',
    groups: [
      {
        id: 'g1',
        conditions: [
          { id: 'c1', metricKey: 'spend', operator: '>=', value: 30000, value2: 0 },
        ],
      },
    ],
  },
]

export function DataTableDemo() {
  const [activeDims, setActiveDims] = useState<string[]>(['time', 'media', 'optimizer', 'game'])
  const [mergeView, setMergeView] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterCombination | null>(null)

  const dimOptions = [
    { key: 'time', label: '时间' },
    { key: 'media', label: '媒体' },
    { key: 'optimizer', label: '优化师' },
    { key: 'game', label: '游戏' },
    { key: 'channel', label: '主渠道' },
    { key: 'os', label: '系统' },
    { key: 'region', label: '地区' },
    { key: 'adtype', label: '广告类型' },
  ]

  return (
    <div style={{ padding: '40px 48px', maxWidth: 960 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>DataTable</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        数据表格，支持维度列自定义、指标筛选、合并视图（相同维度值合并行）、排序、汇总行。
      </p>

      <Section title="完整示例">
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: '#595959' }}>显示维度：</span>
          {dimOptions.map(d => (
            <label key={d.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={activeDims.includes(d.key)}
                onChange={e => {
                  if (e.target.checked) setActiveDims(prev => [...prev, d.key])
                  else setActiveDims(prev => prev.filter(k => k !== d.key))
                }}
              />
              {d.label}
            </label>
          ))}
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, cursor: 'pointer', marginLeft: 12, borderLeft: '1px solid #e8e8e8', paddingLeft: 12 }}>
            <input type="checkbox" checked={mergeView} onChange={e => setMergeView(e.target.checked)} />
            合并视图
          </label>
          <span style={{ borderLeft: '1px solid #e8e8e8', paddingLeft: 12 }}>
            <span style={{ fontSize: 13, color: '#595959', marginRight: 8 }}>指标筛选：</span>
            <select
              value={activeFilter?.id ?? ''}
              onChange={e => setActiveFilter(DEMO_COMBOS.find(c => c.id === e.target.value) ?? null)}
              style={{ fontSize: 13, padding: '2px 6px', borderRadius: 4, border: '1px solid #d9d9d9' }}
            >
              <option value="">无</option>
              {DEMO_COMBOS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </span>
        </div>
        <DemoBox style={{ padding: 0, overflow: 'hidden', minHeight: 300 }}>
          <DataTable
            activeDims={activeDims}
            hasData={true}
            activeFilter={activeFilter}
            mergeView={mergeView}
          />
        </DemoBox>
        <CodeBlock code={`import { DataTable } from 'cetus-ui'
import type { FilterCombination } from 'cetus-ui'

const [activeDims, setActiveDims] = useState(['time', 'media', 'optimizer'])
const [mergeView, setMergeView] = useState(false)
const [activeFilter, setActiveFilter] = useState<FilterCombination | null>(null)

<DataTable
  activeDims={activeDims}
  hasData={true}
  activeFilter={activeFilter}
  mergeView={mergeView}
/>`} />
      </Section>

      <Section title="无数据状态">
        <DemoBox style={{ padding: 0, minHeight: 200 }}>
          <DataTable activeDims={[]} hasData={false} />
        </DemoBox>
      </Section>

      <PropsTable props={[
        { name: 'activeDims', type: 'string[]', required: true, description: '激活的维度 key 列表，决定展示哪些列（time / media / optimizer / game / channel / os / region / adtype）' },
        { name: 'hasData', type: 'boolean', required: true, description: '是否有数据（控制空状态展示）' },
        { name: 'activeFilter', type: 'FilterCombination | null', required: false, description: '当前指标筛选组合，null 表示不筛选' },
        { name: 'mergeView', type: 'boolean', required: false, default: 'false', description: '合并视图：相同维度值的相邻行合并显示' },
      ]} />
    </div>
  )
}
