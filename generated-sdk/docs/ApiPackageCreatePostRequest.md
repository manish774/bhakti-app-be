# ApiPackageCreatePostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**numberOfPerson** | **number** |  | [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**price** | **number** |  | [default to undefined]
**description** | [**Array&lt;ApiPackageCreatePostRequestDescriptionInner&gt;**](ApiPackageCreatePostRequestDescriptionInner.md) |  | [optional] [default to undefined]
**isPopular** | **boolean** |  | [optional] [default to false]

## Example

```typescript
import { ApiPackageCreatePostRequest } from './api';

const instance: ApiPackageCreatePostRequest = {
    name,
    numberOfPerson,
    title,
    price,
    description,
    isPopular,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
