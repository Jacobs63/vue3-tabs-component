import { InjectionKey } from "vue"
import { TabsState, AddTab, UpdateTab, DeleteTab } from "./types"

export const AddTabKey: InjectionKey<AddTab> = Symbol("addTab")

export const UpdateTabKey: InjectionKey<UpdateTab> = Symbol("updateTab")

export const DeleteTabKey: InjectionKey<DeleteTab> = Symbol("deleteTab")

export const TabsProviderKey: InjectionKey<TabsState> = Symbol("tabsProvider")