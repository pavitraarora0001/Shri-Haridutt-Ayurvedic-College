import os

def search_raw_queries():
    hits = []
    for root, _, files in os.walk('src'):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.mjs')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    for line_num, line in enumerate(f, 1):
                        if '$queryRaw' in line or '$executeRaw' in line or 'prisma.$' in line:
                            hits.append((path, line_num, line.strip()))
    print(f"Total raw query matches found: {len(hits)}")
    for p, num, line in hits:
        print(f"  {p}:{num} -> {line}")

if __name__ == '__main__':
    search_raw_queries()
