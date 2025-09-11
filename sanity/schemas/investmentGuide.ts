import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const investmentGuide = defineType({
  name: 'investmentGuide',
  title: 'Investment Guides',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Guide Title',
      type: 'string',
      validation: (rule) => rule.required().min(10).max(80),
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(50).max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      title: 'Guide Category',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner Guide', value: 'beginner' },
          { title: 'Investment Strategy', value: 'strategy' },
          { title: 'Market Analysis', value: 'market' },
          { title: 'Technical Guide', value: 'technical' },
          { title: 'Financial Planning', value: 'financial' },
          { title: 'Legal & Regulatory', value: 'legal' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'First-time Investors', value: 'first-time' },
              { title: 'High-Net-Worth Individuals', value: 'hnw' },
              { title: 'Family Offices', value: 'family-offices' },
              { title: 'Institutional Investors', value: 'institutional' },
              { title: 'Financial Advisors', value: 'advisors' },
              { title: 'Fund Managers', value: 'fund-managers' },
            ],
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'downloadFile',
      title: 'PDF Download',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Main points readers will learn',
      validation: (rule) => rule.min(3).max(8),
    }),
    defineField({
      name: 'content',
      title: 'Guide Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
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
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          name: 'callout',
          type: 'object',
          title: 'Callout Box',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'Tip', value: 'tip' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Key Point', value: 'key-point' },
                  { title: 'Example', value: 'example' },
                ],
              },
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'content',
              type: 'text',
              title: 'Content',
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedGuides',
      title: 'Related Guides',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'investmentGuide' }],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Guide',
      type: 'boolean',
      description: 'Show prominently on resources page',
      initialValue: false,
    }),
    defineField({
      name: 'gatedContent',
      title: 'Gated Content',
      type: 'boolean',
      description: 'Require email signup to access',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          validation: (rule) => rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
          validation: (rule) => rule.max(160),
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      category: 'category',
      publishedAt: 'publishedAt',
    },
    prepare({ title, media, category, publishedAt }) {
      return {
        title,
        subtitle: `${category} • ${new Date(publishedAt).toLocaleDateString()}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
