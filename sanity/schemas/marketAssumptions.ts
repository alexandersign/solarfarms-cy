import { defineField, defineType } from 'sanity'

export const marketAssumptions = defineType({
  name: 'marketAssumptions',
  title: 'Market Assumptions',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Assumption Set Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'solarEpcDevCostPerMw',
      title: 'Solar EPC Development Cost per MW',
      type: 'number',
      initialValue: 500000,
      description: '€500,000 per MW for EPC development'
    }),
    defineField({
      name: 'solarTurnkeyPerMw',
      title: 'Solar Turnkey Cost per MW',
      type: 'number',
      initialValue: 1200000,
      description: '€1,200,000 per MW for turnkey projects'
    }),
    defineField({
      name: 'rtbRetailOldPerMw',
      title: 'RTB Retail Price (Old/Fixed) per MW',
      type: 'number',
      initialValue: 1200000,
      description: '€1,200,000 per MW for older fixed-tilt RTB parks'
    }),
    defineField({
      name: 'rtbRetailNewPerMw',
      title: 'RTB Retail Price (New/Tracking) per MW',
      type: 'number',
      initialValue: 1700000,
      description: '€1,700,000 per MW for newer parks with tracking systems'
    }),
    defineField({
      name: 'bessInstalledPerMwh',
      title: 'BESS Installed Cost per MWh',
      type: 'number',
      initialValue: 140000,
      description: '€140,000 per MWh installed and ready'
    }),
    defineField({
      name: 'financingCapSolarOnlyPerMw',
      title: 'Financing Cap Solar Only per MW',
      type: 'number',
      initialValue: 500000,
      description: '€500,000 per MW maximum debt for solar-only'
    }),
    defineField({
      name: 'financingPctSolarBess',
      title: 'Financing % for Solar + BESS',
      type: 'number',
      initialValue: 0.70,
      description: '70% of total capex for solar+BESS projects'
    }),
    defineField({
      name: 'tariffDayCentsPerKwh',
      title: 'Daytime Tariff (cents/kWh)',
      type: 'number',
      description: 'Average daytime electricity tariff'
    }),
    defineField({
      name: 'tariffNightCentsPerKwh',
      title: 'Nighttime Tariff (cents/kWh)',
      type: 'number',
      description: 'Average nighttime electricity tariff'
    }),
    defineField({
      name: 'degradationPctPerYear',
      title: 'Panel Degradation % per Year',
      type: 'number',
      initialValue: 0.5,
      description: '0.5% per year typical degradation'
    }),
  ],
})

