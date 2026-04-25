# Authentication Guide - Rooms Finder

This project uses **Clerk** for authentication.

## How to Login
1. Start the frontend application (`npm run dev` in `client`).
2. Click the **Login** button in the Navbar.
3. You will be redirected to the Clerk sign-in page.

## Sample Login Credentials
Since Clerk is used, you can use any email to sign up. However, for testing purposes, you can use the following "Sample" credentials if you have set up Clerk with a development key:

- **Email:** `test@example.com`
- **Password:** `Test12345!` (Note: Clerk requires a strong password)

> [!IMPORTANT]
> To make authentication work, you MUST set up your own Clerk account and provide the keys in the `.env` files.

## Admin/HomeOwner Access
By default, new users are registered as regular users. To become a **HomeOwner** (to list rooms):
1. Register a user through the UI.
2. Manually change the `role` field to `homeOwner` in your MongoDB `users` collection for that specific user.
3. Alternatively, use the **List Your Home** button which might trigger the role change (depending on implementation).

## Environment Variables Needed
See `.env.example` in both `client` and `server` folders.
- `VITE_CLERK_PUBLISHABLE_KEY`: Found in Clerk Dashboard -> API Keys
- `CLERK_SECRET_KEY`: Found in Clerk Dashboard -> API Keys
- `CLERK_WEBHOOK_SECRET`: Found in Clerk Dashboard -> Webhooks (after setting up a webhook endpoint)
