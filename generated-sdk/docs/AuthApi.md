# AuthApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAuthLoginPost**](#apiauthloginpost) | **POST** /api/auth/login | User login|
|[**apiAuthLogoutGet**](#apiauthlogoutget) | **GET** /api/auth/logout | User logout|
|[**apiAuthResendOtpPost**](#apiauthresendotppost) | **POST** /api/auth/resendOtp | Resend OTP verification code|
|[**apiAuthSignupPost**](#apiauthsignuppost) | **POST** /api/auth/signup | User registration|
|[**apiAuthVerifyOtpPost**](#apiauthverifyotppost) | **POST** /api/auth/verify-otp | Verify OTP and activate account|

# **apiAuthLoginPost**
> ApiAuthLoginPost200Response apiAuthLoginPost(apiAuthLoginPostRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ApiAuthLoginPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let apiAuthLoginPostRequest: ApiAuthLoginPostRequest; //

const { status, data } = await apiInstance.apiAuthLoginPost(
    apiAuthLoginPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiAuthLoginPostRequest** | **ApiAuthLoginPostRequest**|  | |


### Return type

**ApiAuthLoginPost200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Login successful |  * Set-Cookie -  <br>  |
|**400** | Password incorrect or user not verified |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAuthLogoutGet**
> string apiAuthLogoutGet()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.apiAuthLogoutGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Logged out successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAuthResendOtpPost**
> ApiAuthResendOtpPost200Response apiAuthResendOtpPost(apiAuthResendOtpPostRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ApiAuthResendOtpPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let apiAuthResendOtpPostRequest: ApiAuthResendOtpPostRequest; //

const { status, data } = await apiInstance.apiAuthResendOtpPost(
    apiAuthResendOtpPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiAuthResendOtpPostRequest** | **ApiAuthResendOtpPostRequest**|  | |


### Return type

**ApiAuthResendOtpPost200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OTP sent successfully |  -  |
|**400** | User already verified |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAuthSignupPost**
> object apiAuthSignupPost(apiAuthSignupPostRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ApiAuthSignupPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let apiAuthSignupPostRequest: ApiAuthSignupPostRequest; //

const { status, data } = await apiInstance.apiAuthSignupPost(
    apiAuthSignupPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiAuthSignupPostRequest** | **ApiAuthSignupPostRequest**|  | |


### Return type

**object**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User registered successfully. OTP sent to email. |  -  |
|**400** | Validation error or user already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAuthVerifyOtpPost**
> ApiAuthVerifyOtpPost200Response apiAuthVerifyOtpPost(apiAuthVerifyOtpPostRequest)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ApiAuthVerifyOtpPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let apiAuthVerifyOtpPostRequest: ApiAuthVerifyOtpPostRequest; //

const { status, data } = await apiInstance.apiAuthVerifyOtpPost(
    apiAuthVerifyOtpPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiAuthVerifyOtpPostRequest** | **ApiAuthVerifyOtpPostRequest**|  | |


### Return type

**ApiAuthVerifyOtpPost200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Email verified successfully |  -  |
|**400** | Invalid OTP or user already verified |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

