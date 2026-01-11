# Event


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **string** |  | [optional] [default to undefined]
**coreEventId** | **string** |  | [optional] [default to undefined]
**eventName** | **string** |  | [optional] [default to undefined]
**templeId** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**packageId** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**pricePackageId** | [**Array&lt;ApiEventCreatePostRequestPricePackageIdInner&gt;**](ApiEventCreatePostRequestPricePackageIdInner.md) |  | [optional] [default to undefined]
**eventStartTime** | **string** |  | [optional] [default to undefined]
**eventExpirationTime** | **string** |  | [optional] [default to undefined]
**isPopular** | **boolean** |  | [optional] [default to false]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { Event } from './api';

const instance: Event = {
    _id,
    coreEventId,
    eventName,
    templeId,
    packageId,
    pricePackageId,
    eventStartTime,
    eventExpirationTime,
    isPopular,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
