<template>
  <footer class="mt-auto pt-5 pb-3" role="contentinfo" aria-label="Site footer">
    <div class="container-fluid border-top">
      <div class="d-flex flex-wrap justify-content-center justify-content-lg-start mt-5">
        <div class="col-12 col-xl-auto d-flex d-xl-block justify-content-center">
          <div class="d-flex align-items-center mx-3 mb-5 mb-xl-0">
            <span class="fs-4 fw-bolder" aria-label="Site name">{{ settings.title }}</span>
          </div>
        </div>
        <nav class="col-12 col-xl-auto px-xl-5 pt-xl-5 mb-5 mb-xl-0" role="navigation" aria-label="Organisation links">
          <FooterOrganisationLinks />
        </nav>
        <div class="col-auto ps-5 me-5 border-end d-none d-xl-block" aria-hidden="true"></div>
        <nav class="col-12 col-xl mb-3 mb-xl-0" role="navigation" aria-label="Footer navigation and legal information">
          <div class="d-flex flex-column align-items-center align-items-xl-start">
            <FooterNavLinks />
            <div class="d-flex flex-row flex-wrap align-items-center justify-content-center">
              <FooterLegalLinks />
            </div>
          </div>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
import FooterLegalLinks from './FooterLegalLinks.vue'
import FooterNavLinks from './FooterNavLinks.vue'
import FooterOrganisationLinks from './FooterOrganisationLinks.vue'
import settings from '../../assets/json/settings.json'
</script>

<style scoped></style>
