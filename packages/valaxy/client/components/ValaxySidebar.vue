<script lang="ts" setup>
import { useAppStore, useLayout } from '..'

const app = useAppStore()
const isHome = useLayout('home')
</script>

<template>
  <ValaxyOverlay class="md:hidden" :show="app.isSidebarOpen" @click="app.toggleSidebar()" />

  <ValaxyHamburger :active="app.isSidebarOpen" class="menu-btn sidebar-toggle yun-icon-btn" :class="isHome ? '' : 'md:hidden'" @click="app.toggleSidebar()" />

  <aside class="va-card transition sidebar" :class="[app.isSidebarOpen && 'open', !isHome && 'md:translate-x-0']">
    <slot />
  </aside>
</template>

<style>
.menu-btn {
  display: inline-flex;
  position: fixed;
  left: 0.8rem;
  top: 0.6rem;
  line-height: 1;
  z-index: var(--yun-z-menu-btn);
  cursor: pointer;
}
</style>
