# Swagger/OpenAPI Documentation Setup

## ✅ Completed Setup

### 1. Dependencies Installed
- `swagger-jsdoc` - For generating OpenAPI spec from JSDoc comments
- `swagger-ui-express` - For serving Swagger UI interface
- `js-yaml` - For generating YAML files
- `@types/swagger-jsdoc`, `@types/swagger-ui-express`, `@types/js-yaml` - TypeScript types

### 2. Swagger Configuration
- Created `/src/config/swagger.ts` with comprehensive OpenAPI 3.0 configuration
- Includes all data schemas (User, Event, Package, Temple, Puja, Pandit, Booking, etc.)
- Security schemes configured (Bearer Auth & Cookie Auth)
- Server configurations (development & production)

### 3. Swagger UI Integration
- Integrated into `src/app.ts`
- **Access Swagger UI at**: `http://localhost:8080/api-docs`
- Swagger UI is served via `/api-docs` endpoint

### 4. Documentation Status

#### ✅ Fully Documented Routes (29 endpoints)
- **Auth** (`/api/auth/*`): 5 endpoints
  - POST `/api/auth/signup`
  - POST `/api/auth/login`
  - GET `/api/auth/logout`
  - POST `/api/auth/resendOtp`
  - POST `/api/auth/verify-otp`

- **Profile** (`/api/profile/*`): 2 endpoints
  - GET `/api/profile/profile`
  - PATCH `/api/profile/profile/{userId}`

- **Events** (`/api/event/*`): 5 endpoints
  - POST `/api/event/create`
  - PATCH `/api/event/update`
  - DELETE `/api/event/delete`
  - GET `/api/event/get`
  - GET `/api/event/getbytemple`

- **Core Events** (`/api/coreevent/*`): 4 endpoints
  - POST `/api/coreevent/create`
  - PATCH `/api/coreevent/update`
  - GET `/api/coreevent/get`
  - POST `/api/coreevent/getByTypes`

- **Packages** (`/api/package/*`): 5 endpoints
  - POST `/api/package/create`
  - PATCH `/api/package/update`
  - DELETE `/api/package/delete`
  - GET `/api/package/get`
  - POST `/api/package/getByIds`

- **Pandits** (`/api/pandit/*`): 5 endpoints
  - POST `/api/pandit/create`
  - PATCH `/api/pandit/update`
  - DELETE `/api/pandit/delete`
  - GET `/api/pandit/get`
  - GET `/api/pandit/getbytemple`

- **Upload** (`/api/upload/*`): 2 endpoints
  - POST `/api/upload/single`
  - POST `/api/upload/multiple`

- **Game** (`/api/game/*`): 1 endpoint
  - POST `/api/game/start`

- **Health** (`/health`): 1 endpoint
  - GET `/health`

#### 📝 Routes Available but Not Yet Documented
The following routes exist but don't have Swagger documentation yet. You can add documentation by following the same pattern used in the documented routes:
- **Groups** (`/api/group/*`)
- **Questions** (`/api/que/*`)
- **Answers** (`/api/ans/*`)
- **Admin Routes** (`/api/admin/*`)
  - Admin Users (`/api/admin/users/*`)
  - Admin Temples (`/api/admin/temples/*`)
  - Admin Pujas (`/api/admin/pujas/*`)
  - Admin Bookings (`/api/admin/bookings/*`)

### 5. OpenAPI YAML Generation

#### Generated Files
- `openapi.yaml` - OpenAPI specification in YAML format (26KB)
- `openapi.json` - OpenAPI specification in JSON format (39KB)

#### Generate/Regenerate YAML
```bash
npm run generate-openapi
```

This command will:
1. Read all Swagger JSDoc comments from route files
2. Generate OpenAPI 3.0 specification
3. Save both YAML and JSON formats to the project root

### 6. Using the OpenAPI Files

#### Generate SDKs (SAL - Software Development Kit)
You can use the generated `openapi.yaml` or `openapi.json` files to generate SDKs using tools like:

1. **openapi-generator-cli**
   ```bash
   npx @openapitools/openapi-generator-cli generate \
     -i openapi.yaml \
     -g typescript-axios \
     -o ./generated-sdk
   ```

2. **swagger-codegen**
   ```bash
   swagger-codegen generate -i openapi.yaml -l typescript-axios -o ./generated-sdk
   ```

3. **Postman**
   - Import the `openapi.json` file in Postman
   - Go to Postman → Import → Upload Files → Select `openapi.json`

4. **Insomnia**
   - Import the `openapi.yaml` or `openapi.json` file in Insomnia

5. **Swagger UI** (Already available)
   - Access at `http://localhost:8080/api-docs`
   - Or use Swagger Editor: https://editor.swagger.io/

#### Available SDK Generators
The OpenAPI spec can generate SDKs for multiple languages:
- TypeScript/JavaScript
- Python
- Java
- Go
- PHP
- Ruby
- C#
- Swift
- Kotlin
- And many more...

### 7. Adding More Documentation

To add Swagger documentation to a route, add JSDoc comments above the route handler:

```typescript
/**
 * @swagger
 * /api/your-endpoint:
 *   get:
 *     summary: Description of the endpoint
 *     tags: [YourTag]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: param
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YourSchema'
 */
router.get("/your-endpoint", handler);
```

After adding documentation, regenerate the YAML file:
```bash
npm run generate-openapi
```

### 8. Project Structure

```
project-root/
├── src/
│   ├── config/
│   │   └── swagger.ts          # Swagger configuration
│   ├── routes/
│   │   ├── auth.ts             # ✅ Documented
│   │   ├── profile.ts          # ✅ Documented
│   │   ├── event.ts            # ✅ Documented
│   │   ├── packages.ts         # ✅ Documented
│   │   ├── coreevent.ts        # ✅ Documented
│   │   ├── pandit.ts           # ✅ Documented
│   │   ├── upload.ts           # ✅ Documented
│   │   ├── game.ts             # ✅ Documented
│   │   └── ...                 # Other routes
│   └── app.ts                  # Swagger UI integrated
├── scripts/
│   └── generateOpenAPIYaml.ts  # YAML generation script
├── openapi.yaml                # Generated OpenAPI YAML
├── openapi.json                # Generated OpenAPI JSON
└── package.json                # npm script added
```

### 9. Next Steps

1. **Access Swagger UI**: Visit `http://localhost:8080/api-docs` when your server is running
2. **Test Endpoints**: Use Swagger UI to test your API endpoints interactively
3. **Generate SDKs**: Use the `openapi.yaml` file to generate SDKs for your preferred language
4. **Add More Documentation**: Follow the pattern above to document remaining routes
5. **Update Regularly**: Regenerate the YAML file after adding new documentation

### 10. Notes

- The Swagger UI is accessible at `/api-docs` endpoint
- Authentication tokens can be provided via:
  - Bearer token in Authorization header
  - Cookie named `token`
- All documented endpoints include request/response schemas
- The OpenAPI spec follows OpenAPI 3.0 standard
- Both YAML and JSON formats are generated for maximum compatibility

---

**Status**: ✅ Swagger setup complete! 29 endpoints fully documented. YAML file generated successfully.
