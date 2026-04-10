# Debugging Recap: Database Population Script

## Issues Encountered and Resolutions

### 1. `.env` File Not Loaded
- **Problem**: The `MONGODB_URI` environment variable was `undefined` because the `.env` file was not being loaded.
- **Cause**: The `.env` file was initially located in the wrong directory.
- **Solution**: Moved the `.env` file to the root directory of the project (`C:\SchoolAssignments\Week2\BillBloom`).

### 2. Script Looking for `.env` in the Wrong Directory
- **Problem**: The script was searching for the `.env` file in the `scripts` folder instead of the root directory.
- **Cause**: The working directory was set to `scripts` when running the script.
- **Solution**: Ensured the script was run from the root directory (`C:\SchoolAssignments\Week2\BillBloom`) or used the correct relative path.

### 3. Deprecated Mongoose Options
- **Problem**: The `useNewUrlParser` and `useUnifiedTopology` options caused warnings because they are no longer supported in the current version of Mongoose.
- **Cause**: These options were included in the `mongoose.connect()` call.
- **Solution**: Removed the deprecated options from the `mongoose.connect()` call.

### 4. Debugging Steps
- Added debug statements to log the value of `MONGODB_URI` and the result of `dotenv.config()` to verify the `.env` file was being loaded correctly.

### 5. Missing `createdBy` Field in Group Schema
- **Problem**: The `Group` model validation failed because the `createdBy` field was missing.
- **Cause**: The `createdBy` field is required in the `Group` schema but was not included in the sample data.
- **Solution**: Updated the `seed.js` file to include the `createdBy` field, referencing the `_id` of one of the users.

### 6. Missing `type` and `category` Fields in Expense Schema
- **Problem**: The `Expense` model validation failed because the `type` and `category` fields were missing.
- **Cause**: The `type` and `category` fields are required in the `Expense` schema but were not included in the sample data.
- **Solution**: Updated the `seed.js` file to include the `type` and `category` fields for both group and personal expenses. The `type` field was set to `'group'` or `'personal'`, and appropriate categories (e.g., `'food'`, `'groceries'`, etc.) were added.

### 7. Incorrect Usage of `ObjectId`
- **Problem**: The `ObjectId` constructor was being used incorrectly, causing the error `Class constructor ObjectId cannot be invoked without 'new'`.
- **Cause**: The `_id` field retrieved from the database was already an `ObjectId`, but the code attempted to wrap it again with `new mongoose.Types.ObjectId()`.
- **Solution**: Removed the unnecessary wrapping and logged the `_id` directly using `.toString()`.

### 8. Placeholder `EXPENSE_ID_HERE` Causing Cast Error
- **Problem**: The placeholder `"EXPENSE_ID_HERE"` in the query for finding participants of a given expense caused a cast error.
- **Cause**: The placeholder was not replaced with a valid `ObjectId`.
- **Solution**: Added a query to fetch a valid expense ID from the database and used it in the query for finding participants of a given expense.

## Final Outcome
- The database population script (`populate_db.js`) now runs successfully without errors or warnings.
- The database is populated as expected.
- The `queries.js` script now runs successfully, and all queries execute without errors.
- Example user and group IDs are logged, and the queries return the expected results.

## Lessons Learned
- Always verify the location of the `.env` file and ensure it matches the working directory.
- Use debug statements to identify issues with environment variable loading.
- Keep dependencies up-to-date and remove deprecated options to avoid warnings.

---

**Date**: April 6, 2026