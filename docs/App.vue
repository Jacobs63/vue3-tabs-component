<template>
  <h1 class="page-title">
    <a href="https://github.com/Jacobs63/vue3-tabs-component">Vue-tabs-component</a>
  </h1>
  <tabs>
    <tab name="First tab">
      <h2 class="page-subtitle">First tab</h2>
      This is the content of the first tab.
    </tab>
    <tab name="Second tab">
      <h2 class="page-subtitle">Second tab</h2>
      This is the content of the second tab.
    </tab>
    <tab name="Disabled tab" :is-disabled="true">
      <h2 class="page-subtitle">Disabled tab</h2>
      This content will be unavailable while :is-disabled prop set to true
    </tab>
    <tab id="oh-hi-mark" name="Custom fragment">
      <h2 class="page-subtitle">Custom fragment</h2>
      The hash that is appended to the url can be customized.
    </tab>
    <tab prefix="<span class='prefix'>→</span>" name="Prefix and suffix" suffix="<span class='suffix'>4</span>">
      <h2 class="page-subtitle">Prefix and suffix</h2>
      A prefix and a suffix can be added — HTML allowed.
    </tab>
  </tabs>

  <section class="page-about">
    <h2 class="page-subtitle">About</h2>
    <p>
      The tab component above is powered by <a href="https://github.com/Jacobs63/vue3-tabs-component">jacobs63/vue3-tabs-component</a>.
    </p>

    <p>The component will use the <strong>fragment</strong> of the url to choose which tab to open. So clicking
      <a href="#second-tab">#second-tab</a>
      will display the contents of the tab named <code>Second tab</code>.</p>

    <p>The component will also <strong>remember</strong>
      which tab was opened previously. If you <a href="https://tabs-component.jakubotocky.sk">reload without fragment</a>
      the tab that is currently active will receive focus again. More about this feature <a href="https://github.com/Jacobs63/vue3-tabs-component#remembering-the-last-opened-tab">on Github</a>.
    </p>
  </section>

  <small class="page-outro">
    <a href="https://github.com/Jacobs63/vue3-tabs-component">Code on Github</a> |
    Maintained by <a href="https://jakubpotocky.sk">Jakub Potocký</a>
  </small>
</template>