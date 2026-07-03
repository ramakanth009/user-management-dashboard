# User Management Dashboard

A fully functional User Management Dashboard built with React. It allows users to view, add, edit, and delete user records from a mock API while providing real-time search, filtering, sorting, and pagination in a clean, responsive interface.

---

## Features

- Fetch and display users from JSONPlaceholder
- Add new users with form validation
- Edit existing user details
- Delete users with confirmation modal
- Instant search across user records
- Filter users by:
  - First Name
  - Last Name
  - Email
  - Department
- Sort any column in ascending or descending order
- Pagination with selectable page sizes:
  - 10
  - 25
  - 50
  - 100
- Responsive design for desktop, tablet, and mobile
- Reusable modal components
- FontAwesome icons for improved UI

---

# Getting Started

## Prerequisites

Before running the project, ensure you have:

- Node.js (v14 or later)
- npm (comes with Node.js)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/user-management-dashboard.git
```

Navigate to the project folder:

```bash
cd user-management-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open your browser and visit:

```
http://localhost:3000
```

---

## Running Tests

Run the test suite using:

```bash
npm test
```

The project includes tests for:

- Validation utilities
- API service functions
- UserContext reducer logic

---

# Project Structure

```
user-management-dashboard/
│
├── public/
│   └── index.html
│
├── src/
│
│   ├── components/
│   │
│   ├── Modal/
│   │   ├── DeleteModal.js
│   │   ├── FilterModal.js
│   │   ├── FormModal.js
│   │   └── index.js
│   │
│   ├── Pagination.js
│   ├── Pagination.css
│   ├── SearchBar.js
│   ├── Toolbar.js
│   ├── UserTable.js
│   └── UserTable.css
│
├── services/
│   └── api.js
│
├── store/
│   └── UserContext.js
│
├── utils/
│   ├── helpers.js
│   └── validators.js
│
├── __tests__/
│   ├── api.test.js
│   ├── validators.test.js
│   └── UserContext.test.js
│
├── App.js
├── App.css
├── Modal.css
├── index.js
│
├── package.json
└── README.md
```

---

# Challenges & Lessons Learned

During development, several implementation challenges were encountered.

## State Synchronization

Managing search, filtering, sorting, and pagination simultaneously required keeping multiple pieces of state synchronized. Using `useEffect` with carefully managed dependency arrays inside `UserContext` ensured the displayed data remained consistent after every update.

## Mock API Limitations

JSONPlaceholder simulates CRUD operations but does not permanently save changes. To provide a realistic experience, local state was updated optimistically after create, update, and delete operations.

## Modal Positioning

Initially, modal components rendered at the bottom of the page instead of appearing as overlays. This was resolved by using:

- `position: fixed`
- Proper `z-index`
- Center alignment with Flexbox

## Form Validation

Displaying validation errors without overwhelming the interface required conditional rendering of error messages and dedicated error styling using a `has-error` class.

---

# Future Improvements

Given additional development time, the following enhancements would be implemented:

- Server-side pagination
- Server-side filtering
- Toast notifications instead of browser alerts
- Integration tests using React Testing Library
- TypeScript support
- Debounced search input
- Dark mode
- Export users as CSV
- User authentication

---

# Deployment

The application can be deployed using:

```bash
npm run build
```

The production build can then be hosted on platforms such as:

- Vercel
- Netlify
- GitHub Pages

Live Demo:

```
https://user-management-dashboard.vercel.app
```

Replace the URL above with your deployed application if different.

---

# License

This project was created as part of a coding assignment and is intended for educational purposes.

---

# Acknowledgements

- JSONPlaceholder for providing the mock REST API
- FontAwesome for icons
- Create React App for project bootstrapping

---

## Built With

- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Context API
- JSONPlaceholder API

---

**Assignment Duration:** Completed within 48 hours.