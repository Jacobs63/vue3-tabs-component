<template>
  <div :class="wrapperClass">
    <ul
      role="tablist"
      :class="navClass"
    >
      <li
        v-for="(tab, i) in state.tabs"
        :key="i"
        :class="[ navItemClass, tab.isDisabled ? navItemDisabledClass : '', tab.isActive ? navItemActiveClass : (!tab.isDisabled ? navItemInactiveClass : '') ]"
        role="presentation"
      >
        <a
          role="tab"
          :class="[ navItemLinkClass, tab.isDisabled ? navItemLinkDisabledClass : '', tab.isActive ? navItemLinkActiveClass : (!tab.isDisabled ? navItemLinkInactiveClass : '') ]"
          :aria-controls="tab.paneId"
          :aria-selected="tab.isActive"
          :href="tab.hash"
          @click="selectTab(tab.hash, $event)"
          v-html="tab.header"
        />
      </li>
    </ul>
    <div :class="panelsWrapperClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import expiringStorage from "../expiringStorage"
import { defineExpose, onMounted, provide, reactive, toRefs } from "vue"
import { Tab, TabsState } from "../types"
import { AddTabKey, UpdateTabKey, DeleteTabKey, TabsProviderKey } from "../symbols"

const props = defineProps({
  cacheLifetime: {
    type: Number,
    default: 5
  },
  options: {
    type: Object,
    required: false,
    default: () => ({
      useUrlFragment: true,
      defaultTabHash: null
    })
  },
  wrapperClass: {
    type: String,
    default: "tabs-component"
  },
  panelsWrapperClass: {
    type: String,
    default: "tabs-component-panels"
  },
  navClass: {
    type: String,
    default: "tabs-component-tabs"
  },
  navItemClass: {
    type: String,
    default: "tabs-component-tab"
  },
  navItemDisabledClass: {
    type: String,
    default: "is-disabled"
  },
  navItemActiveClass: {
    type: String,
    default: "is-active"
  },
  navItemInactiveClass: {
    type: String,
    default: "is-inactive"
  },
  navItemLinkClass: {
    type: String,
    default: "tabs-component-tab-a"
  },
  navItemLinkActiveClass: {
    type: String,
    default: "is-active"
  },
  navItemLinkInactiveClass: {
    type: String,
    default: "is-inactive"
  },
  navItemLinkDisabledClass: {
    type: String,
    default: "is-disabled"
  }
})

const emit = defineEmits(["changed", "clicked"])

const state: TabsState = reactive({
  activeTabHash: "",
  lastActiveTabHash: "",
  tabs: []
})

provide(TabsProviderKey, state)

provide(AddTabKey, (tab) => {
  state.tabs.push(tab)
})

provide(UpdateTabKey, (computedId: string, data: Tab) => {
  const tabIndex = state.tabs.findIndex((tab) => tab.computedId === computedId)

  data.isActive = state.tabs[tabIndex].isActive

  state.tabs[tabIndex] = data
})

provide(DeleteTabKey, (computedId) => {
  const tabIndex = state.tabs.findIndex((tab) => tab.computedId === computedId)

  state.tabs.splice(tabIndex, 1)
})

const selectTab = (selectedTabHash: string, event?: Event): void => {
  if (event && !props.options.useUrlFragment) {
    event.preventDefault()
  }

  const selectedTab = findTab(selectedTabHash)

  if (!selectedTab) {
    return
  }

  if (event && selectedTab.isDisabled) {
    event.preventDefault()
    return
  }

  if (state.lastActiveTabHash === selectedTab.hash) {
    emit("clicked", { tab: selectedTab })
    return
  }

  state.tabs.forEach(tab => {
    tab.isActive = (tab.hash === selectedTab.hash)
  })

  emit("changed", { tab: selectedTab })

  state.lastActiveTabHash = state.activeTabHash = selectedTab.hash

  if (props.cacheLifetime <= 0) {
    return
  }

  const storageKey = `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`

  expiringStorage.set(storageKey, selectedTab.hash, props.cacheLifetime)
}

const findTab = (hash: string): Tab | undefined => {
  return state.tabs.find(tab => tab.hash === hash)
}

onMounted(() => {
  if (!state.tabs.length) {
    return
  }

  window.addEventListener("hashchange", () => selectTab(window.location.hash))

  if (findTab(window.location.hash)) {
    selectTab(window.location.hash)
    return
  }

  if (props.cacheLifetime > 0) {
    const storageKey = `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`

    const previousSelectedTabHash = expiringStorage.get(storageKey)

    if (previousSelectedTabHash !== null && findTab(previousSelectedTabHash)) {
      selectTab(previousSelectedTabHash)
      return
    }

    if (props.options.defaultTabHash && findTab("#" + props.options.defaultTabHash)) {
      selectTab("#" + props.options.defaultTabHash)
      return
    }
  }

  selectTab(state.tabs[0].hash)
})

defineExpose({
  ...toRefs(state),
  selectTab,
  findTab
})
</script>
