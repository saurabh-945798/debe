# DEBE Learning Tech Intern Assessment

## Part 1 - GitHub Portfolio Walkthrough

### GitHub Profile

GitHub: https://github.com/saurabh-945798

I have selected the following two projects because I built both of them myself and worked on them end-to-end.

---

## 1. Zitheke

Repository: https://github.com/saurabh-945798/Zitheke

### What problem does it solve?

Zitheke is a subscription-based advertising platform where users can create an account and post advertisements for both new and second-hand products.

The main problem it solves is making it easier for users to advertise and sell products without having to build or manage their own e-commerce website. Users can create an account, choose a category and subcategory, publish their advertisements, and manage their listings from their dashboard.

The platform also makes communication between buyers and sellers easier through WhatsApp integration. From the product description page, a buyer can directly connect with the seller through WhatsApp with a single click.

The platform also uses a subscription model with different plans. Users can choose between different plans depending on their advertising requirements and the number or type of advertisements they want to publish.

### What I specifically built

I built the project end-to-end, including the frontend, backend, database integration, and deployment setup.

Some of the main parts I worked on include:

* User account and authentication flow
* User dashboard for managing advertisements and account data
* Advertisement creation and management
* Category and subcategory structure for listings
* Product description and advertisement pages
* Dashboard metrics such as number of posts, advertisements, and sold items
* WhatsApp connectivity between buyers and sellers
* Subscription plans with different pricing and advertising capabilities
* Backend APIs and database integration
* Production deployment and server setup

### Technology used

* React.js
* Tailwind CSS
* Node.js
* MongoDB
* Git and GitHub
* PM2
* Nginx

### One design decision I would make differently today

If I were to build Zitheke again from scratch today, I would focus more on designing it as a production-ready and scalable application from the beginning.

I would spend more time planning the folder structure and separating different parts of the application properly so that the codebase can grow without becoming difficult to maintain.

I would also pay more attention to frontend performance from the early stages. For example, I would use techniques such as lazy loading where appropriate and consider list virtualization for pages with large amounts of advertisement data.

I would also revisit some of the UI choices, especially the typography and color system, to make the overall experience more consistent.

When I originally built the project, my main focus was getting the complete product flow working. With the experience I have gained since then, I would put more emphasis on scalability, maintainability, and performance from day one.

---

## 2. Alinafe Capital

Repository: https://github.com/saurabh-945798/Alinafecapital

### What problem does it solve?

Alinafe Capital is a microfinance loan application platform designed to simplify the loan application process for users.

Instead of requiring users to visit an office and go through a lengthy manual process for a simple loan application, the platform allows them to submit their information through an online form.

The form collects the required loan-related information, allowing the application to be reviewed by the administration team. Once the loan is approved, the user can receive the money through the available payment process or collect the cash directly from the office.

The platform supports different types of loans, including small loans, business loans, and home loans.

### What I specifically built

I built the project end-to-end, including the frontend, backend APIs, database integration, and development/deployment workflow.

Some of the main parts I worked on include:

* Loan application flow
* Online loan application form
* User-facing loan application interface
* Different loan categories
* Backend REST APIs
* Loan-related data handling
* MongoDB database integration
* Admin-side application management flow
* Integration with the payment process
* Development and version-control workflow

### Technology used

* React.js
* Tailwind CSS
* Python
* FastAPI
* MongoDB
* Git and GitHub

### One design decision I would make differently today

If I were to build Alinafe Capital again today, I would plan the application architecture and folder structure more carefully from the beginning, with scalability in mind.

Since the application deals with different loan types and user application data, I would keep the frontend components, API logic, validation, and business logic more clearly separated.

I would also improve frontend performance and UI consistency from the early stages. I would use lazy loading where it makes sense and optimize data-heavy sections so that the application remains responsive as the amount of application data increases.

The main difference in my approach today would be thinking about long-term maintainability from the first day rather than primarily focusing on completing the required product flow.

---

## Part 2 - Debugging Round

### Firebase Cloud Functions + TypeScript

The original Cloud Function had four main issues:

1. **Missing authentication check**
   The function allowed unauthenticated users to create bookings. The fixed version checks `request.auth` before processing the booking.

2. **No runtime validation of client data**
   TypeScript types do not validate data received from the client at runtime. The fixed version checks that the required fields exist, are strings, and are not empty.

3. **Firestore query was not awaited**
   The original code tried to use `.docs` before the Firestore request had finished. The fixed version uses `await` before checking the result.

4. **Booking write was not awaited**
   The original function returned success without waiting for Firestore to save the booking. The fixed version waits for the write to finish before returning success.

Files:

* `Part2/original.ts` - original buggy implementation
* `Part2/fixed.ts` - corrected implementation

---

## Part 3 - Session Reschedule Widget

The Session Reschedule Widget is implemented as a self-contained Next.js feature inside:

`debe-session-widget/`

The widget displays upcoming tutoring sessions and allows a parent to request a reschedule.

### Main features

* Displays the student's upcoming tutoring sessions
* Shows subject, teacher, date/time, and status
* Opens a reschedule form for each session
* Provides a date/time picker
* Provides reschedule reasons such as Conflict, Illness, Time zone, and Other
* Uses TypeScript throughout
* Uses shared types for request and response data
* Includes loading and error states
* Validates that the new slot is not in the past
* Prevents selecting the same slot as the existing session

### Local Time and UTC

The form shows the session time in the parent's local timezone so that the time is easy for the parent to understand.

The selected value is converted to UTC before being sent to the reschedule logic. This keeps the stored value consistent and avoids timezone-related problems when the system is used by users in different locations.

### Two-Hour Lead Time

The reschedule form also prevents selecting a slot that is within two hours of the current time.

This reflects a tutoring lead-time policy and prevents last-minute rescheduling requests. The restriction is handled in the date/time logic rather than only relying on the UI.

---

## Part 4 - Explain-It-Yourself Video

Video walkthrough:

https://www.loom.com/share/48ff78ff2ef541e4a02ac6a83a03daa6

The video will include a live walkthrough of the Part 3 implementation, an explanation of the local-time/UTC decision and the two-hour lead-time rule, followed by a small intentional code break and explanation.
