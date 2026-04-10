# DevAnswers Backend

## Overview
This project is a Node.js backend using MongoDB and Mongoose. It demonstrates schema design, CRUD operations, and advanced queries for a Q&A platform.

## Folder Structure
```
devanswers-backend/
  .env.example
  package.json
  queries.js
  models/
    Answer.js
    Question.js
    User.js
  scripts/
    populate_db.js
    seed-data.js
```

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**
   ```
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Add your MongoDB connection string to `.env`:
     ```
     MONGODB_URI=your_connection_string
     ```

4. **Populate the database**
   ```
   npm run populate
   ```

5. **Run the queries**
   ```
   npm run queries
   ```

## Features
- Mongoose models for User, Question, and Answer
- Database seeding with sample data
- 20 MongoDB/Mongoose queries demonstrating CRUD, aggregation, and advanced filtering

## Notes
- Do not commit your `.env` file.
- All dependencies are listed in `package.json`.
