import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'SolarFarms.cy',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(160),
      initialValue: 'Premium Cyprus solar farm investments with guaranteed 15-20% ROI. Full lifecycle support from Lighthief Cyprus.',
    }),
    defineField({
      name: 'keywords',
      title: 'Default Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {
        accept: 'image/x-icon,image/png',
      },
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          type: 'email',
          title: 'Email',
          validation: (rule) => rule.required(),
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Phone',
          validation: (rule) => rule.required(),
        },
        {
          name: 'address',
          type: 'object',
          title: 'Address',
          fields: [
            {
              name: 'street',
              type: 'string',
              title: 'Street Address',
            },
            {
              name: 'city',
              type: 'string',
              title: 'City',
            },
            {
              name: 'postalCode',
              type: 'string',
              title: 'Postal Code',
            },
            {
              name: 'country',
              type: 'string',
              title: 'Country',
              initialValue: 'Cyprus',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn',
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter',
        },
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
        },
        {
          name: 'youtube',
          type: 'url',
          title: 'YouTube',
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        {
          name: 'googleAnalytics',
          type: 'string',
          title: 'Google Analytics ID',
          description: 'e.g., G-XXXXXXXXXX',
        },
        {
          name: 'googleTagManager',
          type: 'string',
          title: 'Google Tag Manager ID',
          description: 'e.g., GTM-XXXXXXX',
        },
        {
          name: 'facebookPixel',
          type: 'string',
          title: 'Facebook Pixel ID',
        },
        {
          name: 'linkedinInsight',
          type: 'string',
          title: 'LinkedIn Insight Tag',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'homepage',
      title: 'Homepage Settings',
      type: 'object',
      fields: [
        {
          name: 'heroTitle',
          type: 'string',
          title: 'Hero Title',
          validation: (rule) => rule.required(),
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          title: 'Hero Subtitle',
          rows: 2,
        },
        {
          name: 'heroImage',
          type: 'image',
          title: 'Hero Background Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
        {
          name: 'featuredProjects',
          type: 'array',
          title: 'Featured Projects',
          of: [
            {
              type: 'reference',
              to: [{ type: 'project' }],
            },
          ],
          validation: (rule) => rule.max(3),
        },
        {
          name: 'featuredTestimonials',
          type: 'array',
          title: 'Featured Testimonials',
          of: [
            {
              type: 'reference',
              to: [{ type: 'testimonial' }],
            },
          ],
          validation: (rule) => rule.max(3),
        },
      ],
    }),
    defineField({
      name: 'maintenance',
      title: 'Maintenance Mode',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enable Maintenance Mode',
          initialValue: false,
        },
        {
          name: 'message',
          type: 'text',
          title: 'Maintenance Message',
          rows: 3,
          initialValue: 'We are currently performing scheduled maintenance. Please check back soon.',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
