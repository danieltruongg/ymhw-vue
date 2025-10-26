import { routeNames } from '@/router'

const guardianTopics = {
  label: 'Explore Topics',
  route_name: routeNames.guardianTopics.main,
}
const guardianTopicsAnxiety = {
  label: 'Anxiety',
  route_name: routeNames.guardianTopics.anxiety,
}
const guardianTopicsDepression = {
  label: 'Depression',
  route_name: routeNames.guardianTopics.depression,
}
const guardianTopicsSelfHarm = {
  label: 'Self-Harm',
  route_name: routeNames.guardianTopics.selfHarm,
}

const guardianSupport = {
  label: 'Find Support',
  route_name: routeNames.guardianSupport.main,
}
const guardianSupportCall = {
  label: 'Call Us',
  route_name: routeNames.guardianSupport.call,
}
const guardianSupportChat = {
  label: 'Chat with Us',
  route_name: routeNames.guardianSupport.chat,
}
const guardianSupportForum = {
  label: 'Forum',
  route_name: routeNames.guardianSupport.forum,
}

const guardianStories = {
  label: 'Listen to Stories',
  route_name: routeNames.guardianStories.main,
}

const guardianTopicsDropdownItems = {
  label: 'Explore Topics',
  items: [guardianTopicsAnxiety, guardianTopicsDepression, guardianTopicsSelfHarm],
  route_name: guardianTopics.route_name,
}

const guardianSupportDropdownItems = {
  label: 'Find Support',
  items: [guardianSupportCall, guardianSupportChat, guardianSupportForum],
  route_name: guardianSupport.route_name,
}

export {
  guardianTopicsDropdownItems,
  guardianSupportDropdownItems,
  guardianTopics,
  guardianSupport,
  guardianStories,
}
