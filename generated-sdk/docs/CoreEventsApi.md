# CoreEventsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiCoreeventCreatePost**](#apicoreeventcreatepost) | **POST** /api/coreevent/create | Create a new core event|
|[**apiCoreeventGetByTypesPost**](#apicoreeventgetbytypespost) | **POST** /api/coreevent/getByTypes | Get core events by types|
|[**apiCoreeventGetGet**](#apicoreeventgetget) | **GET** /api/coreevent/get | Get all core events with pagination|
|[**apiCoreeventUpdatePatch**](#apicoreeventupdatepatch) | **PATCH** /api/coreevent/update | Update a core event|

# **apiCoreeventCreatePost**
> CoreEvent apiCoreeventCreatePost(apiCoreeventCreatePostRequest)


### Example

```typescript
import {
    CoreEventsApi,
    Configuration,
    ApiCoreeventCreatePostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CoreEventsApi(configuration);

let apiCoreeventCreatePostRequest: ApiCoreeventCreatePostRequest; //

const { status, data } = await apiInstance.apiCoreeventCreatePost(
    apiCoreeventCreatePostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiCoreeventCreatePostRequest** | **ApiCoreeventCreatePostRequest**|  | |


### Return type

**CoreEvent**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Core event created successfully |  -  |
|**400** | Validation error or duplicate core event type |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCoreeventGetByTypesPost**
> Array<CoreEvent> apiCoreeventGetByTypesPost(apiCoreeventGetByTypesPostRequest)


### Example

```typescript
import {
    CoreEventsApi,
    Configuration,
    ApiCoreeventGetByTypesPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CoreEventsApi(configuration);

let apiCoreeventGetByTypesPostRequest: ApiCoreeventGetByTypesPostRequest; //

const { status, data } = await apiInstance.apiCoreeventGetByTypesPost(
    apiCoreeventGetByTypesPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiCoreeventGetByTypesPostRequest** | **ApiCoreeventGetByTypesPostRequest**|  | |


### Return type

**Array<CoreEvent>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of core events |  -  |
|**400** | types must be a non-empty array |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCoreeventGetGet**
> ApiCoreeventGetGet200Response apiCoreeventGetGet()


### Example

```typescript
import {
    CoreEventsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoreEventsApi(configuration);

let page: number; //Page number (optional) (default to 1)
let limit: number; //Items per page (optional) (default to 10)

const { status, data } = await apiInstance.apiCoreeventGetGet(
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page number | (optional) defaults to 1|
| **limit** | [**number**] | Items per page | (optional) defaults to 10|


### Return type

**ApiCoreeventGetGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of core events |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCoreeventUpdatePatch**
> CoreEvent apiCoreeventUpdatePatch(apiCoreeventUpdatePatchRequest)


### Example

```typescript
import {
    CoreEventsApi,
    Configuration,
    ApiCoreeventUpdatePatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CoreEventsApi(configuration);

let apiCoreeventUpdatePatchRequest: ApiCoreeventUpdatePatchRequest; //

const { status, data } = await apiInstance.apiCoreeventUpdatePatch(
    apiCoreeventUpdatePatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiCoreeventUpdatePatchRequest** | **ApiCoreeventUpdatePatchRequest**|  | |


### Return type

**CoreEvent**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Core event updated successfully |  -  |
|**400** | Missing or invalid core event type |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

