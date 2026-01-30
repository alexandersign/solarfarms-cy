import { defineField, defineType } from 'sanity'

export const curtailmentData = defineType({
  name: 'curtailmentData',
  title: 'Curtailment Dataset',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'Optional region within Cyprus',
    }),
    defineField({
      name: 'curtailmentPct',
      title: 'Annual Curtailment %',
      type: 'number',
      description: 'Annual average curtailment percentage',
    }),
    defineField({
      name: 'monthlyData',
      title: 'Monthly Curtailment Data',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'month', type: 'string', title: 'Month' },
          { name: 'curtailmentPct', type: 'number', title: 'Curtailment %' },
          { name: 'energyKWh', type: 'number', title: 'Energy Sold (kWh)' },
          { name: 'curtailedKWh', type: 'number', title: 'Curtailed (kWh)' }
        ]
      }]
    }),
    defineField({
      name: 'sourceName',
      title: 'Data Source',
      type: 'string',
      description: 'Name of data source or operator'
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
  ],
})

