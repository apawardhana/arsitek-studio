# Arsitek Studio CMS Setup Guide

## ✅ Quick Start (Local Development)

The CMS has already been set up for local development using **SQLite** database.

### Start the Server

```bash
npm run dev
```

### Access the CMS

- **Website**: http://localhost:3000
- **Admin CMS**: http://localhost:3000/admin

### Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@arsitekstudio.com | admin123 |
| Editor | editor@arsitekstudio.com | editor123 |

---

## CMS Features

### Dashboard
- Overview statistics
- Recent projects
- Recent form submissions
- Quick actions

### Projects
- CRUD operations
- Image upload (drag & drop)
- Draft/Published status
- Featured projects
- SEO fields

### Team Members
- Add/Edit/Delete members
- Photo upload
- Department categorization

### Services
- Manage service offerings
- Number and description

### Form Submissions
- View contact form messages
- Mark as read/unread
- Reply via email

### Analytics
- Page views tracking
- Project views
- Top pages & projects
- Daily view charts

### Settings (Admin only)
- Company information
- Statistics
- Contact details
- Social media links

### User Management (Admin only)
- Add/Remove users
- Role assignment (Admin/Editor)

---

## Role Permissions

| Feature | Admin | Editor |
|---------|-------|--------|
| View Dashboard | ✅ | ✅ |
| Manage Projects | ✅ | ✅ |
| Manage Team | ✅ | ✅ |
| Manage Services | ✅ | ✅ |
| View Submissions | ✅ | ✅ |
| View Analytics | ✅ | ✅ |
| Manage Settings | ✅ | ❌ |
| Manage Users | ✅ | ❌ |

---

## Files Structure

```
📁 arsitek-studio/
├── prisma/
│   ├── schema.prisma    # Database schema (SQLite)
│   ├── seed.ts          # Initial data seeder
│   └── dev.db           # SQLite database file
├── src/
│   ├── app/
│   │   ├── admin/       # CMS Admin Panel
│   │   │   ├── login/
│   │   │   ├── projects/
│   │   │   ├── team/
│   │   │   ├── services/
│   │   │   ├── submissions/
│   │   │   ├── analytics/
│   │   │   ├── settings/
│   │   │   └── users/
│   │   └── api/         # API Routes
│   ├── components/
│   │   └── admin/       # Admin UI Components
│   └── lib/
│       ├── db.ts        # Prisma client
│       └── auth.ts      # Auth utilities
└── public/
    └── uploads/         # Uploaded images
```

---

## Resetting Database

If you need to reset the database:

```bash
# Delete database
rm prisma/dev.db

# Recreate and seed
npx prisma db push
npx prisma db seed
```

---

## Production Deployment (MySQL)

To deploy with MySQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

2. Set environment variables:
```env
DATABASE_URL="mysql://user:password@host:3306/database"
JWT_SECRET="your-production-secret-key"
```

3. Run migrations:
```bash
npx prisma migrate deploy
```

4. Build and start:
```bash
npm run build
npm start
```

---

## Troubleshooting

### Login Not Working
- Check if database has been seeded
- Try resetting the database (see above)

### Image Upload Error
- Ensure `public/uploads` folder exists
- Check file permissions

### Database Connection Error
- Ensure prisma client is generated: `npx prisma generate`
- Check if `prisma/dev.db` exists
