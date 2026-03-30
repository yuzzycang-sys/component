import React, { useState } from 'react'
import { TableToolBar } from '../../components/TableToolBar'
import type { FilterCombination } from '../../components/MetricFilterPopover'
import type { LocalFilters } from '../../components/LocalFilterPopover'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const INITIAL_COMBOS: FilterCombination[] = [
  {
    id: '1',
    name: '高消耗',
    groups: [{ id: 'g1', conditions: [{ id: 'c1', metricKey: 'spend', operator: '>=', value: 10000, value2: 0 }] }],
  },
]

export function TableToolBarDemo() {
  const [timeGranularity, setTimeGranularity] = useState<'day' | 'week' | 'month'>('day')
  const [activeDims, setActiveDims] = useState<string[]>(['time', 'game', 'optimizer'])
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [mergeView, setMergeView] = useState(false)
  const [filterCombinations, setFilterCombinations] = useState<FilterCombination[]>(INITIAL_COMBOS)
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null)
  const [localFilters, setLocalFilters] = useState<LocalFilters>({})
  const [dimAutoUpdate, setDimAutoUpdate] = useState(false)
  const [queryCount, setQueryCount] = useState(0)
  const [exportCount, setExportCount] = useState(0)

  const handleSaveFilter = (combo: FilterCombination) => {
    setFilterCombinations(prev => {
      const idx = prev.findIndex(c => c.id === combo.id)
      if (idx >= 0) { const next = [...prev]; next[idx] = combo; return next }
      return [...prev, combo]
    })
  }

  const handleDeleteFilter = (id: string) => {
    setFilterCombinations(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>TableToolBar</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        表格工具栏，包含时间粒度切换、聚合维度选择、自定义列、指标筛选、局部筛选、视图模式和查询/导出按钮。
      </p>

      <Section title="完整交互示例">
        <DemoBox style={{ padding: 0, background: '#fff', border: '1px solid #e8e8e8' }}>
          <TableToolBar
            timeGranularity={timeGranularity}
            onChangeGranularity={setTimeGranularity}
            activeDims={activeDims}
            onChangeDims={setActiveDims}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
            mergeView={mergeView}
            onChangeMergeView={setMergeView}
            onQuery={() => setQueryCount(c => c + 1)}
            onExport={() => setExportCount(c => c + 1)}
            filterCombinations={filterCombinations}
            activeFilterId={activeFilterId}
            onSelectFilter={setActiveFilterId}
            onSaveFilter={handleSaveFilter}
            onDeleteFilter={handleDeleteFilter}
            localFilters={localFilters}
            onChangeLocalFilters={setLocalFilters}
            dimAutoUpdate={dimAutoUpdate}
            onChangeDimAutoUpdate={setDimAutoUpdate}
          />
        </DemoBox>
        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          时间粒度：<strong style={{ color: '#141414' }}>{timeGranularity}</strong>
          {' '}｜ 维度：<strong style={{ color: '#141414' }}>{activeDims.join('、')}</strong>
          {' '}｜ 合并视图：<strong style={{ color: '#141414' }}>{mergeView ? '是' : '否'}</strong>
          {' '}｜ 查询次数：<strong style={{ color: '#141414' }}>{queryCount}</strong>
          {' '}｜ 导出次数：<strong style={{ color: '#141414' }}>{exportCount}</strong>
        </div>
        <CodeBlock code={`import { TableToolBar } from 'cetus-ui'
import type { FilterCombination } from 'cetus-ui'
import type { LocalFilters } from 'cetus-ui'

const [timeGranularity, setTimeGranularity] = useState<'day' | 'week' | 'month'>('day')
const [activeDims, setActiveDims] = useState<string[]>(['time', 'game'])
const [mergeView, setMergeView] = useState(false)
const [filterCombinations, setFilterCombinations] = useState<FilterCombination[]>([])
const [activeFilterId, setActiveFilterId] = useState<string | null>(null)
const [localFilters, setLocalFilters] = useState<LocalFilters>({})

<TableToolBar
  timeGranularity={timeGranularity}
  onChangeGranularity={setTimeGranularity}
  activeDims={activeDims}
  onChangeDims={setActiveDims}
  viewMode="list"
  onChangeViewMode={() => {}}
  mergeView={mergeView}
  onChangeMergeView={setMergeView}
  onQuery={handleQuery}
  onExport={handleExport}
  filterCombinations={filterCombinations}
  activeFilterId={activeFilterId}
  onSelectFilter={setActiveFilterId}
  onSaveFilter={handleSaveFilter}
  onDeleteFilter={handleDeleteFilter}
  localFilters={localFilters}
  onChangeLocalFilters={setLocalFilters}
  dimAutoUpdate={false}
  onChangeDimAutoUpdate={() => {}}
/>`} />
      </Section>

      <PropsTable props={[
        { name: 'timeGranularity', type: "'day' | 'week' | 'month'", required: true, description: '时间粒度' },
        { name: 'onChangeGranularity', type: "(g: 'day' | 'week' | 'month') => void", required: true, description: '时间粒度变化回调' },
        { name: 'activeDims', type: 'string[]', required: true, description: '当前激活的聚合维度 key 列表' },
        { name: 'onChangeDims', type: '(dims: string[]) => void', required: true, description: '维度变化回调' },
        { name: 'viewMode', type: "'list' | 'grid'", required: true, description: '视图模式' },
        { name: 'onChangeViewMode', type: "(m: 'list' | 'grid') => void", required: true, description: '视图模式变化回调' },
        { name: 'mergeView', type: 'boolean', required: true, description: '是否开启合并视图' },
        { name: 'onChangeMergeView', type: '(v: boolean) => void', required: true, description: '合并视图切换回调' },
        { name: 'onQuery', type: '() => void', required: true, description: '点击查询按钮回调' },
        { name: 'onExport', type: '() => void', required: true, description: '点击导出按钮回调' },
        { name: 'filterCombinations', type: 'FilterCombination[]', required: true, description: '指标筛选组合列表' },
        { name: 'activeFilterId', type: 'string | null', required: true, description: '当前激活的指标筛选 id' },
        { name: 'onSelectFilter', type: '(id: string | null) => void', required: true, description: '选择指标筛选回调' },
        { name: 'onSaveFilter', type: '(combo: FilterCombination) => void', required: true, description: '保存指标筛选回调' },
        { name: 'onDeleteFilter', type: '(id: string) => void', required: true, description: '删除指标筛选回调' },
        { name: 'localFilters', type: 'LocalFilters', required: true, description: '局部筛选值' },
        { name: 'onChangeLocalFilters', type: '(next: LocalFilters) => void', required: true, description: '局部筛选变化回调' },
        { name: 'dimAutoUpdate', type: 'boolean', required: true, description: '维度自动更新开关' },
        { name: 'onChangeDimAutoUpdate', type: '(v: boolean) => void', required: true, description: '维度自动更新切换回调' },
      ]} />
    </div>
  )
}
