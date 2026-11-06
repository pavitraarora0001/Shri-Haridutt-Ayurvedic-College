# HOSTINGER BUSINESS WEB HOSTING — COMPLETE DEPLOYMENT GUIDE
## Shri Haridutt Ayurvedic Medical College & Hospital Website

This guide provides step-by-step instructions for deploying this Next.js 15+ production platform on **Hostinger Business Web Hosting** or **Hostinger VPS / Cloud**.

---

## 1. PRE-DEPLOYMENT VERIFICATION & ENVIRONMENT

- **Framework**: Next.js 15+ (App Router)
- **Runtime**: Node.js v20.x or v22.x LTS (compatible with Node v24 as tested locally)
- **Database**:
  - **Local Default**: SQLite (`dev.db` - zero config, persistent)
  - **Hostinger Production**: Hostinger MySQL (built-in) or SQLite
- **Package Manager**: npm

---

## 2. HOSTINGER HPANEL DEPLOYMENT OPTIONS

Hostinger provides two primary environments for running Node.js / Next.js web applications:

### OPTION A: Hostinger hPanel "Node.js Web App" (Recommended for Business Hosting)

1. **Log in to Hostinger hPanel**
   - Go to [https://hpanel.hostinger.com](https://hpanel.hostinger.com).
   - Select your hosting account for your domain (e.g., `hariduttayurveda.edu.in`).

2. **Access the Node.js Application Manager**
   - Under the **Advanced** or **Website** tab, locate **Node.js**.
   - Click **Create Application**.

3. **Configure the Node.js Application**:
   - **Node.js version**: Choose `20.x` or `22.x` (LTS).
   - **Application mode**: `Production`
   - **Application root**: `shri-haridutt-ayurvedic-college` (or `public_html`)
   - **Application URL**: `https://yourdomain.edu.in`
   - **Application startup file**: `server.js` or `npm run start`

4. **Upload Project Files**:
   - You can upload files using Hostinger File Manager, Git integration, or SFTP.
   - **Do NOT upload** `node_modules` or `.next` (these will be built on the server).
   - Upload all files including `package.json`, `prisma/`, `src/`, `tailwind.config.ts`, `tsconfig.json`, `next.config.mjs`, etc.

5. **Install Dependencies & Build in Hostinger Terminal / SSH**:
   ```bash
   npm install --production=false
   npx prisma generate
   npm run build
   ```

---

## 3. DATABASE CONFIGURATION (HOSTINGER MYSQL)

If using Hostinger's native MySQL database instead of SQLite:

1. **Create MySQL Database in hPanel**:
   - Go to **Databases** > **MySQL Databases**.
   - Enter:
     - **Database Name**: e.g., `u123456789_ayur`
     - **Username**: e.g., `u123456789_admin`
     - **Password**: `YourStrongDbPasswordHere`
   - Note down the generated details. Hostinger database host is almost always `localhost` or `127.0.0.1:3306`.

2. **Configure `.env`**:
   Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```
   In `.env`:
   ```bash
   DATABASE_URL="mysql://u123456789_admin:YourStrongDbPasswordHere@localhost:3306/u123456789_ayur"
   JWT_SECRET="YOUR_LONG_SECURE_RANDOM_SECRET_64_CHARACTERS"
   NEXT_PUBLIC_APP_URL="https://yourdomain.edu.in"
   ```

3. **Push Schema & Seed Database**:
   ```bash
   npx prisma db push
   node prisma/seed.mjs
   ```

---

## 4. PROCESS MANAGEMENT (PM2 / AUTOMATED START)

Hostinger Node.js Selector handles process management automatically. If you have SSH access and wish to manage the process via PM2:

```bash
# Install PM2 globally if not present
npm install -g pm2

# Start the Next.js production server
pm2 start npm --name "haridutt-ayurveda" -- start -- -p 3000

# Save PM2 process list to persist across reboots
pm2 save
```

---

## 5. APACHE / NGINX REVERSE PROXY (.htaccess)

If Hostinger passes traffic through Apache to your Node.js app port (e.g. port 3000):

Create or verify `.htaccess` in your `public_html`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
</IfModule>
```

---

## 6. SSL & SECURITY CONFIGURATION

1. **Activate Hostinger Free SSL**:
   - Go to hPanel > **Security** > **SSL**.
   - Click **Install SSL** on your primary domain.
   - Enable **Force HTTPS**.
2. **Set Secure Cookie in Production**:
   - The platform automatically enables HTTP-Only, Secure, SameSite=Lax cookies when `NODE_ENV=production`.

---

## 7. VERIFIED TEST CREDENTIALS (SEEDED)

### Super Administrator CMS (`/admin/login`):
- **Email**: `admin@hariduttayurveda.edu.in`
- **Password**: `Admin@123`

### Principal's Office (`/admin/login`):
- **Email**: `principal@hariduttayurveda.edu.in`
- **Password**: `Admin@123`

### Admissions Committee Officer (`/admin/login`):
- **Email**: `admissions@hariduttayurveda.edu.in`
- **Password**: `Admin@123`

### Faculty Portal (`/faculty-portal/login`):
- **Email**: `faculty@hariduttayurveda.edu.in`
- **Password**: `Faculty@123`

### Student Campus Portal (`/student/login`):
- **Student ID**: `SHAMC-2025-014` (or `pooja.verma@student.hariduttayurveda.edu.in`)
- **Password**: `Student@123`
