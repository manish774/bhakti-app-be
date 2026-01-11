# ApiEventCreatePostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**coreEventId** | **string** |  | [default to undefined]
**eventName** | **string** |  | [default to undefined]
**templeId** | **Array&lt;string&gt;** |  | [default to undefined]
**packageId** | **Array&lt;string&gt;** |  | [default to undefined]
**pricePackageId** | [**Array&lt;ApiEventCreatePostRequestPricePackageIdInner&gt;**](ApiEventCreatePostRequestPricePackageIdInner.md) |  | [default to undefined]
**eventStartTime** | **string** |  | [default to undefined]
**eventExpirationTime** | **string** |  | [default to undefined]
**isPopular** | **boolean** |  | [optional] [default to false]

## Example

```typescript
import { ApiEventCreatePostRequest } from './api';

const instance: ApiEventCreatePostRequest = {
    coreEventId,
    eventName,
    templeId,
    packageId,
    pricePackageId,
    eventStartTime,
    eventExpirationTime,
    isPopular,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
