# Package


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_id** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**numberOfPerson** | **number** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**price** | **number** |  | [optional] [default to undefined]
**description** | [**Array&lt;ApiPackageCreatePostRequestDescriptionInner&gt;**](ApiPackageCreatePostRequestDescriptionInner.md) |  | [optional] [default to undefined]
**isPopular** | **boolean** |  | [optional] [default to false]
**createdAt** | **string** |  | [optional] [default to undefined]
**updatedAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { Package } from './api';

const instance: Package = {
    _id,
    name,
    numberOfPerson,
    title,
    price,
    description,
    isPopular,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
