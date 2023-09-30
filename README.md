# Ecommerce-API

## Description

## Table of Contents

## Installation

npm install

## Usage

npm run server

## Docs

You can find the API documentation here:- https://documenter.getpostman.com/view/10879422/2s9YJaZ4QY#f985dcb8-59d7-42a6-8d05-8d49a6536c5e

# nodejs-ecommerce-api

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

## Endpoints

- [Ecommerce-API](#ecommerce-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Docs](#docs)
- [nodejs-ecommerce-api](#nodejs-ecommerce-api)
  - [Endpoints](#endpoints)
  - [Users](#users)
    - [1. register](#1-register)
    - [2. login](#2-login)
    - [3. GET Profile](#3-get-profile)
    - [4. Update Shipping Address](#4-update-shipping-address)
    - [5. Success](#5-success)
  - [Products](#products)
    - [1. Create Product](#1-create-product)
    - [2. All products with filter](#2-all-products-with-filter)
    - [3. Product by ID](#3-product-by-id)
    - [4. Update Product by ID](#4-update-product-by-id)
    - [5. Delete Product by ID](#5-delete-product-by-id)
  - [Categories](#categories)
    - [1. Create category](#1-create-category)
    - [2. Category by ID](#2-category-by-id)
    - [3. DeleteCategory by ID](#3-deletecategory-by-id)
    - [4. Update Category by ID](#4-update-category-by-id)
    - [5. All Categories](#5-all-categories)
  - [Brands](#brands)
    - [1. Create Brands](#1-create-brands)
    - [2. Brand by ID](#2-brand-by-id)
    - [3. All Brands](#3-all-brands)
    - [4. Delete brands by ID](#4-delete-brands-by-id)
    - [5. Update Brands by ID](#5-update-brands-by-id)
  - [Colors](#colors)
    - [1. Create Colors](#1-create-colors)
    - [2. Color by ID](#2-color-by-id)
    - [3. All Colors](#3-all-colors)
    - [4. Delete Color by ID](#4-delete-color-by-id)
    - [5. Update Color by ID](#5-update-color-by-id)
  - [Reviews](#reviews)
    - [1. Create Review](#1-create-review)
    - [2. Review by productID](#2-review-by-productid)
    - [3. All reviews](#3-all-reviews)
    - [4. Delete review by ID](#4-delete-review-by-id)
    - [5. Update Review by ID](#5-update-review-by-id)
  - [Orders](#orders)
    - [1. Create Order](#1-create-order)
    - [2. All order for specific user](#2-all-order-for-specific-user)
    - [3. Order Status](#3-order-status)
    - [4. Delete Order by ID](#4-delete-order-by-id)
    - [5. Single order by OrderID](#5-single-order-by-orderid)
    - [6. Update order by OrderID](#6-update-order-by-orderid)
  - [Coupons](#coupons)
    - [1. Create Coupons](#1-create-coupons)
    - [2. All Coupons](#2-all-coupons)
    - [3. Single coupon by couponID](#3-single-coupon-by-couponid)
    - [4. Update Coupon](#4-update-coupon)
    - [5. Delete Coupon by ID](#5-delete-coupon-by-id)

---

## Users

### 1. register

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/{{version}}/users/register
```

**_Body:_**

```js
{
  "fullName":"Rohan",
  "email":"Rohan@gmail.com",
  "password":"12345"
}
```

### 2. login

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/{{version}}/users/login
```

**_Body:_**

```js
{
  "email":"Rohan@gmail.com",
  "password":"12345"
}
```

### 3. GET Profile

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/users/profile
```

### 4. Update Shipping Address

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{url}}/{{version}}/users/update/shipping
```

**_Body:_**

```js
{
  "fullName":"hello",
  "email":"Nate",
  "address":"Himachal",
  "city":"Mandi",
  "postalCode":"173026",
  "country":"India",
  "province":"Near Village"
}
```

### 5. Success

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/success
```

## Products

### 1. Create Product

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{url}}/{{version}}/products
```

**_Body:_**

| Key  | Value | Description |
| ---- | ----- | ----------- |
| file |       |             |

### 2. All products with filter

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/products
```

### 3. Product by ID

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/products/650eba6ebb5cc29d96d74651
```

### 4. Update Product by ID

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{url}}/{{version}}/products/650eb290fa3559e0631e899c
```

**_Body:_**

```js
{
    "price": 1200,
    "totalQty": 54
}
```

### 5. Delete Product by ID

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: {{url}}/{{version}}/products/650eb290fa3559e0631e899c/delete
```

**_Body:_**

```js
{
  "price": 1200,
  "totalQty": 54
}
```

## Categories

### 1. Create category

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{url}}/{{version}}/categories
```

**_Body:_**

| Key  | Value | Description |
| ---- | ----- | ----------- |
| name | Women |             |
| file |       |             |

### 2. Category by ID

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/categories/650f32305469c241f8a7750f
```

### 3. DeleteCategory by ID

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/{{version}}/categories/65131d6abbffadaa6791e5d0/delete
```

### 4. Update Category by ID

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{url}}/{{version}}/categories/650f32305469c241f8a7750f
```

**_Body:_**

```js
{
    "name":"Mens"
}
```

### 5. All Categories

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/categories
```

## Brands

### 1. Create Brands

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/{{version}}/brands
```

**_Body:_**

```js
{
  "name":"Addidas"
}
```

### 2. Brand by ID

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/brands/650f4540018e414d401c9ed1
```

### 3. All Brands

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/brands
```

### 4. Delete brands by ID

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/{{version}}/brands/650f4540018e414d401c9ed1/delete
```

### 5. Update Brands by ID

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{url}}/{{version}}/categories/650f32305469c241f8a7750f
```

**_Body:_**

```js
{
    "name":"Mens"
}
```

## Colors

### 1. Create Colors

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/{{version}}/colors
```

**_Body:_**

```js
{
  "name":"black"
}
```

### 2. Color by ID

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/colors/651023b879157d8111c2b0c5
```

### 3. All Colors

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/colors
```

### 4. Delete Color by ID

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/{{version}}/colors/651023b879157d8111c2b0c5/delete
```

### 5. Update Color by ID

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{url}}/{{version}}/colors/651023b879157d8111c2b0c5
```

**_Body:_**

```js
{
    "name":"blue"
}
```

## Reviews

### 1. Create Review

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/{{version}}/reviews/650eba6ebb5cc29d96d74651
```

**_Body:_**

```js
{
  "message":"Good looking",
  "rating": 5
}
```

### 2. Review by productID

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/colors/651023b879157d8111c2b0c5
```

### 3. All reviews

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/reviews
```

### 4. Delete review by ID

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/{{version}}/reviews/65119d6b339cc1ebda88ab74/delete
```

### 5. Update Review by ID

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{url}}/{{version}}/colors/651023b879157d8111c2b0c5
```

**_Body:_**

```js
{
    "name":"blue"
}
```

## Orders

### 1. Create Order

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/{{version}}/orders
```

**_Query params:_**

| Key    | Value  | Description |
| ------ | ------ | ----------- |
| coupon | DIWALI |             |

**_Body:_**

```js
{
  "orderItems":[
    {
      "_id":"6516b7cc1126d55f725ce5c3",
      "name":"Jeans",
      "description":"best for parties",
      "totalQty": 100,
      "quantity": 1,
      "price": 1100
    }
    ],
    "totalPrice":2200
}
```

### 2. All order for specific user

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/orders
```

### 3. Order Status

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/orders/sales/status
```

### 4. Delete Order by ID

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/{{version}}/orders/651323edb63e134a636f2841/delete
```

### 5. Single order by OrderID

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/orders/6516c08f5ca619b5d6c270bf
```

### 6. Update order by OrderID

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{url}}/{{version}}/orders/update/6516c08f5ca619b5d6c270bf
```

**_Body:_**

```js
{
  "status":"processing"
}
```

## Coupons

### 1. Create Coupons

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/{{version}}/coupons
```

**_Body:_**

```js
{
  "code":"DIWALI",
  "discount": 50,
  "startDate":"09-30-2023",
  "endDate":"10-29-2023"
}
```

### 2. All Coupons

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/coupons
```

### 3. Single coupon by couponID

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/{{version}}/coupons/65171318b90e6d7d8403068b
```

### 4. Update Coupon

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{url}}/{{version}}/coupons/update/65171318b90e6d7d8403068b
```

**_Body:_**

```js
{
  "code":"NEW-YEAR"
}
```

### 5. Delete Coupon by ID

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/{{version}}/coupons/delete/65171318b90e6d7d8403068b
```

---

[Back to top](#nodejs-ecommerce-api)
