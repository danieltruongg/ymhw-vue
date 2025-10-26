<template>
  <header class="navbar sticky-top navbar-expand-md px-3 py-2 mb-3 bg-white">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link
        :to="{ name: home.route_name }"
        class="navbar-brand d-flex mx-3 mb-lg-0 justify-content-center text-decoration-none link-body-emphasis"
        aria-label="Youth Mental Health Website - Go to homepage"
      >
        <span class="d-flex d-none d-md-block"
          ><img
            :src="logo"
            alt="Youth Mental Health Website logo"
            class="img-fluid"
            style="max-height: 50px; width: auto"
        /></span>
        <span class="fs-2 fw-bolder">{{ settings.title }}</span>
      </router-link>
      <div class="d-md-none">
        <HeaderAccountDropdown />
      </div>
      <nav class="offcanvas offcanvas-start" id="navbarSupportedContent" aria-label="Main navigation">
        <div
          class="offcanvas-body d-flex flex-column flex-xl-row flex-wrap align-items-center justify-content-center justify-content-xl-between"
        >
          <div class="d-flex">
            <HeaderPrimaryItems />
          </div>
          <div class="d-flex">
            <HeaderSecondItems />
            <HeaderAccountItems />
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import HeaderPrimaryItems from './HeaderPrimaryItems.vue'
import HeaderSecondItems from './HeaderSecondItems.vue'
import HeaderAccountItems from './HeaderAccountItems.vue'
import HeaderAccountDropdown from './HeaderAccountDropdown.vue'
import settings from '../../assets/json/settings.json'
import { home } from '../nav/navItems'

import logo from '/logo.png'
</script>

<style scoped></style>
