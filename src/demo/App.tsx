import React, { useState, useEffect } from 'react'
import { TopNavDemo } from './pages/TopNavDemo'
import { SidebarDemo } from './pages/SidebarDemo'
import { ViewBarDemo } from './pages/ViewBarDemo'
import { FilterBarDemo } from './pages/FilterBarDemo'
import { DateRangePickerDemo } from './pages/DateRangePickerDemo'
import { MultiSelectChipDemo } from './pages/MultiSelectChipDemo'
import { QuickTagBarDemo } from './pages/QuickTagBarDemo'
import { MetricFilterDemo } from './pages/MetricFilterDemo'
import { LocalFilterDemo } from './pages/LocalFilterDemo'
import { SheetTabBarDemo } from './pages/SheetTabBarDemo'
import { TableToolBarDemo } from './pages/TableToolBarDemo'
import { DataTableDemo } from './pages/DataTableDemo'
import { PaginationDemo } from './pages/PaginationDemo'
import { ExportModalDemo } from './pages/ExportModalDemo'

const F = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

interface NavItem {
  label: string
  hash: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: '布局导航',
    items: [
      { label: 'TopNav', hash: '/top-nav' },
      { label: 'Sidebar', hash: '/sidebar' },
    ],
  },
  {
    title: '视图管理',
    items: [
      { label: 'ViewBar', hash: '/view-bar' },
    ],
  },
  {
    title: '筛选组件',
    items: [
      { label: 'FilterBar', hash: '/filter-bar' },
      { label: 'DateRangePicker', hash: '/date-range-picker' },
      { label: 'MultiSelectChip', hash: '/multi-select-chip' },
      { label: 'QuickTagBar', hash: '/quick-tag-bar' },
      { label: 'MetricFilter', hash: '/metric-filter' },
      { label: 'LocalFilter', hash: '/local-filter' },
    ],
  },
  {
    title: '表格组件',
    items: [
      { label: 'SheetTabBar', hash: '/sheet-tab-bar' },
      { label: 'TableToolBar', hash: '/table-toolbar' },
      { label: 'DataTable', hash: '/data-table' },
    ],
  },
  {
    title: '工具组件',
    items: [
      { label: 'Pagination', hash: '/pagination' },
      { label: 'ExportModal', hash: '/export-modal' },
    ],
  },
]

function getHash() {
  return window.location.hash.replace(/^#/, '') || '/'
}

function renderPage(hash: string) {
  switch (hash) {
    case '/top-nav':          return <TopNavDemo />
    case '/sidebar':          return <SidebarDemo />
    case '/view-bar':         return <ViewBarDemo />
    case '/filter-bar':       return <FilterBarDemo />
    case '/date-range-picker': return <DateRangePickerDemo />
    case '/multi-select-chip': return <MultiSelectChipDemo />
    case '/quick-tag-bar':    return <QuickTagBarDemo />
    case '/metric-filter':    return <MetricFilterDemo />
    case '/local-filter':     return <LocalFilterDemo />
    case '/sheet-tab-bar':    return <SheetTabBarDemo />
    case '/table-toolbar':    return <TableToolBarDemo />
    case '/data-table':       return <DataTableDemo />
    case '/pagination':       return <PaginationDemo />
    case '/export-modal':     return <ExportModalDemo />
    default:                  return <HomePage />
  }
}

function HomePage() {
  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: '#141414' }}>Cetus UI</h1>
      <p style={{ fontSize: 16, color: '#595959', marginBottom: 40, lineHeight: 1.8 }}>
        报表组件库 — 基于 cetus-pm 数据后台提炼的可复用 React 组件集合。<br />
        涵盖布局导航、视图管理、筛选、表格等常用场景组件。
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {NAV_GROUPS.map(g => (
          <div key={g.title} style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 20, background: '#fff' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              {g.title}
            </div>
            {g.items.map(item => (
              <a
                key={item.hash}
                href={`#${item.hash}`}
                style={{ display: 'block', fontSize: 14, color: '#1677ff', padding: '3px 0', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function DemoApp() {
  const [hash, setHash] = useState(getHash)

  useEffect(() => {
    const handler = () => setHash(getHash())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: F, background: '#f5f6f7' }}>
      {/* Sidebar */}
      <div style={{
        width: 240,
        flexShrink: 0,
        background: '#fff',
        borderRight: '1px solid #e8e8e8',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Logo */}
        <a
          href="#/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '20px 20px 16px' }}
        >
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: '#1677ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            color: '#fff',
            fontWeight: 700,
            flexShrink: 0,
          }}>
            C
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#141414' }}>Cetus UI</span>
        </a>

        <div style={{ height: 1, background: '#f0f0f0', margin: '0 0 8px' }} />

        {/* Nav groups */}
        {NAV_GROUPS.map(group => (
          <div key={group.title} style={{ padding: '8px 0' }}>
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#8c8c8c',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '4px 20px 6px',
            }}>
              {group.title}
            </div>
            {group.items.map(item => {
              const active = hash === item.hash
              return (
                <a
                  key={item.hash}
                  href={`#${item.hash}`}
                  style={{
                    display: 'block',
                    padding: '6px 20px',
                    fontSize: 13,
                    textDecoration: 'none',
                    borderRadius: 6,
                    margin: '1px 8px',
                    color: active ? '#1677ff' : '#333',
                    background: active ? '#e6f4ff' : 'transparent',
                    fontWeight: active ? 500 : 400,
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = '#f5f5f5' }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
        {renderPage(hash)}
      </div>
    </div>
  )
}
