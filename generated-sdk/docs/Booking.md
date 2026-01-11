# Booking


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **string** |  | [optional] [default to undefined]
**coreType** | **string** |  | [optional] [default to undefined]
**eventId** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**templeId** | **string** |  | [optional] [default to undefined]
**packageId** | **string** |  | [optional] [default to undefined]
**devotees** | [**Array&lt;BookingDevoteesInner&gt;**](BookingDevoteesInner.md) |  | [optional] [default to undefined]
**totalAmount** | **number** |  | [optional] [default to undefined]
**prasadIncluded** | **boolean** |  | [optional] [default to undefined]
**prasadCharge** | **number** |  | [optional] [default to undefined]
**bookingDate** | **string** |  | [optional] [default to undefined]
**pujaDate** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to StatusEnum_Pending]
**paymentStatus** | **string** |  | [optional] [default to PaymentStatusEnum_Pending]
**paymentId** | **string** |  | [optional] [default to undefined]
**videoUrl** | **string** |  | [optional] [default to undefined]
**videoUploadedAt** | **string** |  | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { Booking } from './api';

const instance: Booking = {
    _id,
    coreType,
    eventId,
    userId,
    templeId,
    packageId,
    devotees,
    totalAmount,
    prasadIncluded,
    prasadCharge,
    bookingDate,
    pujaDate,
    status,
    paymentStatus,
    paymentId,
    videoUrl,
    videoUploadedAt,
    notes,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
