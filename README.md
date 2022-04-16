# A Vue component to easily render tabs

[![Latest Version on NPM](https://img.shields.io/npm/v/vue3-tabs-component.svg?style=flat-square)](https://npmjs.com/package/vue3-tabs-component)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue3-tabs-component.svg?style=flat-square)](https://www.npmjs.com/package/vue3-tabs-component)

The package contains a [Vue 3](https://vuejs.org/) component to easily display some tabs.

This is how they can be used:
=
```html
<div>
    <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged" nav-item-class="nav-item">
        <tab name="First tab">
            This is the content of the first tab
        </tab>
        <tab name="Second tab">
            This is the content of the second tab
        </tab>
        <tab name="Disabled tab" :is-disabled="true">
            This content will be unavailable while :is-disabled prop set to true
        </tab>
        <tab id="oh-hi-mark" name="Custom fragment">
            The fragment that is appended to the url can be customized
        </tab>
        <tab prefix="<span class='glyphicon glyphicon-star'></span> " 
             name="Prefix and suffix" 
             suffix=" <span class='badge'>4</span>">
            A prefix and a suffix can be added
        </tab>
    </tabs>
</div>
```

When reloading the page the component will automatically [display the tab that was previously opened](https://github.com/jacobs63/vue3-tabs-component#remembering-the-last-opened-tab).

The rendered output adheres to [the ARIA specification](http://heydonworks.com/practical_aria_examples/#tab-interface).

## Demo
The package demo is available at https://tabs-component.jakubpotocky.sk

## Installation

You can install the package via yarn:

```bash
yarn add vue3-tabs-component
```

or npm:

```bash
npm install vue3-tabs-component --save
```

## Usage

The most common use case is to register the components globally:

```js
import { createApp } from 'vue'
import {Tabs, Tab} from 'vue3-tabs-component';

createApp(App)
    .component('tabs', Tabs)
    .component('tab', Tab)
    .mount('#app')
```

Alternatively you can do this to register the components:

```js
import Vue from 'vue';
import {Tabs, Tab} from 'vue3-tabs-component';

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
```

On your page you can now use html like this to render tabs: 

```html
<div>
    <tabs>
        <tab name="First tab">
            First tab content
        </tab>
        <tab name="Second tab">
            Second tab content
        </tab>
        <tab name="Third tab">
            Third tab content
        </tab>
    </tabs>
</div>
```

By default, it will show the first tab.

If you click on a tab a `href` representation of the name will be append to the url. For example clicking on the tab `Second tab` will append `#second-tab` to the url.

When loading a page with a fragment that matches the `href` of a tab, it will open up that tab. For example visiting `/#third-tab` will open up the tab with name `Third tab`.

### Remembering the last opened tab

By default, the component will remember which was the last open tab for 5 minutes. If you, for instance, click on `Third tab` and then visit `/` the third tab will be opened.

You can change the cache lifetime by passing the lifetime in minutes in the `cache-lifetime` property of the `tabs` component.

```html
<tabs cache-lifetime="10">
  ...
</tabs>
```

### Disable modifying the url fragment

When using with other libraries that use the url fragment, you can disable modifying the url fragment by passing the `useUrlFragment` options. This helps using it with vue-router, or using vue3-tabs-component twice in the same page.

```html
<tabs :options="{ useUrlFragment: false }">
  ...
</tabs>
```

### Callbacks
Tabs have two events to which you can bind: `changed` and `clicked`

```html
<tabs @clicked="tabClicked" @changed="tabChanged">
  ...
</tabs>
```
For example:
```js
export default {
    methods: {
        tabClicked (selectedTab) {
            console.log('Current tab re-clicked:' + selectedTab.tab.name)
        },
        tabChanged (selectedTab) {
            console.log('Tab changed to:' + selectedTab.tab.name)
        }
    }
}
```

`changed` is emitted when the tab changes and can be used as handle to load data on request.
`clicked` is emitted when an active tab is re-clicked and can be used to e.g. reload the data in the current tab.

### Adding a suffix and a prefix to the tab name

You can add a suffix and a prefix to the tab by using the `suffix` and `prefix` attributes, which can contain HTML.

```html
<tab prefix="my prefix - " name="First tab" suffix=" - my suffix">
    First tab content
</tab>
```

The title of the tab will now be `my prefix - First tab - my suffix`.

The fragment that's added to the url when clicking the tab will only be based on the `name` of a tab, the `name-prefix` and `name-suffix` attributes will be ignored.

### Customizing fragments

When clicking on a tab it's name will be used as a fragment in the url. For example clicking on the `Second tab` will append `#second-tab` to the current url. 

You can customize that fragment by using the `id` attribute.

```html
<div>
    <tabs>
        <tab id="custom-fragment" name="My tab">
            First tab content
        </tab>
    </tabs>
</div>
```

Clicking on `My tab` will then append `#custom-fragment` to the url.


### Setting a default tab

When disabling the cache, it can be useful to specify a default tab to load which is not the first one. You can select this by passing the `defaultTabHash` option.

```html
<tabs :options="{ defaultTabHash: 'second-tab' }">
    <tab id="first-tab" name="First tab">
        First tab content
    </tab>
    <tab id="second-tab" name="Default tab">
        Second tab content
    </tab>
</tabs>
```

### CSS

Each node can be styled by specifying classes.

The output HTML classes can be overridden by using the following `Tabs` component attributes:
- `wrapper-class`
- `panels-wrapper-class`
- `nav-class`
- `nav-item-class`
- `nav-item-active-class`
- `nav-item-disabled-class`
- `nav-item-link-class`
- `nav-item-link-active-class`
- `nav-item-link-disabled-class`

The `Tab` content (section) class can be overridden with the `panel-class` attribute 

If no custom classes are set, the following classes are used as default:
```html
<div class="tabs-component"> // wrapper-class
    <ul class="tabs-component-tabs"> // nav-class
        <li class="tabs-component-tab is-disabled"> // nav-item-class + nav-item-disabled-class
            <a class="tabs-component-tab-a is-disabled">…</a> // nav-item-link-class + nav-item-link-disabled-class
        </li>
        <li class="tabs-component-tab is-active"> // nav-item-class + nav-item-active-class
            <a class="tabs-component-tab-a is-active">…</a> // nav-item-link-class + nav-item-link-active-class
        </li>
    </ul>
    <div class="tabs-component-panels"> // panels-wrapper-class
        <section class="tabs-component-panel"> // Tab > panel-class
            …
        </section>
    </div>
</div>
```

## Security

If you discover any security related issues, please contact [Jakub Potocký](https://github.com/jacobs63) instead of using the issue tracker.

## Credits

- [Spatie](https://spatie.be)
- [Freek Van der Herten](https://github.com/freekmurze)
- [Willem Van Bockstal](https://github.com/willemvb)
- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

**This package is a fork of the popular `spatie/vue-tabs-component` Vue 2 package, which has been discontinued by Spatie**

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
