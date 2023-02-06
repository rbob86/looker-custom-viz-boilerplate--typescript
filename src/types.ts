export interface Looker {
  plugins: {
    visualizations: {
      add: (visualization: Visualization) => void
    }
  }
}

export enum CrossfilterSelection {
  NONE = 0,
  SELECTED = 1,
  UNSELECTED = 2,
}

export interface LookerChartUtils {
  Utils: {
    openDrillMenu: (options: { links: Link[]; event: object }) => void
    openUrl: (url: string, event: object) => void
    textForCell: (cell: Cell) => string
    filterableValueForCell: (cell: Cell) => string
    htmlForCell: (cell: Cell, context?: string, fieldDefinitionForCell?: any, customHtml?: string) => string
    toggleCrossfilter: (options: { row?: Row; pivot?: Pivot; event?: string }) => void
    getCrossfilterSelection: (row: Row) => CrossfilterSelection
  }
}

export interface Visualization {
  id?: string
  label?: string
  options: VisOptions
  addError?: (error: VisualizationError) => void
  clearErrors?: (errorName?: string) => void
  create: (element: HTMLElement, settings: VisConfig) => void
  trigger?: (event: string, config: object) => void
  update?: (
    data: VisData,
    element: HTMLElement,
    config: VisConfig,
    queryResponse: VisQueryResponse,
    details?: VisUpdateDetails
  ) => void
  updateAsync?: (
    data: VisData,
    element: HTMLElement,
    config: VisConfig,
    queryResponse: VisQueryResponse,
    details: VisUpdateDetails | undefined,
    updateComplete: () => void
  ) => void
  destroy?: () => void
}

export interface VisOptions {
  [optionName: string]: VisOption
}

export interface QueryField {
  align: string
  can_filter: boolean
  can_time_filter: boolean
  category: string
  default_filter_value: string | null
  description: string | null
  dimension_group: string | null
  dynamic: boolean
  enumerations: any[] | null
  error: null
  field_group_label: null
  field_group_variant: string
  fill_style: string
  filters: null
  fiscal_month_offset: number
  has_allowed_values: boolean
  hidden: boolean
  is_filter: boolean
  is_fiscal: boolean
  is_numeric: boolean
  is_timeframe: boolean
  label: string
  label_from_parameter: null
  label_short: string
  lookml_link: string
  map_layer?: null
  measure: boolean
  name: string
  parameter: boolean
  permanent: null
  primary_key: boolean
  project_name: string
  requires_refresh_on_sort: boolean
  scope: string
  sortable: boolean
  sorted?: boolean
  source_file: string
  source_file_path: string
  sql: string | null
  sql_case: null
  strict_value_format: boolean
  suggest_dimension: string
  suggest_explore: string
  suggestable: boolean
  suggestions: any[] | null
  tags: string[]
  time_interval: null
  type: string
  user_attribute_filter_types: string[]
  value_format: string | null
  view: string
  view_label: string
  week_start_day: string
}

export interface VisQueryResponse {
  [key: string]: any
  data: VisData
  fields: {
    dimension_like: QueryField[]
    dimensions: QueryField[]
    measure_like: QueryField[]
    measures: QueryField[]
    pivots: QueryField[]
    table_calculations: QueryField[]
  }
  pivots: Pivot[]
}

export interface Pivot {
  key: string
  is_total: boolean
  data: { [key: string]: string }
  metadata: { [key: string]: { [key: string]: string } }
}

export interface Link {
  label: string
  type: string
  type_label: string
  url: string
}

export interface Cell {
  [key: string]: any
  value: any
  rendered?: string
  html?: string
  links?: Link[]
}

export interface FilterData {
  add: string
  field: string
  rendered: string
}

export interface PivotCell {
  [pivotKey: string]: Cell
}

export interface Row {
  [fieldName: string]: PivotCell | Cell
}

export type VisData = Row[]

export interface VisConfig {
  [key: string]: VisConfigValue
}

export type VisConfigValue = any

interface Crossfilter {
  field: string
  values: any[]
}

export interface VisUpdateDetails {
  changed: {
    config?: string[]
    data?: boolean
    queryResponse?: boolean
    size?: boolean
  }
  crossfilterEnabled: boolean
  crossFilters: Crossfilter[]
  print: boolean
}

export interface VisOption {
  type: string
  values?: VisOptionValue[]
  display?: string
  default?: any
  label: string
  section?: string
  placeholder?: string
  display_size?: 'half' | 'third' | 'normal'
  order?: number
  min?: number
  max?: number
  step?: number
  required?: boolean
  supports?: string[]
}

export interface VisOptionValue {
  [label: string]: string
}

export interface VisualizationError {
  group?: string
  message?: string
  title?: string
  retryable?: boolean
  warning?: boolean
}
