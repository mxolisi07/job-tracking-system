BEGIN PROJECT

STEP 1: Setup Environment
    - Install React + TypeScript
    - Install React Router
    - Install JSON Server
    - Create db.json file for users and applications

STEP 2: Authentication Pages
    - Create LoginPage
        INPUT: email, password
        VALIDATE against JSON server
        NAVIGATE to HomePage if valid
    - Create SignUpPage
        INPUT: name, email, password
        SAVE new user to JSON server
        NAVIGATE to LoginPage

STEP 3: Landing Page
    - DISPLAY app purpose (track job applications)
    - SHOW buttons: Login, Sign Up
    - SHOW features summary

STEP 4: Navigation
    - Create Topbar component
        LINKS: Home, Applications, Stats, Search bar
    - ROUTES setup with React Router

STEP 5: Applications Management
    - ApplicationsPage
        LOAD applications from JSON server
        DISPLAY list with - Company name
            		- Job title
           		- Date applied
            		- Status (Applied, Interviewed, Rejected)
			- Job duties
        OPTION: Add new application (POST to JSON server)
        OPTION: Click application --> ApplicationDetailsPage
    - ApplicationDetailsPage
        LOAD application by id
        DISPLAY details
        OPTION: Update status (PATCH)
        OPTION: Delete application (DELETE)

STEP 6: Search, Filter, Sort
    - SEARCH by company or role
        UPDATE URL → "/applications?search=keyword"
        FILTER list accordingly
    - FILTER by status (applied, interviewed, rejected)
        UPDATE URL → "/applications?status=value"
        DISPLAY filtered list
    - SORT by date (asc/desc)
        UPDATE URL → "/applications?sort=asc" or "sort=desc"
        DISPLAY sorted list

STEP 7: Stats Page
    - LOAD applications from JSON server
    - CALCULATE totals by status

STEP 8: Logout
    - CLEAR session
    - NAVIGATE back to LoginPage

END PROJECT
