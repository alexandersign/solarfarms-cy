import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().min(30).max(150),
      description: 'Brief description for cards and previews',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(100).max(500),
    }),
    defineField({
      name: 'icon',
      title: 'Service Icon',
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
      name: 'featuredImage',
      title: 'Featured Image',
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
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'EPC Services', value: 'epc' },
          { title: 'O&M Management', value: 'om' },
          { title: 'Asset Optimization', value: 'optimization' },
          { title: 'Lifecycle Support', value: 'lifecycle' },
          { title: 'Consulting', value: 'consulting' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Feature Title',
              validation: (rule) => rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Feature Description',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (rule) => rule.min(3).max(8),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key benefits',
    }),
    defineField({
      name: 'process',
      title: 'Service Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              type: 'number',
              title: 'Step Number',
              validation: (rule) => rule.required().positive(),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Step Title',
              validation: (rule) => rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Step Description',
              rows: 2,
            },
          ],
          preview: {
            select: {
              step: 'step',
              title: 'title',
              description: 'description',
            },
            prepare({ step, title, description }) {
              return {
                title: `${step}. ${title}`,
                subtitle: description,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'model',
          type: 'string',
          title: 'Pricing Model',
          options: {
            list: [
              { title: 'Fixed Price', value: 'fixed' },
              { title: 'Per MW', value: 'per-mw' },
              { title: 'Percentage of Revenue', value: 'percentage' },
              { title: 'Monthly Subscription', value: 'subscription' },
              { title: 'Custom Quote', value: 'custom' },
            ],
          },
        },
        {
          name: 'startingPrice',
          type: 'number',
          title: 'Starting Price (€)',
        },
        {
          name: 'priceDescription',
          type: 'string',
          title: 'Price Description',
          description: 'e.g., "per MW installed" or "of annual revenue"',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Detailed Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show prominently on services page',
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
      title: 'title',
      subtitle: 'category',
      media: 'icon',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
