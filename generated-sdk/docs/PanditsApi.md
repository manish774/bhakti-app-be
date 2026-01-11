# PanditsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPanditCreatePost**](#apipanditcreatepost) | **POST** /api/pandit/create | Create a new pandit|
|[**apiPanditDeleteDelete**](#apipanditdeletedelete) | **DELETE** /api/pandit/delete | Delete a pandit|
|[**apiPanditGetGet**](#apipanditgetget) | **GET** /api/pandit/get | Get all pandits|
|[**apiPanditGetbytempleGet**](#apipanditgetbytempleget) | **GET** /api/pandit/getbytemple | Get pandits by temple ID|
|[**apiPanditUpdatePatch**](#apipanditupdatepatch) | **PATCH** /api/pandit/update | Update a pandit|

# **apiPanditCreatePost**
> Pandit apiPanditCreatePost(apiPanditCreatePostRequest)


### Example

```typescript
import {
    PanditsApi,
    Configuration,
    ApiPanditCreatePostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PanditsApi(configuration);

let apiPanditCreatePostRequest: ApiPanditCreatePostRequest; //

const { status, data } = await apiInstance.apiPanditCreatePost(
    apiPanditCreatePostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiPanditCreatePostRequest** | **ApiPanditCreatePostRequest**|  | |


### Return type

**Pandit**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Pandit created successfully |  -  |
|**400** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPanditDeleteDelete**
> Pandit apiPanditDeleteDelete(apiPanditDeleteDeleteRequest)


### Example

```typescript
import {
    PanditsApi,
    Configuration,
    ApiPanditDeleteDeleteRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PanditsApi(configuration);

let apiPanditDeleteDeleteRequest: ApiPanditDeleteDeleteRequest; //

const { status, data } = await apiInstance.apiPanditDeleteDelete(
    apiPanditDeleteDeleteRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiPanditDeleteDeleteRequest** | **ApiPanditDeleteDeleteRequest**|  | |


### Return type

**Pandit**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Pandit deleted successfully |  -  |
|**400** | Missing or invalid pandit id |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPanditGetGet**
> Array<Pandit> apiPanditGetGet()


### Example

```typescript
import {
    PanditsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PanditsApi(configuration);

const { status, data } = await apiInstance.apiPanditGetGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Pandit>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of all pandits |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPanditGetbytempleGet**
> Array<Pandit> apiPanditGetbytempleGet()


### Example

```typescript
import {
    PanditsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PanditsApi(configuration);

let templeId: string; //Temple ID (default to undefined)

const { status, data } = await apiInstance.apiPanditGetbytempleGet(
    templeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **templeId** | [**string**] | Temple ID | defaults to undefined|


### Return type

**Array<Pandit>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of pandits for the temple |  -  |
|**400** | Missing temple id |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPanditUpdatePatch**
> Pandit apiPanditUpdatePatch(apiPanditUpdatePatchRequest)


### Example

```typescript
import {
    PanditsApi,
    Configuration,
    ApiPanditUpdatePatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PanditsApi(configuration);

let apiPanditUpdatePatchRequest: ApiPanditUpdatePatchRequest; //

const { status, data } = await apiInstance.apiPanditUpdatePatch(
    apiPanditUpdatePatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiPanditUpdatePatchRequest** | **ApiPanditUpdatePatchRequest**|  | |


### Return type

**Pandit**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Pandit updated successfully |  -  |
|**400** | Missing or invalid pandit id |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

