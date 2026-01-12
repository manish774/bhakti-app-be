# ApiEventUpdatePatchRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Event ID | [default to undefined]
**coreEventId** | **string** |  | [optional] [default to undefined]
**eventName** | **string** |  | [optional] [default to undefined]
**templeId** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**packageId** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**pricePackageId** | **Array&lt;object&gt;** |  | [optional] [default to undefined]
**eventStartTime** | **string** |  | [optional] [default to undefined]
**eventExpirationTime** | **string** |  | [optional] [default to undefined]
**isPopular** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { ApiEventUpdatePatchRequest } from './api';

const instance: ApiEventUpdatePatchRequest = {
    id,
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
