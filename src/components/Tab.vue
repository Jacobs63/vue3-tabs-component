<template>
  <section v-show="isActive"
           :aria-hidden="! isActive"
           :class="panelClass"
           :id="computedId"
           role="tabpanel"
           ref="tab"
  >
    <slot/>
  </section>
</template>

<script>
import {inject, watch, ref, onBeforeMount, onBeforeUnmount} from 'vue';

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
    const hash = '#' + (!props.isDisabled ? computedId : '')

    watch(
        () => tabsProvider.activeTabHash,
        () => {
          isActive.value = hash === tabsProvider.activeTabHash
        }
    )

    watch(() => Object.assign({}, props), () => {
      updateTab(computedId, {
        name: props.name,
        header: props.prefix + props.name + props.suffix,
        isDisabled: props.isDisabled,
        hash: hash,
        index: tabsProvider.tabs.length,
        computedId: computedId
      })
    })

    onBeforeMount(() => {
      addTab({
        name: props.name,
        header: header,
        isDisabled: props.isDisabled,
        hash: hash,
        index: tabsProvider.tabs.length,
        computedId: computedId
      })
    })

    onBeforeUnmount(() => {
      deleteTab(computedId)
    })

    return {
      header,
      computedId,
      hash,
      isActive
    }
  }
};
</script>
