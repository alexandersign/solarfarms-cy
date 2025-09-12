import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '42llz831',
    dataset: 'production'
  },
  studioHost: 'solarfarms-cy'
})
