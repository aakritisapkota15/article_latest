# API Documentation

Name: Aakriti Sapktoa
Email: asapktoa15@myseneca.ca
StudentId: 151094232

## Base URL

The base URL of the API is dynamically set using the server's environment:

- https://article-latest.vercel.app/

My live endpoints:
https://article-latest.vercel.app/articlespage

https://article-latest.vercel.app/articles?category=AI

https://article-latest.vercel.app/articles?minDate=2024-11-17

https://article-latest.vercel.app/article/1

https://article-latest.vercel.app/articles

---

## Endpoints

### **GET** `/articles`

- **Description**: Fetches all published articles.
- **Query Parameters**:
  - `category` (optional): Filter articles by category.
  - `minDate` (optional): Fetch articles published after the specified date.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Sample Article",
      "category": "Tech",
      "publishDate": "2024-10-14"
    }
  ]
  ```

Here’s a concise README.md focused solely on the API:

markdown
Copy code

# API Documentation

## Base URL

The base URL of the API is dynamically set using the server's environment:

- Example: `https://your-deployed-app.vercel.app`

---

## Endpoints

### **GET** `/articles`

- **Description**: Fetches all published articles.
- **Query Parameters**:
  - `category` (optional): Filter articles by category.
  - `minDate` (optional): Fetch articles published after the specified date.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Sample Article",
      "category": "Tech",
      "publishDate": "2024-10-14"
    }
  ]
  ```

GET /article/:id
Description: Fetches a single article by its ID.
Path Parameter:
id (required): The ID of the article.

{
"id": 1,
"title": "Sample Article",
"content": "This is the article content.",
"category": "Tech",
"publishDate": "2024-10-14"
}

POST /articles/add
Description: Adds a new article.
Request Body (Form Data):
title (required): The title of the article.
content (required): The content of the article.
category (required): The category of the article.
featureImage (optional): The image file to upload.
Response: Redirects to /articles on success

{ "message": "Article added successfully" }
