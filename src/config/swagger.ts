import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerDefinition } from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bhakti App API",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for Bhakti App - A spiritual services booking platform",
      contact: {
        name: "API Support",
        email: "support@bhaktiapp.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
      {
        url: "https://api.bhaktiapp.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "JWT token obtained from login endpoint. Can be provided via Authorization header or cookie.",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description: "JWT token stored in httpOnly cookie",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
            errors: {
              type: "object",
              description: "Validation errors",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
            },
            data: {
              type: "object",
            },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            total: {
              type: "integer",
              description: "Total number of items",
            },
            page: {
              type: "integer",
              description: "Current page number",
            },
            limit: {
              type: "integer",
              description: "Items per page",
            },
            totalPages: {
              type: "integer",
              description: "Total number of pages",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              default: "user",
            },
            isActive: {
              type: "boolean",
              default: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Location: {
          type: "object",
          required: ["addressLine1", "city", "state", "country", "pinCode"],
          properties: {
            addressLine1: {
              type: "string",
              example: "123 Main Street",
            },
            addressLine2: {
              type: "string",
              example: "Apt 4B",
            },
            landmark: {
              type: "string",
              example: "Near Park",
            },
            city: {
              type: "string",
              example: "Mumbai",
            },
            state: {
              type: "string",
              example: "Maharashtra",
            },
            country: {
              type: "string",
              example: "India",
            },
            pinCode: {
              type: "string",
              pattern: "^\\d{6}$",
              example: "400001",
            },
          },
        },
        Temple: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            name: {
              type: "string",
              example: "Shree Siddhivinayak Temple",
            },
            location: {
              $ref: "#/components/schemas/Location",
            },
            image: {
              type: "string",
              format: "uri",
            },
            images: {
              type: "array",
              items: {
                type: "string",
                format: "uri",
              },
            },
            description: {
              type: "array",
              items: {
                type: "string",
              },
            },
            extraInfo: {
              type: "object",
            },
            contractorInfo: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                phone: {
                  type: "string",
                },
                address: {
                  $ref: "#/components/schemas/Location",
                },
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Package: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            name: {
              type: "string",
              example: "Basic Package",
            },
            numberOfPerson: {
              type: "integer",
              minimum: 1,
              example: 5,
            },
            title: {
              type: "string",
              example: "Family Puja Package",
            },
            price: {
              type: "number",
              minimum: 0,
              example: 5000,
            },
            description: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                  },
                  detail: {
                    type: "string",
                  },
                },
              },
            },
            isPopular: {
              type: "boolean",
              default: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        CoreEvent: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            type: {
              type: "string",
              enum: ["coreevent_online_puja", "coreevent_offline_puja"],
              example: "coreevent_online_puja",
            },
            title: {
              type: "string",
              example: "Online Puja",
            },
            description: {
              type: "string",
            },
            icon: {
              type: "string",
            },
            color: {
              type: "string",
            },
            shadowColor: {
              type: "string",
            },
            visible: {
              type: "boolean",
              default: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Event: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            coreEventId: {
              type: "string",
              example: "coreevent_online_puja",
            },
            eventName: {
              type: "string",
              example: "Ganesh Chaturthi Puja",
            },
            templeId: {
              type: "array",
              items: {
                type: "string",
                format: "ObjectId",
              },
            },
            packageId: {
              type: "array",
              items: {
                type: "string",
                format: "ObjectId",
              },
            },
            pricePackageId: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  packageId: {
                    type: "string",
                  },
                  price: {
                    type: "number",
                  },
                  discount: {
                    type: "number",
                  },
                },
              },
            },
            eventStartTime: {
              type: "string",
              format: "date-time",
            },
            eventExpirationTime: {
              type: "string",
              format: "date-time",
            },
            isPopular: {
              type: "boolean",
              default: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Puja: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            coreId: {
              type: "string",
            },
            className: {
              type: "string",
            },
            name: {
              type: "string",
              example: "Ganesh Chaturthi Puja",
            },
            startPrice: {
              type: "number",
              minimum: 0,
            },
            description: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                },
              },
            },
            pujaDescription: {
              type: "object",
            },
            benefits: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  benifit: {
                    type: "string",
                  },
                },
              },
            },
            templeId: {
              type: "string",
              format: "ObjectId",
            },
            metaData: {
              type: "object",
            },
            isActive: {
              type: "boolean",
              default: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Pandit: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            name: {
              type: "string",
              example: "Pandit Sharma",
            },
            about: {
              type: "string",
            },
            address: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            phone: {
              type: "string",
            },
            extraInfo: {
              type: "string",
            },
            specialization: {
              type: "array",
              items: {
                type: "string",
              },
            },
            templeAssociatedId: {
              type: "array",
              items: {
                type: "string",
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Booking: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            coreType: {
              type: "string",
              example: "coreevent_online_puja",
            },
            eventId: {
              type: "string",
              format: "ObjectId",
            },
            userId: {
              type: "string",
              format: "ObjectId",
            },
            templeId: {
              type: "string",
              format: "ObjectId",
            },
            packageId: {
              type: "string",
            },
            devotees: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  gotra: {
                    type: "string",
                  },
                  phoneNumber: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                    format: "email",
                  },
                },
              },
            },
            totalAmount: {
              type: "number",
              minimum: 0,
            },
            prasadIncluded: {
              type: "boolean",
            },
            prasadCharge: {
              type: "number",
              minimum: 0,
            },
            bookingDate: {
              type: "string",
              format: "date-time",
            },
            pujaDate: {
              type: "string",
              format: "date-time",
            },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "completed", "cancelled"],
              default: "pending",
            },
            paymentStatus: {
              type: "string",
              enum: ["pending", "paid", "failed", "refunded"],
              default: "pending",
            },
            paymentId: {
              type: "string",
            },
            videoUrl: {
              type: "string",
              format: "uri",
            },
            videoUploadedAt: {
              type: "string",
              format: "date-time",
            },
            notes: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Group: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            name: {
              type: "string",
            },
            type: {
              type: "string",
              enum: ["PRIVATE", "PUBLIC"],
            },
            adminIds: {
              type: "array",
              items: {
                type: "string",
                format: "ObjectId",
              },
            },
            memberIds: {
              type: "array",
              items: {
                type: "string",
                format: "ObjectId",
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Question: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            question: {
              type: "string",
            },
            dateTime: {
              type: "string",
              format: "date-time",
            },
            groupId: {
              type: "string",
              format: "ObjectId",
            },
            askedBy: {
              type: "string",
              format: "ObjectId",
            },
            status: {
              type: "string",
            },
            isActive: {
              type: "string",
              enum: ["ACTIVE", "INACTIVE"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Answer: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
            },
            answer: {
              type: "string",
            },
            dateTime: {
              type: "string",
              format: "date-time",
            },
            groupId: {
              type: "string",
              format: "ObjectId",
            },
            answeredBy: {
              type: "string",
              format: "ObjectId",
            },
            status: {
              type: "string",
            },
            isActive: {
              type: "string",
              enum: ["ACTIVE", "INACTIVE"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
      {
        cookieAuth: [],
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication endpoints",
      },
      {
        name: "Profile",
        description: "User profile management",
      },
      {
        name: "Admin",
        description: "Admin panel endpoints",
      },
      {
        name: "Events",
        description: "Event management",
      },
      {
        name: "Core Events",
        description: "Core event types management",
      },
      {
        name: "Packages",
        description: "Package management",
      },
      {
        name: "Pandits",
        description: "Pandit management",
      },
      {
        name: "Upload",
        description: "File upload endpoints",
      },
      {
        name: "Groups",
        description: "Group management",
      },
      {
        name: "Questions",
        description: "Question management",
      },
      {
        name: "Answers",
        description: "Answer management",
      },
      {
        name: "Game",
        description: "Game endpoints",
      },
      {
        name: "Health",
        description: "Health check endpoint",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../routes/*.ts"),
    path.join(__dirname, "../app.ts"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
