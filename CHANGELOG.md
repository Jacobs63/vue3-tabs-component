# Changelog

All notable changes to `vue3-tabs-component` will be documented in this file

## 1.3.3 - 2023-07-31
- Fix tabs navigation element losing focus on click

## 1.3.2 - 2023-04-08
- Fix referencing non-existent module files in `package.json`

## 1.3.1 - 2023-04-08
- Disable caching if `cache-lifetime` is set as `0`

## 1.3.0 - 2023-04-08
- Refactor package to TypeScript

## 1.2.1 - 2023-03-19
- Fix aria-controls referencing non-existent elements by id 

## 1.2.0 - 2023-02-04
- Move Tab's computed id from `id` attribute to `data-tab-id`
- Remove `disableScrollBehaviour` option - browser will now never automatically jump to a tab element by hash, as it is undesired

## 1.1.4 - 2023-01-25
- Fix dist files missing in CDN

## 1.1.3 - 2023-01-25
- Fix tab hash not being updated when a tab's disabled state is changed dynamically

## 1.1.2 - 2022-12-08
- Added classes for inactive tabs & inactive tab links

## 1.1.1 - 2022-10-19
- Add support for disabling scroll behavior on `tabs` component via a new prop `options.disableScrollBehavior`

## 1.1.0 - 2022-07-10
- Replace webpack with Vite.js for faster package bundling & development
- Add proper dist compilation as ES & UMD - files renamed to `dist/vue3-tabs-component.es.js` & `dist/vue3-tabs-component.umd.js`
- Enable ESLint

## 1.0.11 - 2022-07-05
- Add `module`, `unpkg` definitions

## 1.0.10 - 2022-07-05
- Fix `vue` external when used as UMD module

## 1.0.9 - 2022-07-04
- Add UMD module

## 1.0.8 - 2022-05-15
- Fix server side rendering for Tabs component to use the `window` object after mounting

## 1.0.7 - 2022-04-24
- Fix tab active state persistence when a Tab's props are changed

## 1.0.6 - 2022-04-09
- Fix tab prefix, name & suffix props changes not reflecting on tab header when changed dynamically

## 1.0.5 - 2021-12-23
- Fix internal state of Tabs component not reflecting updating of a tab

## 1.0.4 - 2021-12-21
- Fix internal state of Tabs component not reflecting unmounting of a Tab

## 1.0.3 - 2021-07-29
- Fix preventing default event behaviour when a disabled tab is being selected and event is not provided

## 1.0.2 - 2021-06-17
- Fix trailing `n` character in CDN

## 1.0.1 - 2021-06-12
- Fix importing `Tab` & `Tabs` components when using Vite

## 1.0.0 - 2021-04-29
- Initial release
- Improved usage explanation in readme to properly support the Vue3 syntax

## 0.0.2 - 2021-01-18
- Reuse `vue-tabs-component` default storage key to smoothen transition from `spatie/vue-tabs-component`
