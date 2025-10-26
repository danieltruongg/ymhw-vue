<template>
  <AdminDashPage
    title="Youth Story Dashboard"
    description="Manage youth stories and content"
    :dashCards="dashboardCards"
  />
</template>

<script setup>
import AdminDashPage from '@/components/AdminDashPage.vue';
import { adminAddYouthStory, adminViewYouthStory } from '@/components/nav/navItems'

const dashboardCards = [
  {
    routeName: adminAddYouthStory.route_name,
    title: 'Add Youth Story',
    description: 'Share inspiring stories from young people to help others on their mental health journey.',
    buttonLabel: 'Add Story'
  },
  {
    routeName: adminViewYouthStory.route_name,
    title: 'View Youth Story',
    description: 'View and manage youth stories submitted by users.',
    buttonLabel: 'View Story'
  }
]
</script>

<style scoped></style>
