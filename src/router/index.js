import { isAdmin, isLoading, isLoggedIn } from '@/composables/useAuth'
import useRouteNameArrayConverter from '@/utils/useRouteChildrenRouteNameConverter'
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import TempView from '@/views/TempView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AdminSignUpView from '@/views/admin/AdminSignUpView.vue'
import AddYouthStoryView from '@/views/admin/AddYouthStoryView.vue'
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import YouthCallServiceView from '@/views/youthService/YouthCallServiceView.vue'
import AdminRatingSummaryView from '@/views/admin/AdminRatingSummaryView.vue'
import YouthStoriesView from '@/views/YouthStoriesView.vue'
import ContactUsView from '@/views/ContactUsView.vue'
import AdminViewUsersView from '@/views/admin/AdminViewUsersView.vue'
import AdminViewYouthStoryView from '@/views/admin/AdminViewYouthStoryView.vue'
import AdminYouthStoryDashView from '@/views/admin/AdminYouthStoryDashView.vue'
import GuardianChatServiceView from '@/views/guardianService/guardianChatServiceView.vue'
import UpdateUsernameView from '@/views/UpdateUsernameView.vue'
import AdminUserSignUpView from '@/views/admin/AdminUserSignUpView.vue'
import TestCrudApiView from '@/views/api/TestCrudApiView.vue'

const home = {
  path: '/',
  name: 'Home',
  component: HomeView,
}
const unauthorized = {
  path: '/unauthorized',
  name: 'Unauthorized',
  component: UnauthorizedView,
}
const youthMentalTopics = {
  path: '/young-people/mental-health-topics',
  children: [
    { path: '', name: 'YouthMentalTopics', component: TempView },
    { path: 'anxiety', name: 'YouthMentalTopicsAnxiety', component: TempView },
    { path: 'depression', name: 'YouthMentalTopicsDepression', component: TempView },
    { path: 'self-harm', name: 'YouthMentalTopicsSelfHarm', component: TempView },
  ],
}
const youthWellbeingTopics = {
  path: '/young-people/wellbeing-topics',
  children: [
    { path: '', name: 'YouthWellbeingTopics', component: TempView },
    {
      path: 'building-confidence',
      name: 'YouthWellbeingTopicsBuildingConfidence',
      component: TempView,
    },
    { path: 'learning-skills', name: 'YouthWellbeingTopicsLearningSkills', component: TempView },
    { path: 'eating-well', name: 'YouthWellbeingTopicsEatingWell', component: TempView },
  ],
}
const youthSupport = {
  path: '/young-people/get-support',
  children: [
    { path: '', name: 'YouthSupport', component: TempView },
    {
      path: 'call',
      name: 'YouthSupportCall',
      component: YouthCallServiceView,
      meta: { requiresAuth: true },
    },
    { path: 'chat', name: 'YouthSupportChat', component: TempView, meta: { requiresAuth: true } },
    { path: 'forum', name: 'YouthSupportForum', component: TempView, meta: { requiresAuth: true } },
  ],
}
const youthStories = {
  path: '/young-people/listen-to-stories',
  children: [{ path: '', name: 'YouthStories', component: YouthStoriesView }],
}
const guardianTopics = {
  path: '/parents-carers/explore-topics',
  children: [
    { path: '', name: 'GuardianTopics', component: TempView },
    { path: 'anxiety', name: 'GuardianTopicsAnxiety', component: TempView },
    { path: 'depression', name: 'GuardianTopicsDepression', component: TempView },
    { path: 'self-harm', name: 'GuardianTopicsSelfHarm', component: TempView },
  ],
}
const guardianSupport = {
  path: '/parents-carers/find-support',
  children: [
    { path: '', name: 'GuardianSupport', component: TempView },
    {
      path: 'call',
      name: 'GuardianSupportCall',
      component: TempView,
      meta: { requiresAuth: true },
    },
    {
      path: 'chat',
      name: 'GuardianSupportChat',
      component: GuardianChatServiceView,
      meta: { requiresAuth: true },
    },
    {
      path: 'forum',
      name: 'GuardianSupportForum',
      component: TempView,
      meta: { requiresAuth: true },
    },
  ],
}
const guardianStories = {
  path: '/parents-carers/listen-to-stories',
  children: [{ path: '', name: 'GuardianStories', component: TempView }],
}
const educatorResources = {
  path: '/educators/resources',
  name: 'EducatorResources',
  component: TempView,
}
const educatorInfoSupport = {
  path: '/educators/information-and-support',
  name: 'EducatorInfoSupport',
  component: TempView,
}
const involvementSupport = {
  path: '/get-involved/support-us',
  name: 'InvolvementSupport',
  component: TempView,
}
const involvementFundraise = {
  path: '/get-involved/fundraise-for-us',
  name: 'InvolvementFundraise',
  component: TempView,
}
const involvementPartner = {
  path: '/get-involved/partner-with-us',
  name: 'InvolvementPartner',
  component: TempView,
}
const aboutStory = {
  path: '/about-us/our-story',
  name: 'AboutStory',
  component: TempView,
}
const aboutValues = {
  path: '/about-us/our-values',
  name: 'AboutValues',
  component: TempView,
}
const aboutServices = {
  path: '/about-us/our-services',
  name: 'AboutServices',
  component: TempView,
}
const aboutPeople = {
  path: '/about-us/our-people',
  name: 'AboutPeople',
  component: TempView,
}
const aboutContact = {
  path: '/about-us/contact-us',
  name: 'AboutContact',
  component: ContactUsView,
}
const privacyPolicy = {
  path: '/privacy-policy',
  name: 'PrivacyPolicy',
  component: TempView,
}
const termsAndConditions = {
  path: '/terms-and-conditions',
  name: 'TermsAndConditions',
  component: TempView,
}
const sitemap = {
  path: '/sitemap',
  name: 'Sitemap',
  component: TempView,
}
const signup = {
  path: '/sign-up',
  name: 'Signup',
  component: SignupView,
}
const login = {
  path: '/login',
  name: 'Login',
  component: LoginView,
}
const profile = {
  path: '/profile',
  name: 'Profile',
  component: TempView,
  meta: { requiresAuth: true },
}
const settings = {
  path: '/settings',
  children: [
    {
      path: '',
      name: 'Settings',
      component: TempView,
      meta: { requiresAuth: true },
    },
    {
      path: 'update-username',
      name: 'UpdateUsername',
      component: UpdateUsernameView,
      meta: { requiresAuth: true },
    }
  ]
}
const admin = {
  path: '/admin',
  children: [
    {
      path: 'dashboard',
      name: 'AdminDashboard',
      component: AdminDashboardView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: 'sign-up',
      name: 'AdminSignup',
      component: AdminSignUpView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: 'user-sign-up',
      name: 'AdminUserSignUp',
      component: AdminUserSignUpView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: 'youth-story',
      name: 'AdminYouthStoryDash',
      component: AdminYouthStoryDashView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: 'youth-story/add',
      name: 'AddYouthStory',
      component: AddYouthStoryView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: 'youth-story/view',
      name: 'AdminViewYouthStory',
      component: AdminViewYouthStoryView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: 'rating-summary',
      name: 'AdminRatingSummary',
      component: AdminRatingSummaryView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: 'view-users',
      name: 'AdminViewUsers',
      component: AdminViewUsersView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: 'test-api',
      name: 'TestApi',
      component: TestCrudApiView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
}
const demo = {
  path: '/demo',
  name: 'Demo',
  component: TempView,
  meta: { requiresAuth: true },
}

const youthMentalTopicsRouteNames = useRouteNameArrayConverter(youthMentalTopics)
const youthWellbeingTopicsRouteNames = useRouteNameArrayConverter(youthWellbeingTopics)
const youthSupportRouteNames = useRouteNameArrayConverter(youthSupport)
const youthStoriesRouteNames = useRouteNameArrayConverter(youthStories)
const guardianTopicsRouteNames = useRouteNameArrayConverter(guardianTopics)
const guardianSupportRouteNames = useRouteNameArrayConverter(guardianSupport)
const guardianStoriesRouteNames = useRouteNameArrayConverter(guardianStories)
const settingsRouteNames = useRouteNameArrayConverter(settings)
const adminRouteNames = useRouteNameArrayConverter(admin)

const routeNames = {
  home: home.name,
  unauthorized: unauthorized.name,
  youthMentalTopics: youthMentalTopicsRouteNames,
  youthWellbeingTopics: youthWellbeingTopicsRouteNames,
  youthSupport: youthSupportRouteNames,
  youthStories: youthStoriesRouteNames,
  guardianTopics: guardianTopicsRouteNames,
  guardianSupport: guardianSupportRouteNames,
  guardianStories: guardianStoriesRouteNames,
  educatorResources: educatorResources.name,
  educatorInfoSupport: educatorInfoSupport.name,
  involvementSupport: involvementSupport.name,
  involvementFundraise: involvementFundraise.name,
  involvementPartner: involvementPartner.name,
  aboutStory: aboutStory.name,
  aboutValues: aboutValues.name,
  aboutServices: aboutServices.name,
  aboutPeople: aboutPeople.name,
  aboutContact: aboutContact.name,
  privacyPolicy: privacyPolicy.name,
  termsAndConditions: termsAndConditions.name,
  sitemap: sitemap.name,
  signup: signup.name,
  login: login.name,
  profile: profile.name,
  settings: settingsRouteNames,
  admin: adminRouteNames,
}

const routes = [
  home,
  unauthorized,
  youthMentalTopics,
  youthWellbeingTopics,
  youthSupport,
  youthStories,
  guardianTopics,
  guardianSupport,
  guardianStories,
  educatorResources,
  educatorInfoSupport,
  involvementSupport,
  involvementFundraise,
  involvementPartner,
  aboutStory,
  aboutValues,
  aboutServices,
  aboutPeople,
  aboutContact,
  privacyPolicy,
  termsAndConditions,
  sitemap,
  signup,
  login,
  profile,
  settings,
  admin,
  demo
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  // Wait for auth initialisation to complete
  while (isLoading.value) {
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  // Check if the route requires to be logged in
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn.value) {
      next({ name: routeNames.login })
      return
    }

    // If logged in, Check if the route requires admin role
    if (to.matched.some((record) => record.meta.requiresAdmin)) {
      if (!isAdmin.value) {
        next({ name: routeNames.unauthorized })
        return
      }
    }
  }

  next()
})

export { router, routeNames }
