// Letter of Intent (LOI) Generator for Solar Investment Projects

export interface LOIData {
  // Investor Information
  investorName: string
  investorCompany?: string
  investorAddress: string
  investorEmail: string
  investorPhone: string
  
  // Project Information
  projectName: string
  projectReference?: string
  projectCapacityMW: number
  estimatedInvestment: number
  
  // Investment Terms
  investmentAmount: number
  investmentType: 'equity' | 'debt' | 'hybrid'
  timeline: string
  
  // Special Conditions
  conditions?: string[]
  bessIncluded?: boolean
  financingRequired?: boolean
}

export function generateLOIHTML(data: LOIData): string {
  const today = new Date().toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Letter of Intent - Solar Investment</title>
        <style>
            @page { margin: 2.5cm; }
            body { 
                font-family: 'Times New Roman', serif; 
                line-height: 1.6; 
                color: #000; 
                font-size: 11pt;
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #0ea5e9;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .company-info {
                text-align: center;
                margin-bottom: 30px;
                font-size: 10pt;
                color: #666;
            }
            h1 {
                color: #0ea5e9;
                font-size: 20pt;
                margin: 0;
            }
            h2 {
                color: #333;
                font-size: 14pt;
                margin-top: 20px;
                margin-bottom: 10px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
            }
            .section {
                margin-bottom: 20px;
            }
            .highlight {
                background: #fef3c7;
                padding: 15px;
                border-left: 4px solid #f59e0b;
                margin: 20px 0;
            }
            .signature-block {
                margin-top: 50px;
                page-break-inside: avoid;
            }
            .signature-line {
                border-top: 1px solid #000;
                width: 300px;
                margin-top: 60px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            td {
                padding: 8px;
                border-bottom: 1px solid #ddd;
            }
            td:first-child {
                font-weight: bold;
                width: 40%;
            }
            .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 2px solid #0ea5e9;
                font-size: 9pt;
                color: #666;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>LETTER OF INTENT</h1>
            <p style="margin: 10px 0 0 0; font-size: 12pt; color: #666;">Solar Farm Investment - Cyprus</p>
        </div>

        <div class="company-info">
            <strong>LIGHTHIEF CYPRUS LTD</strong><br>
            15 Agaritsis, Nektaria Court, Office 201<br>
            3035 Limassol, Cyprus<br>
            Company Registration: HE 477423 | TIN: 60187188Q<br>
            Email: office@lighthief.com | Phone: +357 77 77 00 50
        </div>

        <p style="text-align: right; margin-bottom: 30px;">
            <strong>Date:</strong> ${today}
        </p>

        <div class="section">
            <h2>1. PARTIES</h2>
            <p><strong>Investor (The "Investor"):</strong></p>
            <table>
                <tr>
                    <td>Name:</td>
                    <td>${data.investorName}</td>
                </tr>
                ${data.investorCompany ? `
                <tr>
                    <td>Company:</td>
                    <td>${data.investorCompany}</td>
                </tr>` : ''}
                <tr>
                    <td>Address:</td>
                    <td>${data.investorAddress}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>${data.investorEmail}</td>
                </tr>
                <tr>
                    <td>Phone:</td>
                    <td>${data.investorPhone}</td>
                </tr>
            </table>

            <p><strong>Project Advisor (The "Advisor"):</strong></p>
            <p>
                Lighthief Cyprus Ltd, a company incorporated in Cyprus with registered office at 
                15 Agaritsis, Nektaria Court, Office 201, 3045 Zakaki, Limassol, Cyprus.
            </p>
        </div>

        <div class="section">
            <h2>2. PROJECT DETAILS</h2>
            <table>
                <tr>
                    <td>Project Name:</td>
                    <td>${data.projectName}</td>
                </tr>
                ${data.projectReference ? `
                <tr>
                    <td>Project Reference:</td>
                    <td>${data.projectReference}</td>
                </tr>` : ''}
                <tr>
                    <td>Capacity:</td>
                    <td>${data.projectCapacityMW} MW (DC)</td>
                </tr>
                <tr>
                    <td>Estimated Total Investment:</td>
                    <td><strong>€${data.estimatedInvestment.toLocaleString()}</strong></td>
                </tr>
                <tr>
                    <td>Location:</td>
                    <td>Cyprus (specific location to be disclosed upon NDA execution)</td>
                </tr>
                ${data.bessIncluded ? `
                <tr>
                    <td>BESS Included:</td>
                    <td>Yes - Battery Energy Storage System for curtailment mitigation</td>
                </tr>` : ''}
            </table>
        </div>

        <div class="section">
            <h2>3. INVESTMENT TERMS</h2>
            <table>
                <tr>
                    <td>Proposed Investment Amount:</td>
                    <td><strong>€${data.investmentAmount.toLocaleString()}</strong></td>
                </tr>
                <tr>
                    <td>Investment Structure:</td>
                    <td style="text-transform: capitalize;">${data.investmentType} Investment</td>
                </tr>
                <tr>
                    <td>Proposed Timeline:</td>
                    <td>${data.timeline}</td>
                </tr>
                ${data.financingRequired ? `
                <tr>
                    <td>Financing Required:</td>
                    <td>Yes - Investor requests introduction to banking partners</td>
                </tr>` : ''}
            </table>
        </div>

        <div class="highlight">
            <p style="margin: 0;"><strong>NON-BINDING STATEMENT:</strong></p>
            <p style="margin: 10px 0 0 0; font-size: 10pt;">
                This Letter of Intent represents the Investor's preliminary interest and is NON-BINDING. 
                It does not constitute a commitment to invest and does not create any legal obligations 
                unless and until definitive agreements are executed by all parties.
            </p>
        </div>

        <div class="section">
            <h2>4. INTENT AND NEXT STEPS</h2>
            <p>The Investor hereby expresses non-binding intent to:</p>
            <ol>
                <li style="margin-bottom: 10px;">
                    Pursue discussions regarding investment in the above-referenced solar project;
                </li>
                <li style="margin-bottom: 10px;">
                    Engage in due diligence activities including review of financial projections, 
                    technical documentation, and legal/regulatory compliance;
                </li>
                <li style="margin-bottom: 10px;">
                    Work toward execution of definitive investment agreements subject to satisfactory 
                    completion of due diligence and final approval;
                </li>
                <li style="margin-bottom: 10px;">
                    Maintain confidentiality of all information disclosed during the investment process.
                </li>
            </ol>

            <p><strong>Proposed Next Steps:</strong></p>
            <ol>
                <li style="margin-bottom: 10px;">
                    <strong>Mutual NDA Execution:</strong> Within 5 business days
                </li>
                <li style="margin-bottom: 10px;">
                    <strong>Due Diligence Package Delivery:</strong> Within 10 business days of NDA
                </li>
                <li style="margin-bottom: 10px;">
                    <strong>Site Visit (if applicable):</strong> To be scheduled within due diligence period
                </li>
                <li style="margin-bottom: 10px;">
                    <strong>Preliminary Terms Discussion:</strong> Within 30 days
                </li>
                <li style="margin-bottom: 10px;">
                    <strong>Definitive Agreement Target:</strong> Within 60-90 days subject to due diligence
                </li>
            </ol>
        </div>

        ${data.conditions && data.conditions.length > 0 ? `
        <div class="section">
            <h2>5. SPECIAL CONDITIONS</h2>
            <ul>
                ${data.conditions.map(condition => `<li style="margin-bottom: 10px;">${condition}</li>`).join('')}
            </ul>
        </div>` : ''}

        <div class="section">
            <h2>6. EXCLUSIVITY AND CONFIDENTIALITY</h2>
            <p>
                The Investor requests a period of exclusivity for due diligence and negotiation. 
                Both parties agree to maintain strict confidentiality regarding this Letter of Intent 
                and any information exchanged during the investment process.
            </p>
        </div>

        <div class="section">
            <h2>7. GOVERNING LAW</h2>
            <p>
                This Letter of Intent shall be governed by and construed in accordance with the laws of 
                the Republic of Cyprus. Any disputes shall be subject to the exclusive jurisdiction of 
                the Cyprus courts.
            </p>
        </div>

        <div class="section">
            <h2>8. VALIDITY PERIOD</h2>
            <p>
                This Letter of Intent shall remain valid for a period of 90 days from the date hereof, 
                unless extended by mutual written agreement of the parties.
            </p>
        </div>

        <div class="signature-block">
            <p><strong>ACKNOWLEDGED AND ACCEPTED:</strong></p>
            
            <div style="margin-top: 40px;">
                <p style="margin-bottom: 5px;"><strong>For the Investor:</strong></p>
                <div class="signature-line"></div>
                <p style="margin: 5px 0;">Name: ${data.investorName}</p>
                ${data.investorCompany ? `<p style="margin: 5px 0;">Title: ${data.investorCompany}</p>` : ''}
                <p style="margin: 5px 0;">Date: __________________</p>
            </div>

            <div style="margin-top: 60px;">
                <p style="margin-bottom: 5px;"><strong>For Lighthief Cyprus Ltd:</strong></p>
                <div class="signature-line"></div>
                <p style="margin: 5px 0;">Name: Alexander Papacosta</p>
                <p style="margin: 5px 0;">Title: Cyprus Director</p>
                <p style="margin: 5px 0;">Date: __________________</p>
            </div>
        </div>

        <div class="footer">
            <p>
                This Letter of Intent is prepared by Lighthief Cyprus Ltd for discussion purposes only. 
                It does not constitute legal advice and should be reviewed by qualified legal counsel 
                before execution.
            </p>
            <p style="margin-top: 10px;">
                <strong>LIGHTHIEF CYPRUS LTD</strong> | HE 477423 | www.solarfarms.cy
            </p>
        </div>
    </body>
    </html>
  `
}

export function generateLOIPDF(data: LOIData): string {
  // This will be used with PDF generation library
  return generateLOIHTML(data)
}

