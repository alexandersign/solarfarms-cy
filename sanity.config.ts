import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

// Import schemas
import { blogPost } from './sanity/schemas/blogPost'
import { project } from './sanity/schemas/project'
import { teamMember } from './sanity/schemas/teamMember'
import { service } from './sanity/schemas/service'
import { testimonial } from './sanity/schemas/testimonial'
import { investmentGuide } from './sanity/schemas/investmentGuide'
import { siteSettings } from './sanity/schemas/siteSettings'

export default defineConfig({
  name: 'solarfarms-cy',
  title: 'SolarFarms.cy CMS',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '42llz831',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  basePath: '/studio',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            // Site Settings (Singleton)
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            
            // Divider
            S.divider(),
            
            // Content Sections
            S.listItem()
              .title('Blog Posts')
              .schemaType('blogPost')
              .child(S.documentTypeList('blogPost')),
            
            S.listItem()
              .title('Projects')
              .schemaType('project')
              .child(S.documentTypeList('project')),
            
            S.listItem()
              .title('Investment Guides')
              .schemaType('investmentGuide')
              .child(S.documentTypeList('investmentGuide')),
            
            S.listItem()
              .title('Services')
              .schemaType('service')
              .child(S.documentTypeList('service')),
            
            S.listItem()
              .title('Team Members')
              .schemaType('teamMember')
              .child(S.documentTypeList('teamMember')),
            
            S.listItem()
              .title('Testimonials')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial')),
          ])
    }),
    visionTool(),
  ],
  
  schema: {
    types: [
      // Settings
      siteSettings,
      
      // Content types
      blogPost,
      project,
      investmentGuide,
      service,
      teamMember,
      testimonial,
    ],
  },
  
  document: {
    // Remove 'delete' action for site settings
    actions: (prev, { schemaType }) => {
      if (schemaType === 'siteSettings') {
        return prev.filter(({ action }) => action !== 'delete')
      }
      return prev
    },
  },
})
