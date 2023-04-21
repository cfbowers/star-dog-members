<template>
  <header class="w-full">
    <slot name="header"></slot>
  </header>
  <main class="flex-1 min-h-full">
    <slot></slot>
  </main>
  <footer class="h-16 w-full">
    <slot name="footer"></slot>
  </footer>
</template>
