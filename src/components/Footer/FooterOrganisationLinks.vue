<template>
  <h4 class="d-flex d-xl-block justify-content-center">Visit support organizations</h4>
  <div class="d-flex flex-row justify-content-center justify-content-xl-start">
    <div class="d-inline-flex pe-0">
      <ul class="nav flex-column">
        <li v-for="org in leftColumnOrgs" :key="org.name" class="nav-item">
          <a
            :href="org.url"
            class="nav-link px-0 py-2 text-body-secondary"
            target="_blank"
            rel="noopener noreferrer"
            >{{ org.name }}</a
          >
        </li>
      </ul>
    </div>
    <div class="d-inline-flex ps-5 pe-0">
      <ul class="nav flex-column">
        <li v-for="org in rightColumnOrgs" :key="org.name" class="nav-item">
          <a
            :href="org.url"
            class="nav-link px-0 py-2 text-body-secondary"
            target="_blank"
            rel="noopener noreferrer"
            >{{ org.name }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const leftColumnOrgs = [
  { name: 'Beyond Blue', url: 'https://www.beyondblue.org.au/mental-health/youth' },
  { name: 'headspace', url: 'https://headspace.org.au/' },
  { name: 'ReachOut', url: 'https://reachout.com/' },
]

const rightColumnOrgs = [
  { name: 'BRAVE Program', url: 'https://brave4you.psy.uq.edu.au/' },
  { name: 'moodgym', url: 'https://moodgym.com.au/' },
  { name: 'Kids Helpline', url: 'https://kidshelpline.com.au/' },
]
</script>

<style scoped></style>
