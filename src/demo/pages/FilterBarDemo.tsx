import React, { useState } from 'react'
import { FilterBar } from '../../components/FilterBar'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

export function FilterBarDemo() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['mainChannel', 'optimizer', 'accountId', 'mediaCreativeMd5'])
  const [dateStart, setDateStart] = useState('2026-03-01')
  const [dateEnd, setDateEnd] = useState('2026-03-28')
  const [filterSelections, setFilterSelections] = useState<Record<string, string[]>>({
    mainChannel: ['腾讯'],
  })
  const [priceRange, setPriceRange] = useState({ min: '', max: '', roiMin: '', roiMax: '' })

  const handleToggleFilter = (key: string) => {
    setActiveFilters(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  const handleFilterSelect = (key: string, selected: string[]) => {
    setFilterSelections(prev => ({ ...prev, [key]: selected }))
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>FilterBar</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        全局筛选栏，包含"所有筛选"弹出菜单、消耗时间日期范围、以及各类动态筛选芯片。
      </p>

      <Section title="基础用法">
        <DemoBox style={{ padding: 0, background: '#fff' }}>
          <FilterBar
            activeFilters={activeFilters}
            onToggleFilter={handleToggleFilter}
            dateStart={dateStart}
            dateEnd={dateEnd}
            onDateChange={(s, e) => { setDateStart(s); setDateEnd(e) }}
            filterSelections={filterSelections}
            onFilterSelect={handleFilterSelect}
            priceRange={priceRange}
            onPriceRangeChange={(min, max, roiMin, roiMax) => setPriceRange({ min, max, roiMin, roiMax })}
          />
        </DemoBox>
        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          日期范围：<strong style={{ color: '#141414' }}>{dateStart} ~ {dateEnd}</strong>
          {' '}｜ 已激活筛选：<strong style={{ color: '#141414' }}>{activeFilters.join('、') || '（无）'}</strong>
        </div>
        <CodeBlock code={`import { FilterBar } from 'cetus-ui'

const [activeFilters, setActiveFilters] = useState<string[]>([])
const [dateStart, setDateStart] = useState('2026-03-01')
const [dateEnd, setDateEnd] = useState('2026-03-28')
const [filterSelections, setFilterSelections] = useState<Record<string, string[]>>({})
const [priceRange, setPriceRange] = useState({ min: '', max: '', roiMin: '', roiMax: '' })

<FilterBar
  activeFilters={activeFilters}
  onToggleFilter={key => setActiveFilters(prev =>
    prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
  )}
  dateStart={dateStart}
  dateEnd={dateEnd}
  onDateChange={(s, e) => { setDateStart(s); setDateEnd(e) }}
  filterSelections={filterSelections}
  onFilterSelect={(key, sel) => setFilterSelections(prev => ({ ...prev, [key]: sel }))}
  priceRange={priceRange}
  onPriceRangeChange={(min, max, roiMin, roiMax) => setPriceRange({ min, max, roiMin, roiMax })}
/>`} />
      </Section>

      <PropsTable props={[
        { name: 'activeFilters', type: 'string[]', required: true, description: '当前激活的筛选项 key 列表' },
        { name: 'onToggleFilter', type: '(key: string) => void', required: true, description: '切换某个筛选项的激活状态' },
        { name: 'dateStart', type: 'string', required: true, description: '消耗时间起始日期，格式 YYYY-MM-DD' },
        { name: 'dateEnd', type: 'string', required: true, description: '消耗时间结束日期，格式 YYYY-MM-DD' },
        { name: 'onDateChange', type: '(start: string, end: string) => void', required: true, description: '日期范围变化回调' },
        { name: 'filterSelections', type: 'Record<string, string[]>', required: true, description: '各筛选项的已选值' },
        { name: 'onFilterSelect', type: '(key: string, selected: string[]) => void', required: true, description: '某筛选项选值变化回调' },
        { name: 'priceRange', type: '{ min, max, roiMin, roiMax }', required: false, default: '{}', description: '出价范围筛选值' },
        { name: 'onPriceRangeChange', type: '(min, max, roiMin, roiMax) => void', required: false, description: '出价范围变化回调' },
        { name: 'channelLocked', type: 'boolean', required: false, description: '渠道是否被锁定（禁用交互）' },
        { name: 'onChannelLockedClick', type: '() => void', required: false, description: '点击锁定渠道时的回调' },
      ]} />
    </div>
  )
}
