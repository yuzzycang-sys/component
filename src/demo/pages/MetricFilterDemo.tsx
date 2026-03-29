import React, { useState, useRef } from 'react'
import { MetricFilterPopover, MetricFilterEditModal } from '../../components/MetricFilterPopover'
import type { FilterCombination } from '../../components/MetricFilterPopover'
import { Button } from 'antd'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const INITIAL_COMBOS: FilterCombination[] = [
  {
    id: '1',
    name: '高消耗筛选',
    groups: [
      {
        id: 'g1',
        conditions: [
          { id: 'c1', metricKey: 'spend', operator: '>=', value: 10000, value2: 0 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'ROI优质',
    groups: [
      {
        id: 'g2',
        conditions: [
          { id: 'c2', metricKey: 'roi7', operator: '>=', value: 0.8, value2: 0 },
          { id: 'c3', metricKey: 'spend', operator: '>=', value: 5000, value2: 0 },
        ],
      },
    ],
  },
]

export function MetricFilterDemo() {
  const [combos, setCombos] = useState<FilterCombination[]>(INITIAL_COMBOS)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showPop, setShowPop] = useState(false)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  const [editingCombo, setEditingCombo] = useState<FilterCombination | null | undefined>(undefined)
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleOpenPop = () => {
    if (showPop) { setShowPop(false); return }
    if (btnRef.current) {
      setAnchorRect(btnRef.current.getBoundingClientRect())
    }
    setShowPop(true)
  }

  const handleDelete = (id: string) => {
    setCombos(prev => prev.filter(c => c.id !== id))
    if (activeId === id) setActiveId(null)
  }

  const handleSave = (combo: FilterCombination) => {
    setCombos(prev => {
      const idx = prev.findIndex(c => c.id === combo.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = combo
        return next
      }
      return [...prev, combo]
    })
    setEditingCombo(undefined)
  }

  const activeName = activeId ? combos.find(c => c.id === activeId)?.name : null

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>MetricFilter</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        指标筛选组件，支持创建/编辑/删除多个筛选组合，每个组合包含多条件逻辑（AND/OR 分组）。
      </p>

      <Section title="触发器 + 弹出面板">
        <DemoBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button
              ref={btnRef}
              size="small"
              type={showPop || activeId !== null ? 'primary' : 'default'}
              ghost={showPop || activeId !== null}
              onClick={handleOpenPop}
              style={{ fontSize: 12, height: 28 }}
            >
              指标筛选{activeName ? ` · ${activeName}` : ''}
            </Button>
            <span style={{ fontSize: 13, color: '#8c8c8c' }}>
              {activeName
                ? <>当前筛选：<strong style={{ color: '#141414' }}>{activeName}</strong></>
                : '（未选择筛选组合）'}
            </span>
          </div>
        </DemoBox>

        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          点击按钮可打开指标筛选弹出面板，支持新建/编辑/删除筛选组合。
        </div>

        <CodeBlock code={`import { MetricFilterPopover, MetricFilterEditModal } from 'cetus-ui'
import type { FilterCombination } from 'cetus-ui'

const [combos, setCombos] = useState<FilterCombination[]>([])
const [activeId, setActiveId] = useState<string | null>(null)
const [showPop, setShowPop] = useState(false)
const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
const [editingCombo, setEditingCombo] = useState<FilterCombination | null | undefined>(undefined)

// 弹出面板
{showPop && anchorRect && (
  <MetricFilterPopover
    combinations={combos}
    activeId={activeId}
    anchorRect={anchorRect}
    onSelect={id => { setActiveId(id); setShowPop(false) }}
    onEdit={combo => { setShowPop(false); setEditingCombo(combo) }}
    onDelete={id => {
      setCombos(prev => prev.filter(c => c.id !== id))
      if (activeId === id) setActiveId(null)
    }}
    onNew={() => { setShowPop(false); setEditingCombo(null) }}
    onClose={() => setShowPop(false)}
  />
)}

// 编辑模态框
{editingCombo !== undefined && (
  <MetricFilterEditModal
    initial={editingCombo}
    onSave={combo => {
      setCombos(prev => {
        const idx = prev.findIndex(c => c.id === combo.id)
        if (idx >= 0) { const next = [...prev]; next[idx] = combo; return next }
        return [...prev, combo]
      })
      setEditingCombo(undefined)
    }}
    onClose={() => setEditingCombo(undefined)}
  />
)}`} />
      </Section>

      <PropsTable props={[
        { name: 'combinations', type: 'FilterCombination[]', required: true, description: '筛选组合列表（MetricFilterPopover）' },
        { name: 'activeId', type: 'string | null', required: true, description: '当前激活的筛选组合 id（MetricFilterPopover）' },
        { name: 'anchorRect', type: 'DOMRect', required: true, description: '触发按钮的 DOMRect，用于定位弹出层' },
        { name: 'onSelect', type: '(id: string | null) => void', required: true, description: '选择筛选组合的回调' },
        { name: 'onEdit', type: '(combo: FilterCombination) => void', required: true, description: '编辑某筛选组合的回调' },
        { name: 'onDelete', type: '(id: string) => void', required: true, description: '删除筛选组合的回调' },
        { name: 'onNew', type: '() => void', required: true, description: '新建筛选组合的回调' },
        { name: 'onClose', type: '() => void', required: true, description: '关闭弹出层的回调' },
        { name: 'initial', type: 'FilterCombination | null', required: true, description: '编辑对象，null 表示新建（MetricFilterEditModal）' },
        { name: 'onSave', type: '(combo: FilterCombination) => void', required: true, description: '保存筛选组合回调（MetricFilterEditModal）' },
      ]} />

      {/* Popovers */}
      {showPop && anchorRect && (
        <MetricFilterPopover
          combinations={combos}
          activeId={activeId}
          anchorRect={anchorRect}
          onSelect={id => { setActiveId(id); setShowPop(false) }}
          onEdit={combo => { setShowPop(false); setEditingCombo(combo) }}
          onDelete={handleDelete}
          onNew={() => { setShowPop(false); setEditingCombo(null) }}
          onClose={() => setShowPop(false)}
        />
      )}
      {editingCombo !== undefined && (
        <MetricFilterEditModal
          initial={editingCombo}
          onSave={handleSave}
          onClose={() => setEditingCombo(undefined)}
        />
      )}
    </div>
  )
}
