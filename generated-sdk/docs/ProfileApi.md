# ProfileApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiProfileProfileGet**](#apiprofileprofileget) | **GET** /api/profile/profile | Get current user profile|
|[**apiProfileProfileUserIdPatch**](#apiprofileprofileuseridpatch) | **PATCH** /api/profile/profile/{userId} | Update user profile|

# **apiProfileProfileGet**
> User apiProfileProfileGet()


### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

const { status, data } = await apiInstance.apiProfileProfileGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**User**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User profile retrieved successfully |  -  |
|**400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiProfileProfileUserIdPatch**
> User apiProfileProfileUserIdPatch(apiProfileProfileUserIdPatchRequest)


### Example

```typescript
import {
    ProfileApi,
    Configuration,
    ApiProfileProfileUserIdPatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

let userId: string; //User ID (default to undefined)
let apiProfileProfileUserIdPatchRequest: ApiProfileProfileUserIdPatchRequest; //

const { status, data } = await apiInstance.apiProfileProfileUserIdPatch(
    userId,
    apiProfileProfileUserIdPatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiProfileProfileUserIdPatchRequest** | **ApiProfileProfileUserIdPatchRequest**|  | |
| **userId** | [**string**] | User ID | defaults to undefined|


### Return type

**User**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Profile updated successfully |  -  |
|**400** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

