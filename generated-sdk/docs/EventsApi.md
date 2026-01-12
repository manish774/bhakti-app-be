# EventsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiEventCreatePost**](#apieventcreatepost) | **POST** /api/event/create | Create a new event|
|[**apiEventDeleteDelete**](#apieventdeletedelete) | **DELETE** /api/event/delete | Delete an event|
|[**apiEventGetGet**](#apieventgetget) | **GET** /api/event/get | Get all events with pagination and filters|
|[**apiEventGetbytempleGet**](#apieventgetbytempleget) | **GET** /api/event/getbytemple | Get events by temple ID|
|[**apiEventUpdatePatch**](#apieventupdatepatch) | **PATCH** /api/event/update | Update an event|

# **apiEventCreatePost**
> Event apiEventCreatePost(apiEventCreatePostRequest)


### Example

```typescript
import {
    EventsApi,
    Configuration,
    ApiEventCreatePostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsApi(configuration);

let apiEventCreatePostRequest: ApiEventCreatePostRequest; //

const { status, data } = await apiInstance.apiEventCreatePost(
    apiEventCreatePostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiEventCreatePostRequest** | **ApiEventCreatePostRequest**|  | |


### Return type

**Event**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event created successfully |  -  |
|**400** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEventDeleteDelete**
> Event apiEventDeleteDelete(apiEventDeleteDeleteRequest)


### Example

```typescript
import {
    EventsApi,
    Configuration,
    ApiEventDeleteDeleteRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsApi(configuration);

let apiEventDeleteDeleteRequest: ApiEventDeleteDeleteRequest; //

const { status, data } = await apiInstance.apiEventDeleteDelete(
    apiEventDeleteDeleteRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiEventDeleteDeleteRequest** | **ApiEventDeleteDeleteRequest**|  | |


### Return type

**Event**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event deleted successfully |  -  |
|**400** | Missing or invalid event id |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEventGetGet**
> ApiEventGetGet200Response apiEventGetGet()


### Example

```typescript
import {
    EventsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsApi(configuration);

let page: number; //Page number (optional) (default to 1)
let limit: number; //Items per page (optional) (default to 10000)
let templeId: string; //Filter by temple ID (optional) (default to undefined)
let coreEventId: string; //Filter by core event ID (optional) (default to undefined)
let packageId: string; //Filter by package ID (optional) (default to undefined)
let isPopular: boolean; //Filter by popular status (optional) (default to undefined)

const { status, data } = await apiInstance.apiEventGetGet(
    page,
    limit,
    templeId,
    coreEventId,
    packageId,
    isPopular
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page number | (optional) defaults to 1|
| **limit** | [**number**] | Items per page | (optional) defaults to 10000|
| **templeId** | [**string**] | Filter by temple ID | (optional) defaults to undefined|
| **coreEventId** | [**string**] | Filter by core event ID | (optional) defaults to undefined|
| **packageId** | [**string**] | Filter by package ID | (optional) defaults to undefined|
| **isPopular** | [**boolean**] | Filter by popular status | (optional) defaults to undefined|


### Return type

**ApiEventGetGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of events |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEventGetbytempleGet**
> Array<Event> apiEventGetbytempleGet()


### Example

```typescript
import {
    EventsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsApi(configuration);

let templeId: string; //Temple ID (default to undefined)

const { status, data } = await apiInstance.apiEventGetbytempleGet(
    templeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **templeId** | [**string**] | Temple ID | defaults to undefined|


### Return type

**Array<Event>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of events for the temple |  -  |
|**400** | Missing temple id |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEventUpdatePatch**
> Event apiEventUpdatePatch(apiEventUpdatePatchRequest)


### Example

```typescript
import {
    EventsApi,
    Configuration,
    ApiEventUpdatePatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsApi(configuration);

let apiEventUpdatePatchRequest: ApiEventUpdatePatchRequest; //

const { status, data } = await apiInstance.apiEventUpdatePatch(
    apiEventUpdatePatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiEventUpdatePatchRequest** | **ApiEventUpdatePatchRequest**|  | |


### Return type

**Event**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event updated successfully |  -  |
|**400** | Invalid event id or validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

