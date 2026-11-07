import sqlite3

def check_db():
    conn = sqlite3.connect('prisma/backups/master_remediation_20261107/dev.db')
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma%'")
    tables = [row[0] for row in cursor.fetchall()]
    print(f"Verified Backup DB: Successfully connected.")
    print(f"Total Institutional Tables: {len(tables)}\n")
    print(f"{'Table Name':<30} | {'Record Count':<12}")
    print("-" * 45)
    total_records = 0
    for table in sorted(tables):
        cursor.execute(f'SELECT COUNT(*) FROM "{table}"')
        count = cursor.fetchone()[0]
        total_records += count
        print(f"{table:<30} | {count:<12}")
    print("-" * 45)
    print(f"{'Total Stored Records':<30} | {total_records:<12}")
    conn.close()

if __name__ == '__main__':
    check_db()
