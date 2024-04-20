# Monter Backend Developer Intern API Documentation

## Introduction
This documentation provides details on the API endpoints for the Monter Backend Developer Intern assignment. The API allows users to register, verify their email using OTP (One-Time Password), login, update their profile details, and fetch account details.

---

### 1. Register User and Generate OTP

This endpoint allows a new user to register by providing their username, email, and password. Upon successful registration, an OTP (One-Time Password) will be generated and sent to the provided email address for verification.

#### Method: `POST`
- **URL**: `http://localhost:8000/register`

#### Request Body

```json
{
    "username": "Kiran",
    "email": "kirankumar2003g@gmail.com",
    "password": "Kiran@123"
}


#### Response
![OTP on Email](screenshots/otp_verification_on_email.png)
![Register User Response](screenshots/verify_otp_response.png)

---

### 2. Verify OTP and Validate Email

This endpoint is used to verify the OTP (One-Time Password) sent to the user's email during registration. The user needs to provide the email address and the OTP received to validate their email.

#### Method: `PUT`
- **URL**: `http://localhost:8000/verify-otp`

#### Request Body

```json
{
    "email": "kirankumar2003g@gmail.com",
    "otp": 691866
}

#### Response
![Verify OTP Response](screenshots/verify_otp_response.png)

---

### 3. Login User

This endpoint allows registered users to log in to their accounts by providing their email and password. Upon successful authentication, the user will receive an authentication token that can be used to access protected endpoints.

#### Method: `POST`
- **URL**: `http://localhost:8000/login`

#### Request Body

```json
{
    "email": "kirankumar2003g@gmail.com",
    "password": "Kiran@123"
}

#### Response

![Login User Response](screenshots/login_response.png)

---

### 4. Update Profile Details

This endpoint allows authenticated users to update their profile information, including location, age, and work details. Users can provide multiple work experiences, each with details about the company, position, start date, end date, and responsibilities.

#### Method: `PUT`
- **URL**: `http://localhost:8000/me/profile`

#### Request Body

```json
{
    "location": "Mumbai",
    "age": 20,
    "workDetails": [
        {
            "company": "Wellfound",
            "position": "Software Developer",
            "startDate": "2022-01-01",
            "endDate": "2023-12-31",
            "responsibilities": ["Developing new features", "Bug fixing", "Code reviews"]
        },
        {
            "company": "Monter",
            "position": "Backend Developer",
            "startDate": "2021-06-01",
            "endDate": "2021-12-31",
            "responsibilities": ["Developing new features", "Bug fixing", "Code reviews", "Testing applications"]
        }
    ]
}

#### Response

![Update Profile Response](screenshots/update_profile_response.png)

---

### 5. Get Account Details

This endpoint allows authenticated users to retrieve their account details, including username, email,verification status, age, location, and work details.

#### Method: `GET`
- **URL**: `http://localhost:8000/me`

#### Response

![Get Account Details Response](screenshots/get_account_response.png)

---

### 6. Logout User

This endpoint allows authenticated users to log out from their accounts, invalidating the authentication token.

#### Method: `GET`
- **URL**: `http://localhost:8000/logout`

#### Response

![Logout User Response](screenshots/logout_response.png)

---

## Error Responses
- For invalid requests or errors, appropriate HTTP status codes and error messages will be returned.

---

## Authentication
- Authentication is required for all endpoints except for `/register` and `/login`.
- Include the authentication token in the header of the request as follows:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjM0YTUyY2VmNTFlYzZmMzAzYWI1YSIsImlhdCI6MTcxMzU4ODkzMSwiZXhwIjoxNzE0MDIwOTMxfQ.1YTaC2bLoqG5SKEK38H2tjf4PcFQXv0BJfFQ5UkaV70
