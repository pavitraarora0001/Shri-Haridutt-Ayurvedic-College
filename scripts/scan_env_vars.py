import os
import re

def scan_env_vars():
    env_vars = {}
    for root, _, files in os.walk('src'):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.mjs')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    matches = re.findall(r'process\.env\.([A-Za-z0-9_]+)', content)
                    for m in matches:
                        if m not in env_vars:
                            env_vars[m] = []
                        env_vars[m].append(path)
    
    # Also check prisma files
    for root, _, files in os.walk('prisma'):
        for file in files:
            if file.endswith(('.prisma', '.mjs', '.js')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    matches = re.findall(r'env\(["\']([A-Za-z0-9_]+)["\']\)', content)
                    matches += re.findall(r'process\.env\.([A-Za-z0-9_]+)', content)
                    for m in matches:
                        if m not in env_vars:
                            env_vars[m] = []
                        env_vars[m].append(path)

    print("Discovered Environment Variables in Source Code:")
    for k in sorted(env_vars.keys()):
        print(f"\n[{k}] ({len(env_vars[k])} references):")
        unique_paths = sorted(set(env_vars[k]))
        for p in unique_paths[:5]:
            print(f"  - {p}")
        if len(unique_paths) > 5:
            print(f"  ... and {len(unique_paths) - 5} more files")

if __name__ == '__main__':
    scan_env_vars()
