import React, { useState } from 'react'
import { SheetTabBar } from '../../components/SheetTabBar'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

const INITIAL_SHEETS = ['天-全量', '天-腾讯', '周-字节', '月-汇总']
const INITIAL_GRANULARITIES: Record<string, 'day' | 'week' | 'month'> = {
  '天-全量': 'day',
  '天-腾讯': 'day',
  '周-字节': 'week',
  '月-汇总': 'month',
}

export function SheetTabBarDemo() {
  const [sheets, setSheets] = useState<string[]>(INITIAL_SHEETS)
  const [activeSheet, setActiveSheet] = useState('天-全量')
  const [granularities, setGranularities] = useState<Record<string, 'day' | 'week' | 'month'>>(INITIAL_GRANULARITIES)
  const [log, setLog] = useState<string[]>([])

  const addLog = (msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 5))
  }

  const handleAddSheet = () => {
    const newName = `天-Sheet${sheets.length + 1}`
    setSheets(prev => [...prev, newName])
    setGranularities(prev => ({ ...prev, [newName]: 'day' }))
    setActiveSheet(newName)
    addLog(`新增 sheet: ${newName}`)
  }

  const handleRenameSheet = (oldName: string, newName: string) => {
    setSheets(prev => prev.map(s => s === oldName ? newName : s))
    setGranularities(prev => {
      const gran = prev[oldName] ?? 'day'
      const next = { ...prev }
      delete next[oldName]
      next[newName] = gran
      return next
    })
    if (activeSheet === oldName) setActiveSheet(newName)
    addLog(`重命名: ${oldName} → ${newName}`)
  }

  const handleDeleteSheet = (name: string) => {
    setSheets(prev => {
      const next = prev.filter(s => s !== name)
      if (activeSheet === name && next.length > 0) {
        setActiveSheet(next[0])
      }
      return next
    })
    setGranularities(prev => {
      const next = { ...prev }
      delete next[name]
      return next
    })
    addLog(`删除 sheet: ${name}`)
  }

  const handleCopySheet = (name: string) => {
    const copyName = `${name}_副本`
    setSheets(prev => [...prev, copyName])
    setGranularities(prev => ({ ...prev, [copyName]: prev[name] ?? 'day' }))
    addLog(`复制 sheet: ${name} → ${copyName}`)
  }

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>SheetTabBar</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        Sheet 标签栏，支持多 Sheet 切换、新增、重命名、复制、删除、拖拽排序。
      </p>

      <Section title="基础用法">
        <DemoBox style={{ padding: 0, overflow: 'hidden' }}>
          <SheetTabBar
            sheets={sheets}
            activeSheet={activeSheet}
            sheetGranularities={granularities}
            onSelectSheet={setActiveSheet}
            onRenameSheet={handleRenameSheet}
            onDeleteSheet={handleDeleteSheet}
            onCopySheet={handleCopySheet}
            onAddSheet={handleAddSheet}
            onReorderSheets={setSheets}
          />
          <div style={{ padding: '12px 16px', fontSize: 13, color: '#595959' }}>
            当前 Sheet：<strong style={{ color: '#1677ff' }}>{activeSheet}</strong>
          </div>
        </DemoBox>

        {log.length > 0 && (
          <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 16 }}>
            操作记录：{log.map((l, i) => <span key={i} style={{ marginRight: 12 }}>• {l}</span>)}
          </div>
        )}

        <CodeBlock code={`import { SheetTabBar } from 'cetus-ui'

const [sheets, setSheets] = useState<string[]>(['天-全量', '天-腾讯', '周-字节'])
const [activeSheet, setActiveSheet] = useState('天-全量')
const [granularities, setGranularities] = useState<Record<string, 'day' | 'week' | 'month'>>({
  '天-全量': 'day', '天-腾讯': 'day', '周-字节': 'week',
})

<SheetTabBar
  sheets={sheets}
  activeSheet={activeSheet}
  sheetGranularities={granularities}
  onSelectSheet={setActiveSheet}
  onRenameSheet={(oldName, newName) => {
    setSheets(prev => prev.map(s => s === oldName ? newName : s))
    setActiveSheet(prev => prev === oldName ? newName : prev)
  }}
  onDeleteSheet={name => setSheets(prev => prev.filter(s => s !== name))}
  onCopySheet={name => setSheets(prev => [...prev, name + '_副本'])}
  onAddSheet={() => setSheets(prev => [...prev, '天-新Sheet'])}
  onReorderSheets={setSheets}
/>`} />
      </Section>

      <PropsTable props={[
        { name: 'sheets', type: 'string[]', required: true, description: 'Sheet 名称列表' },
        { name: 'activeSheet', type: 'string', required: true, description: '当前激活的 Sheet 名' },
        { name: 'sheetGranularities', type: "Record<string, 'day' | 'week' | 'month'>", required: true, description: '每个 Sheet 的时间粒度（用于重命名前缀显示）' },
        { name: 'onSelectSheet', type: '(name: string) => void', required: true, description: '切换 Sheet 回调' },
        { name: 'onRenameSheet', type: '(oldName: string, newName: string) => void', required: true, description: '重命名 Sheet 回调' },
        { name: 'onDeleteSheet', type: '(name: string) => void', required: true, description: '删除 Sheet 回调' },
        { name: 'onCopySheet', type: '(name: string) => void', required: true, description: '复制 Sheet 回调' },
        { name: 'onAddSheet', type: '() => void', required: true, description: '新增 Sheet 回调' },
        { name: 'onReorderSheets', type: '(sheets: string[]) => void', required: true, description: '拖拽排序后新顺序回调' },
      ]} />
    </div>
  )
}
