# PotatoPedia

Welcome to PotatoPedia, a collaborative encyclopedia of potato varieties built entirely with Manifest and React.

## Features

- **User Authentication**: Sign up and log in to contribute.
- **Potato Catalog**: Browse a list of potato varieties.
- **Contribute**: Add new potato varieties with details and an image.
- **Ownership**: Users can only edit or delete their own contributions.
- **Admin Panel**: A complete admin interface at `/admin` for managing all users and potato data.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Running the Frontend

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Accessing the Backend & Admin Panel

- The backend is powered by Manifest and is deployed automatically.
- The Admin Panel is available at `/admin` on your deployed site URL.
- Default admin credentials:
  - **Email**: `admin@manifest.build`
  - **Password**: `admin`

## Demo User

To quickly test the application, use the 'Sign in / Demo' button on the landing page. It uses the following credentials:
  - **Email**: `contributor@manifest.build`
  - **Password**: `password`
