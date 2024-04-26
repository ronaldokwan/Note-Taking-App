# Project: Note-Taking App

## End-point: Register

### Method: POST

> ```
> {{BaseUrl}}/register
> ```

### Body (**raw**)

```json
{
  "username": "john_doe",
  "email": "ronaldokwan17@gmail.com"
}
```

### Response: 201

```json
{
  "id": 5,
  "username": "john_doe",
  "email": "aa@gmail.com"
}
```

### Response: 400

```json
{
  "message": "Email is required"
}
```

### Response: 400

```json
{
  "message": "Username is required"
}
```

### Response: 400

```json
{
  "message": "Password is required"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login

### Method: POST

> ```
> {{BaseUrl}}/login
> ```

### Body (**raw**)

```json
{
  "email": "user2@example.com",
  "password": "qwerty"
}
```

### Response: 200

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEwNjgxODcyfQ.a4uWFzt8CvAp_JRwu_zlRfseLQ4uCEnrDUrBfS8mtZA"
}
```

### Response: 400

```json
{
  "message": "Email is required"
}
```

### Response: 400

```json
{
  "message": "Password is required"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Google login

### Method: POST

> ```
> {{BaseUrl}}/google-login
> ```

### Body (**raw**)

```json
{
  "google_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5YmNmODAyOGUwNjUzN2Q0ZDNhZTRkODRmNWM1YmFiY2YyYzBmMGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDEyMjQ4NTI4NDc4LWYyam42aWxqYjhkNjJrN3EwMGk3OXY2cGlxcDRrbTFiLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAxMjI0ODUyODQ3OC1mMmpuNmlsamI4ZDYyazdxMDBpNzl2NnBpcXA0a20xYi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMTA4NTkwODgxNTAyMTYwNTUxNSIsImVtYWlsIjoicm9uYWxkb2t3YW4xN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzEwNjgxNzc2LCJuYW1lIjoiUm9uYWxkbyBLd2FuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pud1ViQTl5YVRjYU1XZk1KdjFDc0hqaUIyNk04SFB4R2p2cWtLYnhBST1zOTYtYyIsImdpdmVuX25hbWUiOiJSb25hbGRvIiwiZmFtaWx5X25hbWUiOiJLd2FuIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE3MTA2ODIwNzYsImV4cCI6MTcxMDY4NTY3NiwianRpIjoiMDliMWQwYmYyMDBkNmUwOGFjN2EzMThlODY3Nzg5Njg1ZDIxYjNmOSJ9.AXy4JVKa7VcK4bWrYs4g3k5Yxqxv9OmqUemRnmrBdjGlUSTS2Hxhq_ffEv2k9vjPzAqqeBlVqbOHJqZuqE3vXcPYn9BMvIldPXJ0sazzHYap0EJjb2hmqm9JFfn7o4t0SYpP-dUmhLtQJkqR2PjGIoRVsHJOAcZXjGc_T4aRl6RDAnU01JpobiRKfX_1973DA_brkXmS5bOAMRGM_9ElyebIIghKNUah13XcEjqXLKvB81bfPmdFgMAe3TXLHq7muKvj-SqMjO4msRrnQqjCcvvqQUTvvZ9g_vp5_9mnqA6O87JVRfvGGDlNMvStlPmC3I-_lBZgsg_6jxE7OBIQmg"
}
```

### Response: 200

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzEwNjgyMTQ2fQ.ZkFu61j9khvR0pMXv4K8tMgilGeEJWNhZb32yZniPHs"
}
```

### Response: 500

```json
{
  "message": "Internal server error"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Home

### Method: GET

> ```
> {{BaseUrl}}/
> ```

### Body (**raw**)

```json

```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
[
  {
    "id": 5,
    "title": "Movie Recommendations",
    "content": "A list of movies to watch: [list of movie titles]",
    "tag": "movies",
    "archived": false,
    "userId": 2,
    "createdAt": "2024-03-16T16:23:12.913Z",
    "updatedAt": "2024-03-16T16:23:12.913Z"
  },
  {
    "id": 6,
    "title": "Book Wishlist",
    "content": "Books I'd like to read in the near future: [list of book titles]",
    "tag": "books",
    "archived": false,
    "userId": 2,
    "createdAt": "2024-03-16T16:23:12.913Z",
    "updatedAt": "2024-03-16T16:23:12.913Z"
  },
  {
    "id": 7,
    "title": "Travel Ideas",
    "content": "Researching potential travel destinations for the next vacation. Considering: [list of locations]",
    "tag": "notes",
    "archived": false,
    "userId": 2,
    "createdAt": "2024-03-16T16:23:12.913Z",
    "updatedAt": "2024-03-16T16:27:46.641Z"
  },
  {
    "id": 8,
    "title": "Learning Goals",
    "content": "Setting learning goals for the next month. Aiming to learn more about [list of topics]",
    "tag": "notes",
    "archived": false,
    "userId": 2,
    "createdAt": "2024-03-16T16:23:12.913Z",
    "updatedAt": "2024-03-16T16:27:47.214Z"
  },
  {
    "id": 9,
    "title": "test",
    "content": "test",
    "tag": "test",
    "archived": false,
    "userId": 2,
    "createdAt": "2024-03-16T16:28:18.564Z",
    "updatedAt": "2024-03-16T16:28:18.564Z"
  }
]
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Archived

### Method: GET

> ```
> {{BaseUrl}}/archived
> ```

### Body (**raw**)

```json

```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
[
  {
    "id": 7,
    "title": "Travel Ideas",
    "content": "Researching potential travel destinations for the next vacation. Considering: [list of locations]",
    "tag": "notes",
    "archived": true,
    "userId": 2,
    "createdAt": "2024-03-16T16:23:12.913Z",
    "updatedAt": "2024-03-17T13:30:24.080Z"
  }
]
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add note

### Method: POST

> ```
> {{BaseUrl}}/add-note
> ```

### Body (**raw**)

```json
{
  "title": "test",
  "content": "test content",
  "tag": "test"
}
```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 201

```json
{
  "id": 11,
  "title": "test",
  "content": "test content",
  "tag": "test",
  "userId": 2
}
```

### Response: 400

```json
{
  "message": "Content cannot be null"
}
```

### Response: 400

```json
{
  "message": "Title cannot be null"
}
```

### Response: 400

```json
{
  "message": "Tag cannot be null"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update note

### Method: PUT

> ```
> {{BaseUrl}}/update-note/:id
> ```

### Body (**raw**)

```json
{
  "title": "test",
  "content": "test content",
  "tag": "tests"
}
```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
{
  "message": "Note has been updated"
}
```

### Response: 400

```json
{
  "message": "Tag cannot be null"
}
```

### Response: 400

```json
{
  "message": "Content cannot be null"
}
```

### Response: 400

```json
{
  "message": "Title cannot be null"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 404

```json
{
  "message": "Note not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete note

### Method: DELETE

> ```
> {{BaseUrl}}/delete-note/:id
> ```

### Body (**raw**)

```json

```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
{
  "message": "Note has been deleted"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 404

```json
{
  "message": "Note not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update archived

### Method: PATCH

> ```
> {{BaseUrl}}/update-archived/:id
> ```

### Body (**raw**)

```json
{
  "archived": true
}
```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
{
  "message": "Note has been archived"
}
```

### Response: 200

```json
{
  "message": "Note has been archived"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 404

```json
{
  "message": "Note not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: anime api

### Method: GET

> ```
> {{BaseUrl}}/anime
> ```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
{
  "data": "https://res.cloudinary.com/anyanime/image/upload/marin-marin-kitagawaKurizu58.gif"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: trivia api

### Method: GET

> ```
> {{BaseUrl}}/trivia
> ```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
{
  "text": "the number of basic tastes (sweet, salty, sour, bitter, and umami)",
  "number": 5
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: payment

### Method: GET

> ```
> {{BaseUrl}}/payment
> ```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
{
  "message": "success",
  "transactionToken": "f2dc2dad-a4d0-4bae-b59b-a710c9411d89",
  "orderId": "0.5407507940165155"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: upgrade

### Method: PATCH

> ```
> {{BaseUrl}}/upgrade
> ```

### 🔑 Authentication bearer

| Param | value            | Type   |
| ----- | ---------------- | ------ |
| token | {{access_token}} | string |

### Response: 200

```json
{
  "message": "thx for the donation"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 404

```json
{
  "message": "Order not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
