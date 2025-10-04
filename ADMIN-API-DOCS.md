# Bhakti App Admin API Documentation

## Overview

This document describes the admin API endpoints for managing temples, pujas, and bookings in the Bhakti App backend.

## Base URL

All admin endpoints are prefixed with `/api/admin`

## Authentication

🔐 **All admin endpoints require authentication and admin privileges.**

### Authentication Requirements:

1. User must be logged in (valid JWT token in cookies)
2. User must have `role: 'admin'` in the database
3. User account must be active (`isActive: true`)

### Headers Required:

- Cookie with valid JWT token (set automatically after login)

### Authentication Errors:

- `401 Unauthorized` - No token or invalid token
- `403 Forbidden` - User is not admin or account is deactivated

### Creating First Admin User:

```bash
# Run this command to create your first admin user
npm run create-admin

# Or create custom admin user
ts-node scripts/createAdmin.ts "Admin Name" "admin@email.com" "password123"
```

### Login Process:

Admin users login through the same `/api/auth/login` endpoint as regular users. The system automatically detects admin role and grants appropriate access.

## Models

### Temple Model

```typescript
{
  name: string,           // Temple name
  location: string,       // Temple location
  image: string,          // Image filename
  packages: [             // Array of puja packages
    {
      id: string,         // Unique package ID
      name: string,       // Package name (e.g., "Single devotee")
      numberOfPerson: number,
      title: string,      // Package subtitle/description
      price: number,      // Package price
      description: [      // Package details
        {
          id: number,
          detail: string
        }
      ],
      isPopular: boolean  // Mark as popular package
    }
  ],
  prasadDelivery: {
    included: boolean,    // Is prasad included
    deliveryTime: string, // Delivery timeframe
    prasadCharge: number  // Additional prasad cost
  },
  pandit: {
    name: string,         // Pandit name
    about: string         // Pandit description
  },
  extraInfo: object       // Additional metadata
}
```

### Puja Model

```typescript
{
  coreId: string,         // Unique identifier from original data
  className: string,      // CSS class or category
  name: string,           // Puja name
  startPrice: number,     // Starting price
  description: [          // Puja descriptions
    {
      description: string
    }
  ],
  pujaDescription: {
    lastDate: string,     // Last date to book
    description: string,  // Additional description
    pujaName: string,     // Name of puja to be performed
    metadata: string      // Additional metadata
  },
  benefits: [             // Puja benefits
    {
      name: string,       // Benefit category
      benifit: string     // Benefit description
    }
  ],
  templeId: ObjectId,     // Reference to temple
  metaData: object,       // Additional metadata
  isActive: boolean       // Is puja active/available
}
```

### Booking Model

```typescript
{
  userId: ObjectId,       // Reference to user
  pujaId: ObjectId,       // Reference to puja
  templeId: ObjectId,     // Reference to temple
  packageId: string,      // Package ID from temple
  devotees: [             // Devotee information
    {
      name: string,
      gotra?: string,
      phoneNumber?: string,
      email?: string
    }
  ],
  totalAmount: number,    // Total booking amount
  prasadIncluded: boolean,
  prasadCharge: number,
  bookingDate: Date,      // When booking was made
  pujaDate: Date,         // When puja will be performed
  status: enum,           // 'pending', 'confirmed', 'completed', 'cancelled'
  paymentStatus: enum,    // 'pending', 'paid', 'failed', 'refunded'
  paymentId?: string,     // Payment gateway ID
  videoUrl?: string,      // Puja video URL
  videoUploadedAt?: Date,
  notes?: string          // Admin notes
}
```

## API Endpoints

### Dashboard

- `GET /api/admin/dashboard` - Get admin dashboard information

### User Management

#### Get All Users

- `GET /api/admin/users`
- Query Parameters:
  - `page`, `limit`: Pagination
  - `role`: Filter by role (user/admin)
  - `isActive`: Filter by active status (true/false)

#### Create Admin User (Super Admin Only)

- `POST /api/admin/users/create-admin`
- Body: `{ name: string, email: string, password: string }`

#### Update User Role (Super Admin Only)

- `PUT /api/admin/users/:id/role`
- Body: `{ role: 'user' | 'admin' }`

#### Toggle User Status

- `PUT /api/admin/users/:id/status` - Activate/deactivate user

#### User Statistics

- `GET /api/admin/users/stats` - Get user counts and statistics

### Temple Management

#### Get All Temples

- `GET /api/admin/temples`
- Query Parameters:
  - `page` (number): Page number (default: 1)
  - `limit` (number): Items per page (default: 10)

#### Get Temple by ID

- `GET /api/admin/temples/:id`

#### Create Temple

- `POST /api/admin/temples`
- Body: Temple object (see model above)

#### Update Temple

- `PUT /api/admin/temples/:id`
- Body: Partial temple object

#### Delete Temple

- `DELETE /api/admin/temples/:id`

#### Package Management

- `POST /api/admin/temples/:id/packages` - Add package to temple
- `PUT /api/admin/temples/:id/packages/:packageId` - Update package
- `DELETE /api/admin/temples/:id/packages/:packageId` - Delete package

### Puja Management

#### Get All Pujas

- `GET /api/admin/pujas`
- Query Parameters:
  - `page` (number): Page number
  - `limit` (number): Items per page
  - `isActive` (boolean): Filter by active status
  - `templeId` (string): Filter by temple

#### Get Puja by ID

- `GET /api/admin/pujas/:id`

#### Create Puja

- `POST /api/admin/pujas`
- Body: Puja object (see model above)

#### Update Puja

- `PUT /api/admin/pujas/:id`
- Body: Partial puja object

#### Delete Puja

- `DELETE /api/admin/pujas/:id`

#### Toggle Puja Status

- `POST /api/admin/pujas/:id/toggle-status` - Activate/deactivate puja

#### Bulk Create Pujas

- `POST /api/admin/pujas/bulk-create`
- Body: `{ data: [original_data_format] }`
- This endpoint processes the original data format you provided

### Booking Management

#### Get All Bookings

- `GET /api/admin/bookings`
- Query Parameters:
  - `page`, `limit`: Pagination
  - `status`: Filter by booking status
  - `paymentStatus`: Filter by payment status
  - `templeId`: Filter by temple
  - `fromDate`, `toDate`: Filter by puja date range

#### Get Booking by ID

- `GET /api/admin/bookings/:id`

#### Create Booking

- `POST /api/admin/bookings`
- Body: Booking object

#### Update Booking

- `PUT /api/admin/bookings/:id`
- Body: Partial booking object

#### Update Booking Status

- `PUT /api/admin/bookings/:id/status`
- Body: `{ status: string, notes?: string }`

#### Update Payment Status

- `PUT /api/admin/bookings/:id/payment-status`
- Body: `{ paymentStatus: string, paymentId?: string }`

#### Upload Puja Video

- `PUT /api/admin/bookings/:id/video`
- Body: `{ videoUrl: string }`

#### Booking Statistics

- `GET /api/admin/bookings/stats/overview` - Get booking and revenue statistics

## Example Usage

### Creating Your Data

To create temples and pujas from your original data format:

```bash
# Use the bulk create endpoint
POST /api/admin/pujas/bulk-create
Content-Type: application/json

{
  "data": [
    {
      "core.id": "hanuman_8f3a2",
      "core.className": "templeList",
      "core.name": "The Birth Place of Hanuman - Anjanadri Hills (Kishkinda)",
      "core.startPrice": 500,
      // ... rest of your original data format
    }
  ]
}
```

This endpoint will:

1. Create temples if they don't exist
2. Create or update pujas
3. Return summary of operations

### Response Format

All endpoints return responses in this format:

```json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "pagination"?: {
    "current": number,
    "total": number,
    "count": number,
    "totalRecords": number
  },
  "errors"?: array
}
```

## Database Collections

- `temples` - Temple information and packages
- `pujas` - Puja details and metadata
- `bookings` - User bookings and status
- `users` - User information (existing)

## Notes

- All endpoints include proper error handling
- Pagination is implemented for list endpoints
- Proper MongoDB relationships are maintained
- Input validation is performed on all POST/PUT requests
- The original data structure has been normalized into separate collections for better performance and maintainability
