# Auth Form

A simple, responsive authentication form built with Next.js and TypeScript that demonstrates client-side form handling and API integration.

## Features

- Clean, modern UI for login and signup
- Form validation for email and password
- Simulated API authentication flow
- Error and success state handling
- Responsive design that works on all devices

## Implementation Details

The application features a mock API request that:

- Simulates network delays
- Returns success with user data for valid credentials
- Returns appropriate error messages for invalid inputs

The form switches between login and signup modes, with appropriate UI changes and validation for each mode.

## State Management

The form uses React's useState hooks with an optimized approach:

- Combined form data (email, password, auth mode) in a single state object
- Separate UI states for loading, errors, and success messages

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js
- TypeScript
- CSS for styling
