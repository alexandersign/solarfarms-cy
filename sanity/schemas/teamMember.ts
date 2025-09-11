import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(50).max(500),
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
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
      name: 'credentials',
      title: 'Credentials & Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Professional certifications, degrees, etc.',
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Solar Engineering', value: 'solar-engineering' },
              { title: 'Project Management', value: 'project-management' },
              { title: 'Financial Analysis', value: 'financial-analysis' },
              { title: 'Business Development', value: 'business-development' },
              { title: 'Operations & Maintenance', value: 'operations-maintenance' },
              { title: 'Regulatory Affairs', value: 'regulatory-affairs' },
              { title: 'Investment Advisory', value: 'investment-advisory' },
              { title: 'Technical Sales', value: 'technical-sales' },
            ],
          },
        },
      ],
      validation: (rule) => rule.min(1),
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
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Phone',
        },
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn Profile',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Team Member',
      type: 'boolean',
      description: 'Show prominently on about page',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
