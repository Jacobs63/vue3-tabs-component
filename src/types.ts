export interface PushTabOptions {
  name: string
  header: string
  isDisabled: boolean
  hash: string
  index: number
  computedId: string
  paneId: string
}

export interface Tab extends PushTabOptions {
  panelClass?: string
  id?: string
  prefix?: string
  suffix?: string
  isActive?: boolean
}

export interface Tabs {
  cacheLifetime: number
  options: {
    useUrlFragment?: boolean
    defaultTabHash?: string | null
  }
  wrapperClass: string
  navClass: string
  navItemClass: string
  navItemDisabledClass: string
  navItemActiveClass: string
  navItemInactiveClass: string
  navItemLinkClass: string
  navItemLinkActiveClass: string
  navItemLinkInactiveClass: string
  navItemLinkDisabledClass: string
}

export interface TabsState {
  activeTabHash: string
  lastActiveTabHash: string
  tabs: Array<Tab>
}

export type AddTab = (tab: PushTabOptions) => void

export type UpdateTab = (computedId: string, tab: PushTabOptions) => void

export type DeleteTab = (computedId: string) => void

export interface ExpiringStorage {
  get(key: string): string | null
  set(key: string, value: string, ttl: number): void
}