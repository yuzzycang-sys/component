import React, { useState, useRef } from 'react'
import { LocalFilterPopover } from '../../components/LocalFilterPopover'
import type { LocalFilters } from '../../components/LocalFilterPopover'
import { Button } from 'antd'
import { Section } from '../components/Section'
import { DemoBox } from '../components/DemoBox'
import { CodeBlock } from '../components/CodeBlock'
import { PropsTable } from '../components/PropsTable'

export function LocalFilterDemo() {
  const [localFilters, setLocalFilters] = useState<LocalFilters>({
    optimizer: { values: ['张磊', '李明'] },
  })
  const [showPop, setShowPop] = useState(false)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleOpen = () => {
    if (showPop) { setShowPop(false); return }
    if (btnRef.current) {
      setAnchorRect(btnRef.current.getBoundingClientRect())
    }
    setShowPop(true)
  }

  const filterCount = Object.values(localFilters).filter(v => (v.values?.length ?? 0) > 0).length

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>LocalFilter</h1>
      <p style={{ color: '#666', fontSize: 15, marginBottom: 40 }}>
        局部筛选组件，用于在表格视图内对特定维度（优化师、游戏、媒体等）进行前端过滤。
      </p>

      <Section title="触发器 + 弹出面板">
        <DemoBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button
              ref={btnRef}
              size="small"
              type={showPop || filterCount > 0 ? 'primary' : 'default'}
              ghost={showPop || filterCount > 0}
              onClick={handleOpen}
              style={{ fontSize: 12, height: 28 }}
            >
              局部筛选{filterCount > 0 ? ` · ${filterCount}` : ''}
            </Button>
            <span style={{ fontSize: 13, color: '#8c8c8c' }}>
              {filterCount > 0
                ? <>已设置 <strong style={{ color: '#141414' }}>{filterCount}</strong> 项局部筛选</>
                : '（未设置局部筛选）'}
            </span>
          </div>
        </DemoBox>

        <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
          点击按钮可打开局部筛选面板，可对表格内的维度进行快速过滤。
        </div>

        <CodeBlock code={`import { LocalFilterPopover } from 'cetus-ui'
import type { LocalFilters } from 'cetus-ui'

const [localFilters, setLocalFilters] = useState<LocalFilters>({})
const [showPop, setShowPop] = useState(false)
const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)

{showPop && anchorRect && (
  <LocalFilterPopover
    localFilters={localFilters}
    onChangeFilters={setLocalFilters}
    anchorRect={anchorRect}
    onClose={() => setShowPop(false)}
  />
)}`} />
      </Section>

      <PropsTable props={[
        { name: 'localFilters', type: 'LocalFilters', required: true, description: '当前局部筛选值，Record<string, { values: string[]; exclude?: boolean }>' },
        { name: 'onChangeFilters', type: '(next: LocalFilters) => void', required: true, description: '筛选值变化回调' },
        { name: 'anchorRect', type: 'DOMRect', required: true, description: '触发按钮的 DOMRect，用于定位弹出层' },
        { name: 'onClose', type: '() => void', required: true, description: '关闭弹出层的回调' },
      ]} />

      {showPop && anchorRect && (
        <LocalFilterPopover
          localFilters={localFilters}
          onChangeFilters={setLocalFilters}
          anchorRect={anchorRect}
          onClose={() => setShowPop(false)}
        />
      )}
    </div>
  )
}
