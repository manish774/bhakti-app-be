# GameApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiGameStartPost**](#apigamestartpost) | **POST** /api/game/start | Start a game session|

# **apiGameStartPost**
> ApiGameStartPost200Response apiGameStartPost(apiGameStartPostRequest)


### Example

```typescript
import {
    GameApi,
    Configuration,
    ApiGameStartPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new GameApi(configuration);

let apiGameStartPostRequest: ApiGameStartPostRequest; //

const { status, data } = await apiInstance.apiGameStartPost(
    apiGameStartPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiGameStartPostRequest** | **ApiGameStartPostRequest**|  | |


### Return type

**ApiGameStartPost200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Game session started successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

