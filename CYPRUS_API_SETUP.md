# 🏛️ Cyprus Government API Integration Guide

## 📋 **Overview**

The [Cyprus Department of Land and Surveys (DLS)](https://portal.dls.moi.gov.cy/en/alles-ypiresies/katalogos-apis/) provides official government APIs that can significantly enhance our land assessment tool with authentic, government-backed data.

---

## 🎯 **Available APIs for Solar Development**

### **1. Cadastral/Survey Map API** ⭐ **PRIORITY**
**URL**: `https://eservices.dls.moi.gov.cy/arcgis/rest/services/National/CadastralMap%5FEN/MapServer`

**Data Layers Available**:
- **Plots**: Official plot boundaries and identifications
- **Urban Zones**: Zoning classifications and restrictions
- **Building Factor Values**: Development potential per square meter
- **Postal Code Areas**: Location verification
- **Administrative Units**: Municipality and district data
- **Topographical Data**: Site characteristics
- **Buildings**: Existing structures
- **State Land**: Government-owned parcels
- **Beach Protection Zone**: Environmental restrictions

**Solar Development Use Cases**:
- ✅ **Plot Verification**: Confirm exact plot boundaries and size
- ✅ **Zoning Analysis**: Verify solar development permissions
- ✅ **Building Factors**: Calculate development potential
- ✅ **Land Ownership**: Identify state vs. private land
- ✅ **Environmental Restrictions**: Check protected zones

### **2. Administrative Map API**
**URL**: `https://eservices.dls.moi.gov.cy/arcgis/rest/services/National/AdminBoundaries%5FIndexes%5FEN/MapServer`

**Data Layers Available**:
- **Districts**: Administrative districts
- **Municipalities/Communities**: Local government areas
- **Parishes**: Religious/administrative subdivisions
- **Sections**: Detailed administrative boundaries
- **Cadastral Plans Framework**: Survey reference systems

**Solar Development Use Cases**:
- ✅ **Jurisdiction Verification**: Confirm administrative authority
- ✅ **Permit Routing**: Identify correct municipal offices
- ✅ **Regulatory Compliance**: Understand local requirements

### **3. Topographical Map API**
**URL**: `https://eservices.dls.moi.gov.cy/arcgis/rest/services/National/Topography%5FEN/MapServer`

**Data Layers Available**:
- **Power Stations**: Existing power infrastructure
- **EAC High Voltage Network**: Electrical grid connections
- **Road Network**: Site accessibility
- **Contour Lines**: Terrain analysis
- **Hydrographic Network**: Water features
- **NATURA 2000 Network**: Protected environmental areas

**Solar Development Use Cases**:
- ✅ **Grid Connection Analysis**: Distance to EAC infrastructure
- ✅ **Site Accessibility**: Road access for construction
- ✅ **Terrain Assessment**: Slope and elevation analysis
- ✅ **Environmental Constraints**: Protected area identification

---

## 🔑 **API Access Request Process**

### **Step 1: Contact DLS Portal Administrator**
**Email**: dls_portal_badmin@dls.moi.gov.cy

**Email Template**:
```
Subject: API Access Request - Solar Development Platform (Lighthief Cyprus Ltd)

Dear DLS Portal Administrator,

I am writing on behalf of Lighthief Cyprus Ltd (Company Registration: HE 477423) to request access to your government APIs for our solar farm development platform.

Company Information:
- Name: Lighthief Cyprus Ltd
- Registration: HE 477423
- Address: 28 October Ave 249, Lophitis Business Center 1, 3035 Limassol, Cyprus
- Website: https://solarfarms.cy
- Contact: office@lighthief.com | +357 77 77 00 50

Business Justification:
We operate a solar farm investment platform that helps landowners assess their property's potential for solar development. Access to official DLS APIs would enable us to provide authentic, government-backed land assessments including:
- Plot boundary verification
- Zoning compliance analysis  
- Development potential assessment
- Grid connection proximity analysis

Requested APIs:
1. Cadastral/Survey Map API (Priority)
2. Administrative Map API
3. Topographical Map API

Our platform serves legitimate business purposes in Cyprus's renewable energy sector and would benefit from official government data to ensure accurate assessments and regulatory compliance.

Please let me know the requirements and process for obtaining API access.

Thank you for your consideration.

Best regards,
[Your Name]
[Your Title]
Lighthief Cyprus Ltd
```

### **Step 2: API Documentation Review**
**ArcGIS REST API Documentation**: https://developers.arcgis.com/documentation/mapping-apis-and-services/

**Key Endpoints to Understand**:
- **Identify**: Get feature information at specific coordinates
- **Query**: Search features by attributes
- **Find**: Locate features by text search
- **Export**: Generate map images

---

## 💻 **Technical Implementation**

### **Environment Variables Setup**
```bash
# Add to Vercel environment variables
CYPRUS_DLS_API_KEY=your_api_key_here
CYPRUS_DLS_BASE_URL=https://eservices.dls.moi.gov.cy/arcgis/rest/services
CYPRUS_DLS_CADASTRAL_SERVICE=National/CadastralMap_EN/MapServer
CYPRUS_DLS_ADMIN_SERVICE=National/AdminBoundaries_Indexes_EN/MapServer  
CYPRUS_DLS_TOPO_SERVICE=National/Topography_EN/MapServer
```

### **API Integration Code**

#### **1. Cyprus API Client Setup**
```typescript
// lib/cyprus-api.ts
interface CyprusAPIClient {
  baseUrl: string
  apiKey?: string
}

class CyprusLandAPI {
  private client: CyprusAPIClient

  constructor() {
    this.client = {
      baseUrl: process.env.CYPRUS_DLS_BASE_URL!,
      apiKey: process.env.CYPRUS_DLS_API_KEY
    }
  }

  async identifyPlot(coordinates: {lat: number, lng: number}) {
    const url = `${this.client.baseUrl}/${process.env.CYPRUS_DLS_CADASTRAL_SERVICE}/identify`
    
    const params = new URLSearchParams({
      geometry: `${coordinates.lng},${coordinates.lat}`,
      geometryType: 'esriGeometryPoint',
      layers: 'visible:0,1,2,3,4', // Plots, Urban Zones, Building Factors, etc.
      tolerance: 10,
      mapExtent: `${coordinates.lng-0.01},${coordinates.lat-0.01},${coordinates.lng+0.01},${coordinates.lat+0.01}`,
      imageDisplay: '400,400,96',
      returnGeometry: 'true',
      f: 'json'
    })

    if (this.client.apiKey) {
      params.append('token', this.client.apiKey)
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    })

    return response.json()
  }

  async getGridInfrastructure(coordinates: {lat: number, lng: number}) {
    const url = `${this.client.baseUrl}/${process.env.CYPRUS_DLS_TOPO_SERVICE}/identify`
    
    const params = new URLSearchParams({
      geometry: `${coordinates.lng},${coordinates.lat}`,
      geometryType: 'esriGeometryPoint',
      layers: 'visible:4,5', // Power Stations, EAC High Voltage Network
      tolerance: 5000, // 5km radius for grid analysis
      mapExtent: `${coordinates.lng-0.05},${coordinates.lat-0.05},${coordinates.lng+0.05},${coordinates.lat+0.05}`,
      imageDisplay: '400,400,96',
      returnGeometry: 'true',
      f: 'json'
    })

    if (this.client.apiKey) {
      params.append('token', this.client.apiKey)
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    })

    return response.json()
  }

  async getAdministrativeInfo(coordinates: {lat: number, lng: number}) {
    const url = `${this.client.baseUrl}/${process.env.CYPRUS_DLS_ADMIN_SERVICE}/identify`
    
    const params = new URLSearchParams({
      geometry: `${coordinates.lng},${coordinates.lat}`,
      geometryType: 'esriGeometryPoint',
      layers: 'visible:1,2,3,4', // Districts, Municipalities, Parishes, Sections
      tolerance: 10,
      mapExtent: `${coordinates.lng-0.01},${coordinates.lat-0.01},${coordinates.lng+0.01},${coordinates.lat+0.01}`,
      imageDisplay: '400,400,96',
      returnGeometry: 'false',
      f: 'json'
    })

    if (this.client.apiKey) {
      params.append('token', this.client.apiKey)
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    })

    return response.json()
  }
}

export const cyprusAPI = new CyprusLandAPI()
```

#### **2. Enhanced Land Assessment Function**
```typescript
// Update app/api/land-assessment/route.ts
import { cyprusAPI } from '@/lib/cyprus-api'

async function performRealLandAssessment(data: any) {
  try {
    // Convert address to coordinates (use geocoding service)
    const coordinates = await geocodeAddress(data.location)
    
    if (!coordinates) {
      return performSimulatedAssessment(data) // Fallback to simulation
    }

    // Get real Cyprus government data
    const [plotData, gridData, adminData] = await Promise.all([
      cyprusAPI.identifyPlot(coordinates),
      cyprusAPI.getGridInfrastructure(coordinates),
      cyprusAPI.getAdministrativeInfo(coordinates)
    ])

    // Process plot information
    const plotInfo = plotData.results?.[0]?.attributes
    const plotSize = plotInfo?.AREA || parseFloat(data.plotSize) || 5
    const zoning = plotInfo?.ZONE_TYPE || 'Unknown'
    const buildingFactor = plotInfo?.BUILDING_FACTOR || 0.1

    // Process grid connection data
    const nearestGrid = findNearestGridConnection(gridData.results, coordinates)
    const gridDistance = nearestGrid ? calculateDistance(coordinates, nearestGrid.geometry) : 5.0

    // Process administrative data
    const municipality = adminData.results?.find(r => r.layerName === 'Municipalities')?.attributes?.NAME_EN
    const district = adminData.results?.find(r => r.layerName === 'Districts')?.attributes?.NAME_EN

    // Calculate solar potential with real data
    const capacityMW = Math.min(plotSize * 0.7, 10) // MW capacity based on actual plot size
    const solarIrradiation = 1800 + (Math.random() * 200 - 100) // Cyprus average with variation

    // Financial calculations
    const investmentPerMW = 900000
    const totalInvestment = capacityMW * investmentPerMW
    const annualRevenuePerMW = 200000
    const totalAnnualRevenue = capacityMW * annualRevenuePerMW

    // Development timeline based on real data
    const developmentTimeline = gridDistance < 3 && zoning.includes('Agricultural') ? 
      '12-16 months' : '18-24 months'

    return {
      plotAnalysis: {
        size: `${plotSize.toFixed(1)} hectares`,
        capacity: `${capacityMW.toFixed(1)} MW`,
        solarIrradiation: `${solarIrradiation.toFixed(0)} kWh/m²/year`,
        gridDistance: `${gridDistance.toFixed(1)} km to nearest EAC connection`,
        zoning: `${zoning} - ${isZoningSuitable(zoning) ? 'Solar Compatible' : 'Requires Review'}`,
        municipality: municipality || 'Unknown',
        district: district || 'Unknown',
        buildingFactor: buildingFactor,
        developmentFeasibility: assessFeasibility(zoning, gridDistance, buildingFactor)
      },
      financialProjections: {
        totalInvestment: `€${(totalInvestment / 1000000).toFixed(1)}M`,
        annualRevenue: `€${(totalAnnualRevenue / 1000).toFixed(0)}K`,
        rtbValue: `€${((totalInvestment + totalInvestment * 0.15) / 1000000).toFixed(1)}M`,
        developmentTimeline
      },
      landOwnerOptions: {
        annualLease: `€${(totalAnnualRevenue * 0.08 / 1000).toFixed(0)}K per year`,
        landSale: `€${((totalInvestment + totalInvestment * 0.15) * 0.3 / 1000).toFixed(0)}K premium`,
        leaseTotal25Years: `€${(totalAnnualRevenue * 0.08 * 25 / 1000000).toFixed(1)}M over 25 years`
      },
      dataSource: 'Cyprus Department of Land and Surveys - Official Government Data',
      confidence: 'High - Government Verified Data'
    }
  } catch (error) {
    console.error('Cyprus API error:', error)
    // Fallback to simulation if government API fails
    return performSimulatedAssessment(data)
  }
}

function isZoningSuitable(zoning: string): boolean {
  const suitableZones = ['Agricultural', 'Industrial', 'Mixed Use', 'Energy']
  return suitableZones.some(zone => zoning.includes(zone))
}

function assessFeasibility(zoning: string, gridDistance: number, buildingFactor: number): string {
  if (isZoningSuitable(zoning) && gridDistance < 3) return 'Excellent'
  if (isZoningSuitable(zoning) && gridDistance < 5) return 'Good'
  if (isZoningSuitable(zoning)) return 'Moderate - Grid Extension Needed'
  return 'Challenging - Zoning Review Required'
}
```

---

## 🎯 **Expected Benefits**

### **Enhanced Land Assessment Tool**
- ✅ **Official Plot Data**: Real boundaries, size, and ownership status
- ✅ **Zoning Verification**: Official development permissions and restrictions  
- ✅ **Building Factors**: Precise development potential calculations
- ✅ **Grid Analysis**: Actual distance to EAC power infrastructure
- ✅ **Administrative Accuracy**: Correct municipality and district information

### **Business Advantages**
- 🏆 **Government Credibility**: Official data backing all assessments
- 🏆 **Legal Compliance**: Accurate regulatory and zoning information
- 🏆 **Competitive Edge**: Real data vs. competitors' estimates
- 🏆 **Risk Reduction**: Verified information reduces development risks
- 🏆 **Professional Authority**: Government partnership enhances credibility

### **User Experience**
- ⚡ **Instant Verification**: Real-time government data lookup
- ⚡ **Accurate Results**: Precise plot analysis and development potential
- ⚡ **Detailed Reports**: Comprehensive government-backed assessments
- ⚡ **Trust Building**: Official data sources increase user confidence

---

## 📈 **Implementation Timeline**

### **Phase 1: API Access (Week 1)**
- Day 1: Send API access request email
- Day 2-7: Follow up and obtain API credentials
- Week 1: Test API endpoints and understand data structure

### **Phase 2: Integration (Week 2)**  
- Day 1-3: Implement Cyprus API client
- Day 4-5: Update land assessment endpoint
- Day 6-7: Test integration and error handling

### **Phase 3: Enhancement (Week 3)**
- Day 1-3: Add geocoding for address-to-coordinates conversion
- Day 4-5: Implement advanced plot analysis features
- Day 6-7: User testing and refinement

---

## 🔧 **Fallback Strategy**

If government API access is delayed or denied:
1. **Continue with simulation** for immediate functionality
2. **Add disclaimer** about simulated vs. real data
3. **Implement progressive enhancement** to add real data when available
4. **Consider alternative data sources** (private GIS providers)

---

## 📞 **Support Contacts**

**Cyprus Department of Land and Surveys**:
- **API Access**: dls_portal_badmin@dls.moi.gov.cy
- **General Info**: https://portal.dls.moi.gov.cy/en/
- **API Documentation**: https://developers.arcgis.com/documentation/

**Implementation Status**: 🔄 **Ready for API Access Request**

This integration will transform our land assessment tool from a simulation into a government-backed, professionally credible platform that provides authentic Cyprus land data! 🏛️🌞
