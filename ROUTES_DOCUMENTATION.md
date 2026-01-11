# Swagger Documentation Status

This file tracks the Swagger/OpenAPI documentation status for all routes.

## Completed Routes ✅
- Auth routes (`/api/auth/*`)
- Profile routes (`/api/profile/*`)
- Event routes (`/api/event/*`)
- Health check (`/health`)

## Pending Routes (To be documented)
- Packages (`/api/package/*`)
- Core Events (`/api/coreevent/*`)
- Pandits (`/api/pandit/*`)
- Upload (`/api/upload/*`)
- Groups (`/api/group/*`)
- Questions (`/api/que/*`)
- Answers (`/api/ans/*`)
- Game (`/api/game/*`)
- Admin routes (`/api/admin/*`)
  - Admin Users (`/api/admin/users/*`)
  - Admin Temples (`/api/admin/temples/*`)
  - Admin Pujas (`/api/admin/pujas/*`)
  - Admin Bookings (`/api/admin/bookings/*`)

## Note
The Swagger UI is available at `/api-docs` and the OpenAPI YAML file can be generated using:
```bash
npm run generate-openapi
```
