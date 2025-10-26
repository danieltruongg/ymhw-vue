<template>
  <ul
    class="d-flex navbar-nav nav-underline col-12 col-lg-auto me-lg-auto align-items-center mb-md-0"
  >
    <li v-for="(item, index) in primaryDropdownItems" :key="index" class="nav-item">
      <div class="dropdown">
        <a
          href="#"
          class="nav-link text-decoration-none px-3 text-dark dropdown-toggle"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          >{{ item.label }}</a
        >
        <ul class="dropdown-menu">
          <li v-for="(subItem, subIndex) in item.items" :key="subIndex" class="dropend">
            <template v-if="Array.isArray(subItem.items)">
              <a href="#" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown">
                {{ subItem.label }}
              </a>
              <ul class="dropdown-menu">
                <li v-for="(subSubItem, subSubIndex) in subItem.items" :key="subSubIndex">
                  <router-link
                    :to="{ name: subSubItem.route_name }"
                    class="dropdown-item"
                    role="button"
                  >
                    {{ subSubItem.label }}
                  </router-link>
                </li>
              </ul>
            </template>
            <template v-else>
              <router-link :to="{ name: subItem.route_name }" class="dropdown-item" role="button">
                {{ subItem.label }}
              </router-link>
            </template>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { primaryDropdownItems } from '../nav/navItems'
</script>

<style scoped></style>
