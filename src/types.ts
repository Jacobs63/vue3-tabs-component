type ClassPropShape = string | Record<string, boolean> | Array<string | Record<string, boolean>>

export interface PushTabOptions {
  name: string
  header: string
  isDisabled: boolean
  hash: string
  index: number
  computedId: string
  paneId: string
  navItemClass?: ClassPropShape
  navItemLinkClass?: ClassPropShape
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
  wrapperClass: ClassPropShape
  navClass: ClassPropShape
  navItemClass: ClassPropShape
  navItemDisabledClass: ClassPropShape
  navItemActiveClass: ClassPropShape
  navItemInactiveClass: ClassPropShape
  navItemLinkClass: ClassPropShape
  navItemLinkActiveClass: ClassPropShape
  navItemLinkInactiveClass: ClassPropShape
  navItemLinkDisabledClass: ClassPropShape
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