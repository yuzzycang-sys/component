import React, { useState } from 'react'
import { ExportModal } from '../../components/ExportModal'
import { Button } from 'antd'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const SHEETS = ['天-全量', '天-腾讯', '周-字节', '月-汇总']

export function ExportModalDemo() {
  const [open, setOpen] = useState(false)
  const [activeSheet, setActiveSheet] = useState('天-全量')

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>ExportModal</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        导出模态框，支持勾选多个 Sheet 一起导出，自动携带当前全局筛选条件。
      </p>

      <Section title="基础用法">
        <DemoBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button onClick={() => setOpen(true)}>导出</Button>
            <div style={{ display: 'flex', gap: 8 }}>
              {SHEETS.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveSheet(s)}
                  style={{
                    padding: '2px 10px',
                    borderRadius: 4,
                    border: `1px solid ${activeSheet === s ? '#1677ff' : '#d9d9d9'}`,
                    background: activeSheet === s ? '#e6f4ff' : '#fff',
                    color: activeSheet === s ? '#1677ff' : '#333',
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: '#8c8c8c' }}>
            当前 Sheet：<strong style={{ color: '#141414' }}>{activeSheet}</strong>（打开导出时默认选中此 Sheet）
          </div>
        </DemoBox>
        <CodeBlock code={`import { ExportModal } from 'cetus-ui'

const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>导出</Button>

<ExportModal
  open={open}
  onClose={() => setOpen(false)}
  sheets={['天-全量', '天-腾讯', '周-字节', '月-汇总']}
  activeSheet={activeSheet}
  dateStart="2026-03-01"
  dateEnd="2026-03-28"
  activeFilters={activeFilters}
  filterSelections={filterSelections}
  priceRange={{ min: '', max: '', roiMin: '', roiMax: '' }}
/>`} />
      </Section>

      <PropsTable props={[
        { name: 'open', type: 'boolean', required: true, description: '是否显示模态框' },
        { name: 'onClose', type: '() => void', required: true, description: '关闭模态框回调' },
        { name: 'sheets', type: 'string[]', required: true, description: '所有可选 Sheet 名称列表' },
        { name: 'activeSheet', type: 'string', required: true, description: '当前激活 Sheet（默认勾选）' },
        { name: 'dateStart', type: 'string', required: true, description: '全局筛选：起始日期' },
        { name: 'dateEnd', type: 'string', required: true, description: '全局筛选：结束日期' },
        { name: 'activeFilters', type: 'string[]', required: true, description: '全局筛选：激活的筛选项 key' },
        { name: 'filterSelections', type: 'Record<string, string[]>', required: true, description: '全局筛选：各筛选项选值' },
        { name: 'priceRange', type: '{ min, max, roiMin, roiMax }', required: true, description: '全局筛选：出价范围' },
      ]} />

      <ExportModal
        open={open}
        onClose={() => setOpen(false)}
        sheets={SHEETS}
        activeSheet={activeSheet}
        dateStart="2026-03-01"
        dateEnd="2026-03-28"
        activeFilters={['mainChannel']}
        filterSelections={{ mainChannel: ['腾讯'] }}
        priceRange={{ min: '', max: '', roiMin: '', roiMax: '' }}
      />
    </div>
  )
}
