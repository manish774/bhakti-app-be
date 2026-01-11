# UploadApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiUploadMultiplePost**](#apiuploadmultiplepost) | **POST** /api/upload/multiple | Upload multiple images|
|[**apiUploadSinglePost**](#apiuploadsinglepost) | **POST** /api/upload/single | Upload a single image|

# **apiUploadMultiplePost**
> ApiUploadMultiplePost200Response apiUploadMultiplePost()


### Example

```typescript
import {
    UploadApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let images: Array<File>; //Array of image files (max 10 files, 5MB each) (default to undefined)

const { status, data } = await apiInstance.apiUploadMultiplePost(
    images
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **images** | **Array&lt;File&gt;** | Array of image files (max 10 files, 5MB each) | defaults to undefined|


### Return type

**ApiUploadMultiplePost200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Files uploaded successfully |  -  |
|**400** | No files uploaded or file size exceeds limit |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUploadSinglePost**
> ApiUploadSinglePost200Response apiUploadSinglePost()


### Example

```typescript
import {
    UploadApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let image: File; //Image file (max 5MB) (default to undefined)

const { status, data } = await apiInstance.apiUploadSinglePost(
    image
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **image** | [**File**] | Image file (max 5MB) | defaults to undefined|


### Return type

**ApiUploadSinglePost200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | File uploaded successfully |  -  |
|**400** | No file uploaded or file size exceeds limit |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

