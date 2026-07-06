# Vehicle Marketplace MVP

## Overview

The goal of this project is to build a modern vehicle marketplace where users can create accounts, publish car and motorcycle listings, browse listings from other users, and manage their own advertisements.

This project is intended to showcase a complete Full Stack architecture, including a modern React frontend, an Elysia backend, AWS infrastructure provisioned with Terraform, and CI/CD automation.

The application should be designed from day one to be scalable and easy to evolve into a Progressive Web App (PWA).

---

# Tech Stack

## Frontend

* React
* Vite
* TypeScript
* React Router
* TanStack Query
* Zustand
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zod

### Future

* vite-plugin-pwa
* Recharts
* Sonner
* Framer Motion

---

## Backend

* Elysia
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Swagger / OpenAPI
* Zod Validation
* S3 File Upload

### Future

* Redis
* BullMQ
* OpenTelemetry
* WebSockets

---

## Infrastructure

AWS

* ECS Fargate
* Amazon ECR
* Application Load Balancer
* Amazon RDS PostgreSQL
* Amazon S3
* CloudFront
* Route53
* ACM
* CloudWatch

Infrastructure as Code

* Terraform

---

# Project Goals

The MVP should allow users to:

* Create an account
* Authenticate
* Publish vehicle listings
* Browse listings
* Search and filter vehicles
* Favorite listings
* Manage their own advertisements

The architecture should be production-ready while remaining simple enough for rapid development.

---

# MVP Features

## 1. Authentication

### Features

* User registration
* Login
* Logout
* JWT Authentication
* Refresh Token
* Password recovery

### User Profile

Fields

* Name
* Email
* Password
* Avatar
* City
* State
* Created At

---

## 2. Dashboard

After login the user should see:

* Greeting
* My Listings
* Favorites
* Profile
* Create New Listing button

---

## 3. Create Vehicle Listing

### Vehicle Type

* Car
* Motorcycle

---

### Basic Information

* Brand
* Model
* Version
* Year
* Model Year

---

### Engine Information

For cars

* Fuel
* Horsepower
* Transmission

For motorcycles

* Engine displacement (CC)

---

### Vehicle Information

* Mileage
* Color
* Doors (cars)
* Plate ending
* Single owner
* Accept trade
* IPVA paid

---

### Pricing

* Price
* Negotiable

---

### Location

* State
* City

---

### Description

Rich text / Markdown support

---

### Images

* Upload up to 10 photos
* Image ordering
* Cover image

---

## 4. Home Page

Display:

Search bar

Featured vehicles

Latest listings

Quick filters

* Cars
* Motorcycles

---

## 5. Search & Filters

Users should be able to filter by:

* Brand
* Model
* Category
* City
* State
* Minimum price
* Maximum price
* Year
* Fuel
* Transmission

Sorting

* Newest
* Lowest Price
* Highest Price
* Lowest Mileage

---

## 6. Vehicle Details

Display

Large image gallery

Vehicle specifications

Seller information

Description

Buttons

* Favorite
* Contact Seller

---

## 7. Favorites

Authenticated users can

* Add favorite
* Remove favorite
* List favorites

---

## 8. My Listings

Users can

* View listings
* Edit listing
* Delete listing

Display

* Thumbnail
* Price
* Status
* Views

---

## 9. User Profile

Editable information

* Avatar
* Name
* City
* State

---

## 10. Admin Panel (Simple)

Admin only

Manage

* Users
* Listings

---

# Database Design

## User

Fields

* id
* name
* email
* password
* avatar
* city
* state
* createdAt

---

## Vehicle

Fields

* id
* userId
* category
* brand
* model
* version
* year
* modelYear
* price
* description
* city
* state
* fuel
* transmission
* horsepower
* engineCC
* mileage
* color
* doors
* isNegotiable
* acceptTrade
* views
* createdAt

---

## VehicleImage

Fields

* id
* vehicleId
* url
* order

---

## Favorite

Fields

* userId
* vehicleId

---

# REST API

## Authentication

POST /auth/register

POST /auth/login

POST /auth/refresh

---

## Vehicles

GET /vehicles

GET /vehicles/:id

POST /vehicles

PUT /vehicles/:id

DELETE /vehicles/:id

---

## Favorites

GET /favorites

POST /favorites

DELETE /favorites/:id

---

## Users

GET /me

PUT /me

---

# Infrastructure

Terraform structure

```text
infra/

    environments/
        dev/
        prod/

    modules/
        networking/
        ecs/
        ecr/
        alb/
        rds/
        s3/
        cloudfront/
        iam/
        route53/
        acm/
```

---

# Development Roadmap

## Phase 1 — Project Setup

* Initialize Git repository
* Configure Vite + React + TypeScript
* Install Tailwind
* Configure shadcn/ui
* Configure React Router
* Configure ESLint
* Configure Prettier
* Configure absolute imports
* Configure environment variables

---

## Phase 2 — Backend

* Create Elysia project
* Configure Prisma
* Configure PostgreSQL
* Configure Swagger
* JWT Authentication
* Refresh Tokens
* User CRUD

---

## Phase 3 — Frontend

Develop pages

* Login
* Register
* Dashboard
* Home
* Vehicle Details
* My Listings
* Favorites
* Profile
* Create Listing
* Edit Listing

---

## Phase 4 — Vehicle Management

Implement

* CRUD
* Image upload
* Search
* Filters
* Pagination
* Favorites

---

## Phase 5 — Deployment

Dockerize applications

Create Terraform modules

Deploy

* PostgreSQL
* ECS
* ALB
* CloudFront
* S3

Configure

* Domain
* HTTPS
* CI/CD

---

# Future Improvements

After the MVP is complete, the project can evolve with more advanced features.

### User Experience

* Progressive Web App (PWA)
* Push Notifications
* Dark Mode
* Infinite Scroll

### Marketplace

* Chat between buyer and seller
* Vehicle comparison
* Price history
* Recently viewed vehicles
* Seller ratings
* Saved searches

### Search

* OpenSearch / Elasticsearch
* Full-text search
* Geolocation search
* Radius search

### Integrations

* FIPE API
* Maps integration
* Email notifications
* SMS notifications

### Observability

* OpenTelemetry
* Distributed Tracing
* Metrics
* Logging
* Dashboards

### Backend

* Redis Cache
* BullMQ
* Rate Limiting
* Background Jobs

### DevOps

* GitHub Actions
* Automated Deployments
* Terraform Plan/Apply
* Multi-environment infrastructure
* Secrets Manager

---

# Final Objective

The primary objective of this project is not only to build a vehicle marketplace, but to demonstrate the ability to design, develop, deploy, and maintain a production-grade Full Stack application.

By the end of the project, it should showcase proficiency in:

* Modern React architecture
* Elysia backend development
* REST API design
* Authentication and authorization
* PostgreSQL data modeling
* File uploads with S3
* Infrastructure as Code using Terraform
* AWS cloud architecture
* Docker
* CI/CD pipelines
* Production-ready application design
