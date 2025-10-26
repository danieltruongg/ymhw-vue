<template>
  <div class="d-flex flex-wrap w-100 justify-content-between px-5 px-xl-0">
    <div
      v-for="(item, index) in totalDropdownItems"
      :key="index"
      class="d-flex d-xl-block flex-column mx-2 mb-3"
    >
      <h6>{{ item.label }}</h6>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="(subItem, subIndex) in item.items" :key="subIndex">
          <router-link
            :to="{ name: subItem.route_name }"
            class="nav-link px-0 py-2 text-body-secondary"
            role="button"
          >
            {{ subItem.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { totalDropdownItems } from '../nav/navItems'
</script>

<style scoped></style>
