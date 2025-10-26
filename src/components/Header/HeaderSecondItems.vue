<template>
  <ul class="d-flex navbar-nav nav-underline align-items-center">
    <li v-for="(item, index) in secondaryDropdownItems" :key="index" class="nav-item">
      <div class="dropdown">
        <a
          href="#"
          class="nav-link text-decoration-none px-3 text-dark dropdown-toggle"
          data-bs-toggle="dropdown"
          >{{ item.label }}</a
        >
        <ul class="dropdown-menu">
          <li v-for="(subItem, subIndex) in item.items" :key="subIndex">
            <router-link :to="{ name: subItem.route_name }" class="dropdown-item" role="button">
              {{ subItem.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { secondaryDropdownItems } from '../nav/navItems'
</script>

<style scoped></style>
