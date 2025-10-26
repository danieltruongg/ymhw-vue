import { routeNames } from '@/router'
import {
  youthStories,
  youthMentalTopicDropdownItems,
  youthWellbeingTopicDropdownItems,
  youthSupportDropdownItems,
} from './navYouthItems'
import {
  guardianTopicsDropdownItems,
  guardianSupportDropdownItems,
  guardianStories,
} from './navGuardianItems'
import {
  adminDashboard,
  adminSignup,
  adminUserSignUp,
  adminYouthStoryDashboard,
  adminAddYouthStory,
  adminViewYouthStory,
  adminViewUsers,
  adminRatingSummary,
  adminTestApi
} from './navAdminItems'
import { signup, login, profile } from './navAccountItems'
import { educatorResources, educatorInfoSupport } from './navEducatorItems'
import { involvementSupport, involvementFundraise, involvementPartner } from './navInvolvementItems'
import { aboutStory, aboutValues, aboutServices, aboutPeople, aboutContact } from './navAboutItems'
import { settings, settingsUpdateUsername } from './navSettingsItems'

const home = {
  label: 'Home',
  route_name: routeNames.home,
}
const privacyPolicy = {
  label: 'Privacy',
  route_name: routeNames.privacyPolicy,
}
const termsAndConditions = {
  label: 'Terms',
  route_name: routeNames.termsAndConditions,
}
const sitemap = {
  label: 'Sitemap',
  route_name: routeNames.sitemap,
}

const primaryDropdownItems = [
  {
    label: 'For Young People',
    items: [
      youthMentalTopicDropdownItems,
      youthWellbeingTopicDropdownItems,
      youthSupportDropdownItems,
      youthStories,
    ],
  },
  {
    label: 'For Parents/Carers',
    items: [guardianTopicsDropdownItems, guardianSupportDropdownItems, guardianStories],
  },
  { label: 'For Educators', items: [educatorResources, educatorInfoSupport] },
]

const secondaryDropdownItems = [
  { label: 'Get Involved', items: [involvementSupport, involvementFundraise, involvementPartner] },
  { label: 'About Us', items: [aboutStory, aboutValues, aboutServices, aboutPeople, aboutContact] },
]

const legalityItems = [
  { label: 'Privacy', item: privacyPolicy },
  { spacer: true },
  { label: 'Terms', item: termsAndConditions },
  { spacer: true },
  { label: 'Sitemap', item: sitemap },
]

const totalDropdownItems = [...primaryDropdownItems, ...secondaryDropdownItems]

export {
  home,
  primaryDropdownItems,
  secondaryDropdownItems,
  totalDropdownItems,
  legalityItems,
  signup,
  login,
  profile,
  settings,
  settingsUpdateUsername,
  adminDashboard,
  adminSignup,
  adminUserSignUp,
  adminYouthStoryDashboard,
  adminAddYouthStory,
  adminViewYouthStory,
  adminRatingSummary,
  adminViewUsers,
  adminTestApi
}
