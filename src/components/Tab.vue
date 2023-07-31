<template>
  <section
    v-show="isActive"
    ref="tab"
    :id="paneId"
    :data-tab-id="computedId"
    :aria-hidden="!isActive"
    :class="panelClass"
    role="tabpanel"
    tabindex="-1"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed, defineExpose, onBeforeMount, onBeforeUnmount, PropType, ref, watch } from "vue"
import { TabsProviderKey, AddTabKey, UpdateTabKey, DeleteTabKey } from "../symbols"
import { injectStrict } from "../utils"

type ClassPropShape = string | Record<string, boolean> | Array<string | Record<string, boolean>>

const props = defineProps({
  panelClass: {
    type: [String, Object, Array] as PropType<ClassPropShape>,
    default: "tabs-component-panel"
  },
  id: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    default: ""
  },
  suffix: {
    type: String,
    default: ""
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  navItemClass: {
    type: [String, Object, Array] as PropType<ClassPropShape>,
    required: false,
    default: null
  },
  navItemLinkClass: {
    type: [String, Object, Array] as PropType<ClassPropShape>,
    required: false,
    default: null
  }
})

const isActive = ref(false)

const tabsProvider = injectStrict(TabsProviderKey)
const addTab = injectStrict(AddTabKey)
const updateTab = injectStrict(UpdateTabKey)
const deleteTab = injectStrict(DeleteTabKey)

const header = props.prefix + props.name + props.suffix
const computedId = props.id
  ? props.id
  : props.name.toLowerCase().replace(/ /g, "-")
const paneId = computedId + "-pane"
const hash = computed(() => "#" + (!props.isDisabled ? computedId : ""))

watch(
  () => tabsProvider.activeTabHash,
  () => {
    isActive.value = hash.value === tabsProvider.activeTabHash
  }
)

watch(
  () => Object.assign({}, props),
  () => {
    updateTab(computedId, {
      name: props.name,
      header: props.prefix + props.name + props.suffix,
      isDisabled: props.isDisabled,
      hash: hash.value,
      index: tabsProvider.tabs.length,
      computedId: computedId,
      paneId: paneId,
      navItemClass: props.navItemClass,
      navItemLinkClass: props.navItemLinkClass,
    })
  }
)

onBeforeMount(() => {
  addTab({
    name: props.name,
    header: header,
    isDisabled: props.isDisabled,
    hash: hash.value,
    index: tabsProvider.tabs.length,
    computedId: computedId,
    paneId: paneId,
    navItemClass: props.navItemClass,
    navItemLinkClass: props.navItemLinkClass
  })
})

onBeforeUnmount(() => {
  deleteTab(computedId)
})

defineExpose({
  header,
  computedId,
  paneId,
  hash,
  isActive
})
</script>
