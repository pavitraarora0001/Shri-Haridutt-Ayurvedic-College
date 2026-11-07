import re

def analyze_schema():
    with open('prisma/schema.prisma', 'r', encoding='utf-8') as f:
        content = f.read()

    models = re.findall(r'model\s+(\w+)\s*\{([^}]+)\}', content)
    print(f"Total models parsed from schema: {len(models)}")

    field_types = set()
    attributes = set()
    for name, body in models:
        lines = [l.strip() for l in body.split('\n') if l.strip() and not l.strip().startswith('//')]
        for line in lines:
            if line.startswith('@@'):
                attr = line.split('(')[0]
                attributes.add(attr)
            else:
                parts = line.split()
                if len(parts) >= 2:
                    ftype = parts[1].replace('?', '').replace('[]', '')
                    field_types.add(ftype)
                    for part in parts[2:]:
                        if part.startswith('@'):
                            attributes.add(part.split('(')[0])

    print(f"Discovered Field Types: {sorted(field_types)}")
    print(f"Discovered Attributes: {sorted(attributes)}")

if __name__ == '__main__':
    analyze_schema()
