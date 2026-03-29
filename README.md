# cetus-ui

> 报表组件库 — 基于 cetus-pm 数据后台提炼的可复用 React 组件集合

---

## 安装

```bash
npm install cetus-ui
# 同时需要安装 peer dependencies
npm install antd lucide-react react react-dom
```

---

## 快速上手

```tsx
import { FilterBar, SheetTabBar, DataTable, QuickTagBar } from 'cetus-ui';
import 'antd/dist/reset.css';
```

---

## 组件一览

| 类别 | 组件 | 说明 |
|------|------|------|
| 布局导航 | `TopNav` | 顶部导航栏 |
| 布局导航 | `Sidebar` | 左侧层级菜单 |
| 视图管理 | `ViewBar` | 视图选择/保存/分享入口 |
| 视图管理 | `ViewSelectorDropdown` | 视图列表下拉 |
| 视图管理 | `SaveMenu` | 保存操作菜单 |
| 视图管理 | `SaveAsNewViewModal` | 新建视图弹窗 |
| 视图管理 | `UpdateViewModal` | 更新视图弹窗 |
| 视图管理 | `ShareViewModal` | 分享权限弹窗 |
| 筛选 | `FilterBar` | 主筛选栏 |
| 筛选 | `AllFiltersPopover` | 全量筛选项面板 |
| 筛选 | `DateRangePicker` | 日期范围选择器 |
| 筛选 | `PriceRangePicker` | 价格/ROI 范围输入 |
| 筛选 | `MultiSelectChip` | 多选下拉 chip |
| 筛选 | `AccountInputChip` | 账户 ID/名称输入 chip |
| 筛选 | `LocalFilterPopover` | 局部筛选面板 |
| 筛选 | `MetricFilterPopover` | 指标筛选组合面板 |
| 筛选 | `QuickTagBar` | 快捷标签栏 |
| 筛选 | `QuickTagModal` | 标签管理弹窗 |
| 表格 | `SheetTabBar` | 多 sheet 标签页 |
| 表格 | `TableToolBar` | 表格控制工具栏 |
| 表格 | `AggregateDimensionPopover` | 聚合维度选择面板 |
| 表格 | `DataTable` | 主数据表格 |
| 工具 | `Pagination` | 分页控件 |
| 工具 | `ExportModal` | 导出弹窗 |

---

## 组件文档

### TopNav

顶部导航栏，展示 logo、导航菜单、通知、用户信息。

```tsx
<TopNav />
```

---

### Sidebar

左侧可折叠层级导航菜单（平台 → 子菜单两级结构）。

```tsx
<Sidebar />
```

---

### ViewBar

视图管理工具栏，集成视图选择、置顶、保存、分享。

```tsx
<ViewBar
  views={views}                    // ViewItem[]
  selectedView={selectedView}      // string | null
  pinnedViews={pinnedViews}        // string[]
  activePinnedTag={activePinnedTag}// string | null
  onSelectView={(name) => {}}
  onTogglePin={(id) => {}}
  onSaveNew={(item) => {}}
  onClickPinnedTag={(name) => {}}
  onShareView={(viewId, mode, users, misalignedTags) => {}}
/>
```

**ViewItem:**
```ts
interface ViewItem {
  id: string;
  name: string;
  type: 'my' | 'shared' | 'public';
  owner: string;
  pinned: boolean;
  shareMode?: 'private' | 'specific' | 'public';
  sharedWith?: string[];
  tag_ids?: string[];
}
```

---

### FilterBar

主筛选栏，集成日期、维度、账户等全部筛选入口。

```tsx
<FilterBar
  activeFilters={activeFilters}          // string[]
  onToggleFilter={(key) => {}}
  dateStart="2026-01-01"
  dateEnd="2026-01-31"
  onDateChange={(start, end) => {}}
  filterSelections={filterSelections}    // Record<string, string[]>
  onFilterSelect={(key, values) => {}}
  priceRange={{ min: 0, max: 999, roiMin: 0, roiMax: 999 }}
  onPriceRangeChange={(min, max, roiMin, roiMax) => {}}
  channelLocked={false}
  onChannelLockedClick={() => {}}
/>
```

---

### MultiSelectChip

多选下拉筛选 chip，支持列表/批量输入、精确/模糊匹配、排除模式。

```tsx
<MultiSelectChip
  label="游戏名称"
  options={['大咖', '乐乐', '星海']}
  selected={[]}
  onChange={(values) => {}}
  exclude={false}
  onExcludeChange={(v) => {}}
/>
```

---

### AccountInputChip

账户 ID/名称文本输入 chip，支持批量粘贴。

```tsx
<AccountInputChip
  label="账户"
  subType="id"                // 'id' | 'name'
  values={[]}
  onChange={(values) => {}}
  matchMode="exact"           // 'exact' | 'fuzzy'
  exclude={false}
  onExcludeChange={(v) => {}}
/>
```

---

### DateRangePicker

独立双日历日期范围选择器，支持快捷选项。

```tsx
<DateRangePicker
  start="2026-01-01"
  end="2026-01-31"
  onChange={(start, end) => {}}
  onClose={() => {}}
/>
```

---

### QuickTagBar

快捷标签栏，支持多彩标签切换、拖拽排序、标签管理入口。

```tsx
<QuickTagBar
  tags={tags}                    // QuickTag[]
  onToggleTag={(id) => {}}
  onManage={() => {}}
  onReorderTags={(tags) => {}}
/>
```

**QuickTag:**
```ts
interface QuickTag {
  id: string;
  label: string;
  color: string;           // 颜色 key 或 hex
  active: boolean;
  owner: string;
  updatedAt?: string;
  mainChannels: string[];  // 如 "大咖-头条-头条btt"
  subChannels: string[];
  vis: 'private' | 'partial' | 'public';
  authUsers: string[];
}
```

---

### MetricFilterPopover / MetricFilterEditModal

指标筛选组合面板，支持多条件 AND/OR 编辑与保存。

```tsx
// 下拉面板
<MetricFilterPopover
  combinations={filterCombinations}  // FilterCombination[]
  activeId={activeFilterId}
  anchorRect={anchorRect}            // DOMRect
  onSelect={(id) => {}}
  onEdit={(combo) => {}}
  onDelete={(id) => {}}
  onNew={() => {}}
  onClose={() => {}}
/>

// 编辑弹窗（null = 新建）
<MetricFilterEditModal
  initial={editingCombo}
  onSave={(combo) => {}}
  onClose={() => {}}
/>
```

---

### LocalFilterPopover

局部筛选面板，针对表格各列进行本地过滤。

```tsx
<LocalFilterPopover
  localFilters={localFilters}        // LocalFilters
  onChangeFilters={(filters) => {}}
  anchorRect={anchorRect}
  onClose={() => {}}
/>
```

---

### SheetTabBar

多 sheet 标签页导航，支持增删改名、拖拽排序。

```tsx
<SheetTabBar
  sheets={sheets}                              // string[]
  activeSheet={activeSheet}
  sheetGranularities={granularities}           // Record<string, 'day'|'week'|'month'>
  onSelectSheet={(name) => {}}
  onRenameSheet={(oldName, newName) => {}}
  onDeleteSheet={(name) => {}}
  onCopySheet={(name) => {}}
  onAddSheet={() => {}}
  onReorderSheets={(sheets) => {}}
/>
```

---

### TableToolBar

表格控制工具栏，集成时度切换、聚合维度、筛选、视图模式、查询导出。

```tsx
<TableToolBar
  timeGranularity="day"              // 'day' | 'week' | 'month'
  onChangeGranularity={(g) => {}}
  activeDims={['time', 'media']}
  onChangeDims={(dims) => {}}
  viewMode="list"                    // 'list' | 'grid'
  onChangeViewMode={(m) => {}}
  mergeView={false}
  onChangeMergeView={(v) => {}}
  onQuery={() => {}}
  onExport={() => {}}
  filterCombinations={[]}
  activeFilterId={null}
  onSelectFilter={(id) => {}}
  onSaveFilter={(combo) => {}}
  onDeleteFilter={(id) => {}}
  localFilters={{}}
  onChangeLocalFilters={(f) => {}}
  dimAutoUpdate={false}
  onChangeDimAutoUpdate={(v) => {}}
/>
```

---

### DataTable

主数据表格，支持维度列合并、指标筛选、列表/聚合视图。

```tsx
<DataTable
  activeDims={activeDims}
  timeGranularity="day"
  viewMode="list"
  mergeView={false}
  filterCombinations={[]}
  activeFilterId={null}
  localFilters={{}}
/>
```

---

### Pagination

分页控件。

```tsx
<Pagination
  current={1}
  total={200}
  pageSize={20}
  onChange={(page, pageSize) => {}}
/>
```

---

### ExportModal

数据导出弹窗，选择要导出的 sheet。

```tsx
<ExportModal
  open={open}
  sheets={sheets}
  onClose={() => {}}
  onExport={(selectedSheets) => {}}
/>
```

---

## 完整页面示例

```tsx
import {
  TopNav, Sidebar, ViewBar,
  FilterBar, QuickTagBar,
  SheetTabBar, TableToolBar, DataTable, Pagination,
} from 'cetus-ui';

export default function ReportPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <main style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          overflow: 'hidden', background: '#f2f3f5',
        }}>
          {/* 视图栏 */}
          <div style={{ background: '#fff', borderBottom: '1px solid #f0f1f3', position: 'sticky', top: 0, zIndex: 10 }}>
            <ViewBar {...viewBarProps} />
          </div>

          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 12, gap: 12 }}>
            {/* 筛选卡片 */}
            <div style={{ background: '#fff', borderRadius: 8 }}>
              <FilterBar {...filterBarProps} />
              <QuickTagBar {...quickTagProps} />
            </div>

            {/* 表格卡片 */}
            <div style={{ flex: 1, background: '#fff', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <SheetTabBar {...sheetProps} />
              <TableToolBar {...toolBarProps} />
              <DataTable {...tableProps} />
              <Pagination {...pageProps} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
```

---

## 构建

```bash
npm run build
# 输出：dist/cetus-ui.es.js  dist/cetus-ui.cjs.js  dist/index.d.ts
```

## 依赖要求

| 依赖 | 版本 |
|------|------|
| react | ≥ 18 |
| react-dom | ≥ 18 |
| antd | ≥ 5.0 |
| lucide-react | ≥ 0.300 |
