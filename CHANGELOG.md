# Changelog

All notable changes to `vue3-tabs-component` will be documented in this file

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
