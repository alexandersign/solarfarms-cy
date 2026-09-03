import json, re

D = json.load(open('om_plan_structured.json'))

H1_TITLES = {
    1: "Status, Purpose, Basis and Document Hierarchy",
    2: "Project Data and System Boundaries",
    3: "Tier C Service Scope and Exclusions",
    4: "Responsible Persons, RACI and Communication",
    5: "Pre-PAC Mobilisation and Operational Readiness",
    6: "24/7 Monitoring, SCADA/EMS and Operational Control",
    7: "Alarms, SLA, Escalation and Incident Management",
    8: "Preventive Maintenance Programme",
    9: "Corrective Maintenance and Work Control",
    10: "HSE, Fire Safety, Environment and Emergency Response",
    11: "Spare Parts, Warehouse and Obsolescence",
    12: "Availability, SOH, RTE and Warranty Management",
    13: "Reporting, Data and Cybersecurity",
    14: "Regulatory Compliance, DSO and Competence",
    15: "Quality, Audits and Improvement",
    16: "Service Completion and Handover",
}

FOOTER_PAT = re.compile(r"^(Lighthief Cyprus Ltd Plan O&M|Company No\. HE 477423|Limassol, Cyprus Page)")
PAGENUM_PAT = re.compile(r"^\d{1,2}$")
H2_PAT = re.compile(r"^(\d+)\.(\d+)\s*(.*)$")
H1_NUM_PAT = re.compile(r"^(\d+)\.\s*(.*)$")
NUMBERED_PAT = re.compile(r"^(\d+)\.\s+([A-Za-z].*)$")
CALLOUT_PAT = re.compile(r"^([A-Z][A-Z0-9 /&\-]{3,50}):\s*(.*)$")
APPENDIX_PAT = re.compile(r"^Appendix ([A-D]) - (.*)$")

def flatten():
    stream = []
    for p in D:
        for kind, top, content in p['elems']:
            if kind == 'table':
                if content and content[0] and content[0][0] == '\u25ef LIGHTHIEF':
                    continue
                stream.append(('table', content))
            else:
                text = content.strip()
                if not text:
                    continue
                if FOOTER_PAT.match(text) or PAGENUM_PAT.match(text):
                    continue
                stream.append(('text', text))
    return stream


def classify_and_merge(stream):
    blocks = []
    cur = None  # dict(type=..., text=...)

    def push():
        nonlocal cur
        if cur is not None:
            blocks.append(cur)
        cur = None

    for kind, content in stream:
        if kind == 'table':
            push()
            blocks.append({'type': 'table', 'rows': content})
            continue

        text = content

        if text == 'OPERATIONAL PLAN | LTSA LCY-LTSA-GAL-2026':
            push(); cur = {'type': 'cover_kicker', 'text': text}; push(); continue
        if text == 'OPERATIONS AND MAINTENANCE PLAN (O&M)':
            push(); cur = {'type': 'cover_title', 'text': text}; push(); continue
        if text == 'BESS SYSTEM - GALASCOPE 1 AND GALASCOPE 2':
            push(); cur = {'type': 'cover_subtitle', 'text': text}; push(); continue
        if text.startswith('Implementation document for Tier C services'):
            push(); cur = {'type': 'cover_desc', 'text': text}; continue

        # H1 canonical
        m = H1_NUM_PAT.match(text)
        is_h1 = False
        if m:
            num = int(m.group(1))
            rest = m.group(2).strip()
            if num in H1_TITLES and rest[:12].lower() == H1_TITLES[num][:12].lower():
                push()
                cur = {'type': 'h1', 'num': num, 'text': H1_TITLES[num]}
                push()
                is_h1 = True
        if is_h1:
            continue

        am = APPENDIX_PAT.match(text)
        if am:
            push()
            cur = {'type': 'h1', 'num': 'Appendix ' + am.group(1), 'text': 'Appendix %s - %s' % (am.group(1), am.group(2))}
            push()
            continue

        if text in ("EOA Documents and Land-Rights Register",):
            push()
            cur = {'type': 'h1', 'num': '', 'text': text}
            push()
            continue

        if text == 'END OF DOCUMENT':
            push()
            cur = {'type': 'endmark', 'text': text}
            push()
            continue

        if text in ("Contents and Document Map", "Document Control Table"):
            push()
            cur = {'type': 'label', 'text': text}
            push()
            continue

        m2 = H2_PAT.match(text)
        if m2 and text[len(m2.group(1)) + 1 + len(m2.group(2))] if False else False:
            pass
        if m2:
            num1, num2, rest = m2.group(1), m2.group(2), m2.group(3)
            if rest and rest[0].isupper():
                push()
                cur = {'type': 'h2', 'text': '%s.%s %s' % (num1, num2, rest.strip())}
                push()
                continue

        cm = CALLOUT_PAT.match(text)
        if cm:
            push()
            cur = {'type': 'callout', 'label': cm.group(1), 'text': cm.group(2)}
            continue

        if text == '\u2022':
            push()
            cur = {'type': 'bullet', 'text': ''}
            continue
        if text.startswith('\u2022'):
            push()
            cur = {'type': 'bullet', 'text': text[1:].strip()}
            continue

        nm = NUMBERED_PAT.match(text)
        if nm:
            push()
            cur = {'type': 'numbered', 'num': nm.group(1), 'text': nm.group(2)}
            continue

        # plain continuation or new paragraph
        if cur is not None and cur['type'] in ('paragraph', 'bullet', 'numbered', 'callout', 'cover_desc'):
            cur['text'] = (cur['text'] + ' ' + text).strip()
        else:
            push()
            cur = {'type': 'paragraph', 'text': text}
    push()
    return blocks


def merge_split_tables(blocks):
    out = []
    for b in blocks:
        if (b['type'] == 'table' and out and out[-1]['type'] == 'table'
                and out[-1]['rows'] and b['rows'] and out[-1]['rows'][0] == b['rows'][0]):
            out[-1]['rows'].extend(b['rows'][1:])
        else:
            out.append(b)
    return out


if __name__ == '__main__':
    stream = flatten()
    blocks = classify_and_merge(stream)
    blocks = merge_split_tables(blocks)
    print('total blocks:', len(blocks))
    from collections import Counter
    print(Counter(b['type'] for b in blocks))
    for b in blocks[:60]:
        print(b['type'], '|', (b.get('num','')), '|', b.get('label',''), '|', b['text'][:100] if 'text' in b else (b['rows'][0] if b['rows'] else ''))
