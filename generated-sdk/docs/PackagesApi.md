# PackagesApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPackageCreatePost**](#apipackagecreatepost) | **POST** /api/package/create | Create a new package|
|[**apiPackageDeleteDelete**](#apipackagedeletedelete) | **DELETE** /api/package/delete | Delete a package|
|[**apiPackageGetByIdsPost**](#apipackagegetbyidspost) | **POST** /api/package/getByIds | Get packages by IDs|
|[**apiPackageGetGet**](#apipackagegetget) | **GET** /api/package/get | Get all packages with pagination|
|[**apiPackageUpdatePatch**](#apipackageupdatepatch) | **PATCH** /api/package/update | Update a package|

# **apiPackageCreatePost**
> Package apiPackageCreatePost(apiPackageCreatePostRequest)


### Example

```typescript
import {
    PackagesApi,
    Configuration,
    ApiPackageCreatePostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PackagesApi(configuration);

let apiPackageCreatePostRequest: ApiPackageCreatePostRequest; //

const { status, data } = await apiInstance.apiPackageCreatePost(
    apiPackageCreatePostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiPackageCreatePostRequest** | **ApiPackageCreatePostRequest**|  | |


### Return type

**Package**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Package created successfully |  -  |
|**400** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPackageDeleteDelete**
> Package apiPackageDeleteDelete(apiPackageDeleteDeleteRequest)


### Example

```typescript
import {
    PackagesApi,
    Configuration,
    ApiPackageDeleteDeleteRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PackagesApi(configuration);

let apiPackageDeleteDeleteRequest: ApiPackageDeleteDeleteRequest; //

const { status, data } = await apiInstance.apiPackageDeleteDelete(
    apiPackageDeleteDeleteRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiPackageDeleteDeleteRequest** | **ApiPackageDeleteDeleteRequest**|  | |


### Return type

**Package**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Package deleted successfully |  -  |
|**400** | Missing or invalid package id |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPackageGetByIdsPost**
> Array<Package> apiPackageGetByIdsPost(apiPackageGetByIdsPostRequest)


### Example

```typescript
import {
    PackagesApi,
    Configuration,
    ApiPackageGetByIdsPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PackagesApi(configuration);

let apiPackageGetByIdsPostRequest: ApiPackageGetByIdsPostRequest; //

const { status, data } = await apiInstance.apiPackageGetByIdsPost(
    apiPackageGetByIdsPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiPackageGetByIdsPostRequest** | **ApiPackageGetByIdsPostRequest**|  | |


### Return type

**Array<Package>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of packages |  -  |
|**400** | ids must be a non-empty array |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPackageGetGet**
> ApiPackageGetGet200Response apiPackageGetGet()


### Example

```typescript
import {
    PackagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PackagesApi(configuration);

let page: number; //Page number (optional) (default to 1)
let limit: number; //Items per page (optional) (default to 10)

const { status, data } = await apiInstance.apiPackageGetGet(
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

**ApiPackageGetGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of packages |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPackageUpdatePatch**
> Package apiPackageUpdatePatch(apiPackageUpdatePatchRequest)


### Example

```typescript
import {
    PackagesApi,
    Configuration,
    ApiPackageUpdatePatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PackagesApi(configuration);

let apiPackageUpdatePatchRequest: ApiPackageUpdatePatchRequest; //

const { status, data } = await apiInstance.apiPackageUpdatePatch(
    apiPackageUpdatePatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiPackageUpdatePatchRequest** | **ApiPackageUpdatePatchRequest**|  | |


### Return type

**Package**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Package updated successfully |  -  |
|**400** | Missing or invalid package id |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

