<template>
  <AdminDashPage
    title="Admin Dashboard"
    description="Manage accounts and content"
    :dashCards="dashboardCards"
  />
</template>

<script setup>
import AdminDashPage from '@/components/AdminDashPage.vue';
import { adminRatingSummary, adminSignup, adminTestApi, adminUserSignUp, adminViewUsers, adminYouthStoryDashboard } from '@/components/nav/navItems'

const dashboardCards = [
  {
    routeName: adminSignup.route_name,
    title: 'Create Admin Account',
    description: 'Add new administrators to manage the platform and oversee user activities.',
    buttonLabel: 'Create Admin'
  },
  {
    routeName: adminUserSignUp.route_name,
    title: 'Create User Account',
    description: 'Add new users to the platform.',
    buttonLabel: 'Create Regular User'
  },
  {
    routeName: adminViewUsers.route_name,
    title: 'View Users',
    description: 'View all registered users on the platform.',
    buttonLabel: 'View All Users'
  },
  {
    routeName: adminYouthStoryDashboard.route_name,
    title: 'Youth Story Dashboard',
    description: 'View and manage all submitted youth stories in one place.',
    buttonLabel: 'Manage Youth Story'
  },
  {
    routeName: adminRatingSummary.route_name,
    title: 'Rating Summary',
    description: 'View the different service feedback ratings given by users.',
    buttonLabel: 'View Summary'
  },
  {
    routeName: adminTestApi.route_name,
    title: 'Test API',
    description: 'Test the API endpoints and their responses.',
    buttonLabel: 'Test API'
  }
]
</script>

<style scoped></style>
