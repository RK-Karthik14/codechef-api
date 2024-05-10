
# CodeForces REST API

This is a RESTful API built with Node.js that allows users to retrieve data of other CodeChef users using their handle.
The API uses web scraping techniques with Axios, JSDOM, and Express to fetch and parse the required information.

#### If you like it please star it 🥺

## API Reference
https://codechef-api-one.vercel.app/
#### Get all items

```http
  GET /handle
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `handle` | `string` | **Required**. CodeChef handle of user|


## Authors

- [@RK-Karthik14](https://www.github.com/RK-Karthik14)


## Demo

 https://codechef-api-one.vercel.app/karthik_rk


## Installation

```bash
  git clone https://github.com/RK-Karthik14/codechef-api.git
```

Open the folder

```bash
  npm install
```

Start the server

```bash
  npm start
```

