**

## 1. Introduction

In modern software development, containerization has become a critical practice for deploying and managing applications efficiently. This report provides an in-depth analysis of the containerization and Dockerization of a frontend and backend application for an event booking system. The goal is to ensure seamless deployment, scalability, and consistency across environments.

## 2. Understanding Containerization

### What is Containerization?

Containerization is the process of encapsulating an application and its dependencies into a lightweight, portable, and self-sufficient unit known as a container. This eliminates compatibility issues between different environments.

### Why Use Containers?

* Portability – Runs consistently across different environments (development, testing, production).
* Scalability – Easily scales up or down based on demand.
* Isolation – Each service runs independently in its own container.
* Efficiency – Uses fewer resources compared to virtual machines (VMs).

### Docker as a Containerization Tool

Docker is the most widely used containerization platform that simplifies the deployment process by packaging applications with their dependencies.

## 3. Overview of the Event Booking System Architecture

The event booking system consists of multiple microservices, including:

* Frontend (React-based application)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcdOV8rGj17Xlf-jw94EH4HW-d5fPeAOWathTcdMeFNh_EAKrgdObggDMzCqqag9D6-4QrSMAC5QSp00JEQC0nf00pBwRuLYW0C2H5xzHaPx2af9FoBTHohc2wCaO_F4CD2Hi2KcA?key=VFDUsGXdhd5Y4vkib0eijYZb)

* Backend (Node.js-based microservices)
  * User Service (Handles authentication and user management)
  * Booking Service (Manages event reservations)
  * Event Service (Stores event details)
  * Notification Service (Handles email/SMS notifications)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXeXsputsiC9UVlvyaF5z8Tn3HsuexyM387WH_we2634kmNubUrP1XBZhTehJHvk2HnK-XtVI0iB47WU6OP_sF95AOqpzPkV2jBYR6RPZGUXPA681_LXlmI9aHZzWH0VlJdKglY7?key=VFDUsGXdhd5Y4vkib0eijYZb)

* Databases
  * PostgreSQL (For user and booking services)
  * MongoDB (For event storage)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfntxSRPew9FiLW5w8jRcKya8J0ANKLJxyes9vHVF_FNMQXjhlQCx9S2-vu4dY73KniTsiiCfc7o431wpRSIT2etLe_goAfjiizhNdZu_-bdgdDvhKJ33WXbm1OqmSYEM_srrFh?key=VFDUsGXdhd5Y4vkib0eijYZb)

Each of these services is containerized separately and managed using Docker Compose.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfuzRKsrHn-j4uv-J3tgUjiBcGQccWHlHNN5cAlIYdMfQXWQaAj57NL246unUIDQoBXBttMfBNiL_GUHWxy0Ct3-zyzAgqaBiULzvi3uS-EG-dFqxj1bnA4HoXJAsfu8hkusifWjA?key=VFDUsGXdhd5Y4vkib0eijYZb)

## 4. Backend Dockerization Process

### Step 1: Writing the Dockerfile for Backend Services

Each backend service (User, Booking, Event, and Notification) has its own Dockerfile.
 A sample Dockerfile for the Event Service (Node.js + Express):

# Use an official Node.js image as the base image

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "start"]

### Step 2: Configuring Environment Variables

Each backend service uses a .env file to manage configurations dynamically:

MONGO_URI=mongodb://eventbooking-mongodb-1:27017/event_service

PORT=5002

### Step 3: Defining Backend Services in docker-compose.yml

The docker-compose.yml file is used to orchestrate multiple containers.
![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdKIUUIKiuTk4OxvsQWwCIsXBp8EsY2ztcapqFtZ9GmN_suK5HZGsAGrWVyaIGd3_wPd4uJ4x2PP6N_LRUf7b2NqgHcRd8LqvFTMwHhpFaz0YhO67gNJfsQp7xWf0pJwndQeYGaQA?key=VFDUsGXdhd5Y4vkib0eijYZb)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfyXXxSzo-uG4bZbJDvpDCMoHd6mfkmOZv9z20op7boScXMH9fj7e1L4COeZPEz2FlbHgmUYlFlX5AO--1GsvBZeMMdR2wI0wKUP1MMqR4gn1hvBM9ORwgSZay2sw_pEiqjKDwd?key=VFDUsGXdhd5Y4vkib0eijYZb)

### Step 4: Running the Backend Containers

* To build and start the containers, run: docker-compose up --build -d
* To check logs: docker logs eventbooking-event-service-1

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfDF8aGR76iJCx3oa6qm-LoNjpaQ0aOuZc275g1Kmf7fTxpJYYBLxI6jPrrDwtanpk7VwETbYC1Q0WoA1yjUOGzddBkCx_ZrGzay-Iyy-kZRdD69SvbotJalEmQdgt2aU6Ec8TRYg?key=VFDUsGXdhd5Y4vkib0eijYZb)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdTJsYUhWuNBjxcNYjLF5Cf_RFYo2R_gyXdJdaDE9k3MdVVEvNND1JyXxuEAko7WsKd-aZ2DIMqk62V2w2tQmg2zPXGb9RqFnCf_zgC3SxSNeN898CIlhLDR4X_ENHuxDKGPiRh1Q?key=VFDUsGXdhd5Y4vkib0eijYZb)

## 5. Frontend Dockerization Process

### Step 1: Writing the Dockerfile for the Frontend (React)

The frontend is a React application, which needs to be containerized using the following Dockerfile:

# Use lightweight Node.js Alpine image

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 5173

ENV HOST=0.0.0.0

CMD ["npm", "run", "dev"]

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdvGgHbHu1aVJWJ311ELLEt8xzpqxYDD4d8f_8Z-uobTTp5gYA0uSJxgxvLuuWl-mxUK_R7x9XsJl6w8dCiJlH9hu-003Bvnh5LZ3JDjFNDFzCPhNAt9O1R4XslIq7o7quzohKZQw?key=VFDUsGXdhd5Y4vkib0eijYZb)

### Step 2: Defining the Frontend Service in docker-compose.yml

Adding the frontend service in docker-compose.yml:

 frontend:

    build: ./frontend-service-codebase

    ports:

    - "5173:5173"

    depends_on:

    - user-service

### Step 3: Running the Frontend Container

To build and start:

docker-compose up --build -d frontend

To check if the frontend is running:

docker ps

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXc7XOA-50y2jMV4dV1bsuBRIm0qD7V2RSdnn5U_yOygWEbPsA4SscVsSrE5GVaUZCHYiaBntz6wWY-R9D6qUMfoz7DD3K7AlDQN_c-B0gPDGl--GPoIxvt9D0Tj1SuaJLTRIZ7hqg?key=VFDUsGXdhd5Y4vkib0eijYZb)

Access the frontend via [http://localhost:5173](http://localhost:5173/).

## 6. Database Containerization

### MongoDB (For Event Service)

MongoDB is configured as follows:

 mongodb:

    image: mongo:6.0

    restart: always

    environment:

    MONGO_INITDB_ROOT_USERNAME: root

    MONGO_INITDB_ROOT_PASSWORD: muqi1217

    command: --auth

    ports:

    - "27017:27017"

    volumes:

    - mongo-data:/data/db

### PostgreSQL (For User & Booking Service)

 postgres-db:

    image: postgres:15

    restart: always

    environment:

    POSTGRES_USER: postgres

    POSTGRES_PASSWORD: muqi1217

    POSTGRES_DB: userdb

    ports:

    - "5432:5432"

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcVE79i2wPAB54U3ly-rp2WfXBE8uKOJ3-jNl_In4jR19VEP2n65t9Yo5oz0mrrkgfUx06jXjeftnSmhwEgOiTZrMVHjFBsquczlkkc4LzanNBiGuQO27L5rk1slTuhIJn6eMYVHQ?key=VFDUsGXdhd5Y4vkib0eijYZb)

---

## 7. Testing the API Services

### Using PowerShell (Invoke-RestMethod)

Invoke-RestMethod -Uri "http://localhost:5002/api/events/" -Method Get

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcvRKeQgKpdUUh9rQ8QziWztixLKG8gGMLi9TQBt-MLUfOdjq8duAwZYumaoJiqh3dknj971abFhcrogbGSpW5HiEFcDvi4EarX0uMl-w0760fKvjOKUz9tdeLC9GQD2ZxBm5oPqQ?key=VFDUsGXdhd5Y4vkib0eijYZb)

### Using Postman

* Open Postman
* Send a GET request to: http://localhost:5002/api/events/
* Check if the response contains event data.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXck49umT_fJZsqEFXRQbad9-fAW99cDInEbknD7D74qFk5I5coXMGaOZZ18CG-uedcUKQl_gVq_KjmGWPoiGWvWy-2Y0XDeB9fbB0z5oUNRRPRGUOLKBXNiKE7oS-TM0wgrz6OP?key=VFDUsGXdhd5Y4vkib0eijYZb)

## 8. Docker Desktop

### Running the Containers on Docker

docker-compose up -d --build


### Stopping the Containers on Docker

docker-compose down -v


![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXepzCem_oKORQaZqXcKRGZqcPj89SbqrfSxjq8LhpYQIS1tm7oHOCVR8yp698zbMkJgpRjD2lMz-Z_8VtjHE9IM-LFyL_ZtAWtBtbcIxDRekEzfTsbq_Yb6PmjsHekd_7HCxSKPcw?key=VFDUsGXdhd5Y4vkib0eijYZb)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcHKpVcCsCl4Zy0GR_tnlnzPnWyIUL7ozgqi_Q7iVyP2s-J6uj-YNFY-Xe1eYmPta1nqH09hxZu-YHdpz5C_2pqBhA_0UOgqyHPeoeBNZP31ee9xJDQH6-o5P_ymothr3uqJ4PuAg?key=VFDUsGXdhd5Y4vkib0eijYZb)

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcL2JkTXJ73vZXlxRQWV8FZl-hyVCQD8jYligEiVhXqxt_lkWRzLg52kyS72MBtxR4roE1RtYsn39EgEgPYimD51vHausHZc1aoh2Lw89O6-7_SMEbDKfl8Saf6cCCkvWUOQxJdKg?key=VFDUsGXdhd5Y4vkib0eijYZb)

## 9. Pushing to GitHub

### Step 1: Initialize Git

git init

### Step 2: Add Remote Repository

git remote add origin https://github.com/your-username/eventbooking.git

### Step 3: Add and Commit Files

git add .

git commit -m " Containerized event booking system"

### Step 4: Push to GitHub

git push -u origin main

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfkIRgIQN96OnDBD2kIB0DgB4cDAHxxxeegTc9vjaJSKc7zNThoy1ldYOk5fHAIFMgk1q5uwMgyAheQwFK41gNAMESZilyPqVS4eXtCSMolTstHPLXSlPrWEdB9SqpD6Wk7Kqq_wg?key=VFDUsGXdhd5Y4vkib0eijYZb)

## 9. Conclusion

By containerizing the frontend and backend services, we have:
 ✅ Achieved consistent deployment across environments
 ✅ Simplified scalability using docker-compose
 ✅ Improved efficiency by isolating services
 ✅ Ensured portability for easy deployment on any system

This containerized setup ensures that developers and DevOps teams can deploy and manage the system efficiently, making it future-proof for production environments. 🚀
Sa
**
# 22i-1303DevopsA2
