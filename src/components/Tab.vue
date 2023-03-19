<template>
  <section
    v-show="isActive"
    ref="tab"
    :id="paneId"
    :data-tab-id="computedId"
    :aria-hidden="! isActive"
    :class="panelClass"
    role="tabpanel"
  >
    <slot />
  </section>
</template>

<script>
import {inject, watch, ref, computed, onBeforeMount, onBeforeUnmount} from 'vue'

export default {
  name: 'Tab',
  props: {
    panelClass: {
      type: String,
      default: 'tabs-component-panel'
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
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
  },

  setup(props) {
    const isActive = ref(false)

    const tabsProvider = inject('tabsProvider')
    const addTab = inject('addTab')
    const updateTab = inject('updateTab')
    const deleteTab = inject('deleteTab')

    const header = props.prefix + props.name + props.suffix
    const computedId = props.id ? props.id : props.name.toLowerCase().replace(/ /g, '-')
    const paneId = computedId + '-pane'
    const hash = computed(() => '#' + (!props.isDisabled ? computedId : ''))

    watch(
      () => tabsProvider.activeTabHash,
      () => {
        isActive.value = hash.value === tabsProvider.activeTabHash
      }
    )

    watch(() => Object.assign({}, props), () => {
      updateTab(computedId, {
        name: props.name,
        header: props.prefix + props.name + props.suffix,
        isDisabled: props.isDisabled,
        hash: hash.value,
        index: tabsProvider.tabs.length,
        computedId: computedId,
        paneId: paneId
      })
    })

    onBeforeMount(() => {
      addTab({
        name: props.name,
        header: header,
        isDisabled: props.isDisabled,
        hash: hash.value,
        index: tabsProvider.tabs.length,
        computedId: computedId,
        paneId: paneId
      })
    })

    onBeforeUnmount(() => {
      deleteTab(computedId)
    })

    return {
      header,
      computedId,
      paneId,
      hash,
      isActive
    }
  }
};
</script>
