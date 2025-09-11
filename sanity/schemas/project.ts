import { defineType, defineField } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Solar Projects',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(80),
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
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
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
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'city',
          type: 'string',
          title: 'City',
          validation: (rule) => rule.required(),
        },
        {
          name: 'region',
          type: 'string',
          title: 'Region',
        },
        {
          name: 'coordinates',
          type: 'geopoint',
          title: 'GPS Coordinates',
        },
      ],
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity (MW)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'investment',
      title: 'Investment Details',
      type: 'object',
      fields: [
        {
          name: 'totalInvestment',
          type: 'number',
          title: 'Total Investment (€)',
          validation: (rule) => rule.required().positive(),
        },
        {
          name: 'roi',
          type: 'number',
          title: 'ROI (%)',
          validation: (rule) => rule.required().positive().max(100),
        },
        {
          name: 'paybackPeriod',
          type: 'number',
          title: 'Payback Period (years)',
          validation: (rule) => rule.required().positive(),
        },
        {
          name: 'npv25',
          type: 'number',
          title: '25-Year NPV (€)',
          validation: (rule) => rule.required().positive(),
        },
        {
          name: 'annualRevenue',
          type: 'number',
          title: 'Annual Revenue (€)',
          validation: (rule) => rule.required().positive(),
        },
      ],
    }),
    defineField({
      name: 'timeline',
      title: 'Project Timeline',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          title: 'Start Date',
        },
        {
          name: 'completionDate',
          type: 'date',
          title: 'Completion Date',
        },
        {
          name: 'status',
          type: 'string',
          title: 'Status',
          options: {
            list: [
              { title: 'Planning', value: 'planning' },
              { title: 'Permits Approved', value: 'permits-approved' },
              { title: 'Under Construction', value: 'construction' },
              { title: 'Commissioning', value: 'commissioning' },
              { title: 'Operational', value: 'operational' },
              { title: 'Completed', value: 'completed' },
            ],
          },
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Technical Specifications',
      type: 'object',
      fields: [
        {
          name: 'panelType',
          type: 'string',
          title: 'Solar Panel Type',
        },
        {
          name: 'inverterType',
          type: 'string',
          title: 'Inverter Type',
        },
        {
          name: 'annualProduction',
          type: 'number',
          title: 'Annual Energy Production (MWh)',
        },
        {
          name: 'efficiency',
          type: 'number',
          title: 'System Efficiency (%)',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project prominently',
      initialValue: false,
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
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
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      capacity: 'capacity',
      location: 'location.city',
      status: 'timeline.status',
    },
    prepare({ title, media, capacity, location, status }) {
      return {
        title,
        subtitle: `${capacity}MW in ${location} • ${status}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Capacity (Largest)',
      name: 'capacityDesc',
      by: [{ field: 'capacity', direction: 'desc' }],
    },
    {
      title: 'Investment (Highest)',
      name: 'investmentDesc',
      by: [{ field: 'investment.totalInvestment', direction: 'desc' }],
    },
  ],
})
