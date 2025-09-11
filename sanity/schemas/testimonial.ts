import { defineType, defineField } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(50).max(500),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(50),
    }),
    defineField({
      name: 'clientTitle',
      title: 'Client Title/Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientPhoto',
      title: 'Client Photo',
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
      name: 'companyLogo',
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
      name: 'projectDetails',
      title: 'Project Details',
      type: 'object',
      fields: [
        {
          name: 'projectSize',
          type: 'string',
          title: 'Project Size',
          description: 'e.g., "5MW Solar Farm"',
        },
        {
          name: 'investmentAmount',
          type: 'number',
          title: 'Investment Amount (€)',
        },
        {
          name: 'roi',
          type: 'number',
          title: 'Achieved ROI (%)',
        },
        {
          name: 'location',
          type: 'string',
          title: 'Project Location',
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5 stars)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'category',
      title: 'Testimonial Category',
      type: 'string',
      options: {
        list: [
          { title: 'Investment Experience', value: 'investment' },
          { title: 'Service Quality', value: 'service' },
          { title: 'Project Management', value: 'project-management' },
          { title: 'Technical Expertise', value: 'technical' },
          { title: 'Customer Support', value: 'support' },
          { title: 'ROI Achievement', value: 'roi' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show prominently on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'verified',
      title: 'Verified Testimonial',
      type: 'boolean',
      description: 'Mark as verified/authentic',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      clientName: 'clientName',
      company: 'company',
      media: 'clientPhoto',
      rating: 'rating',
    },
    prepare({ quote, clientName, company, media, rating }) {
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
      return {
        title: `${clientName} - ${company}`,
        subtitle: `${stars} "${quote.substring(0, 50)}..."`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Rating (Highest)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Published Date (Newest)',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
