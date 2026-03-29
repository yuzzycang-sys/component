import React, { useState } from 'react'
import { DateRangeTrigger } from '../../components/DateRangePicker'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

export function DateRangePickerDemo() {
  const [start1, setStart1] = useState('2026-03-01')
  const [end1, setEnd1] = useState('2026-03-28')

  const [start2, setStart2] = useState('2026-03-10')
  const [end2, setEnd2] = useState('2026-03-20')

  const [start3, setStart3] = useState('')
  const [end3, setEnd3] = useState('')

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>DateRangePicker</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        日期范围选择器，支持快捷选项（今天 / 近 7 天 / 本月等）、双日历面板交互选择、日期直接输入。
        通常通过 <code style={{ background: '#f5f5f5', padding: '1px 5px', borderRadius: 3 }}>DateRangeTrigger</code> 使用，点击后弹出日历面板。
      </p>

      <Section title="基础用法（可清空）">
        <DemoBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <DateRangeTrigger
              start={start1}
              end={end1}
              onChange={(s, e) => { setStart1(s); setEnd1(e) }}
              clearable
              onClear={() => { setStart1(''); setEnd1('') }}
            />
            <span style={{ fontSize: 12, color: '#8c8c8c' }}>
              {start1 && end1 ? `已选：${start1} ~ ${end1}` : '（未选择）'}
            </span>
          </div>
        </DemoBox>
        <CodeBlock code={`import { DateRangeTrigger } from 'cetus-ui'

const [start, setStart] = useState('2026-03-01')
const [end, setEnd] = useState('2026-03-28')

<DateRangeTrigger
  start={start}
  end={end}
  onChange={(s, e) => { setStart(s); setEnd(e) }}
  clearable
  onClear={() => { setStart(''); setEnd('') }}
/>`} />
      </Section>

      <Section title="不可清空">
        <DemoBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <DateRangeTrigger
              start={start2}
              end={end2}
              onChange={(s, e) => { setStart2(s); setEnd2(e) }}
              clearable={false}
            />
            <span style={{ fontSize: 12, color: '#8c8c8c' }}>
              已选：{start2} ~ {end2}
            </span>
          </div>
        </DemoBox>
        <CodeBlock code={`<DateRangeTrigger
  start={start}
  end={end}
  onChange={(s, e) => { setStart(s); setEnd(e) }}
  clearable={false}
/>`} />
      </Section>

      <Section title="初始为空">
        <DemoBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <DateRangeTrigger
              start={start3}
              end={end3}
              onChange={(s, e) => { setStart3(s); setEnd3(e) }}
              clearable
              onClear={() => { setStart3(''); setEnd3('') }}
            />
            <span style={{ fontSize: 12, color: '#8c8c8c' }}>
              {start3 && end3 ? `已选：${start3} ~ ${end3}` : '点击选择日期范围'}
            </span>
          </div>
        </DemoBox>
        <CodeBlock code={`const [start, setStart] = useState('')
const [end, setEnd] = useState('')

<DateRangeTrigger
  start={start}
  end={end}
  onChange={(s, e) => { setStart(s); setEnd(e) }}
  clearable
  onClear={() => { setStart(''); setEnd('') }}
/>`} />
      </Section>

      <PropsTable props={[
        { name: 'start', type: 'string', required: true, description: '起始日期，格式 YYYY-MM-DD，空字符串表示未选' },
        { name: 'end', type: 'string', required: true, description: '结束日期，格式 YYYY-MM-DD' },
        { name: 'onChange', type: '(start: string, end: string) => void', required: true, description: '日期变化回调' },
        { name: 'clearable', type: 'boolean', required: false, default: 'true', description: '是否显示清空按钮' },
        { name: 'onClear', type: '() => void', required: false, description: '点击清空按钮回调，clearable=true 时生效' },
      ]} />
    </div>
  )
}
