Please note that this is the Design Link from Figma:
---> https://www.figma.com/design/v6uSspz4fgAsyXY2bXSkXJ/Job-Application-Tracker?m=auto&t=XL9VVmMilzxhV0yj-6



START PROGRAM

Import React
Import React Router (BrowserRouter, Routes, Route, NavLink)

Function App()
  Authentication Flow
    DISPLAY LoginPage
        INPUT email, password
        OPTION "Sign Up" -> go to SignUpPage
        OPTION "Forgot Password" -> reset process
        IF credentials valid
            NAVIGATE to HomePage
        ELSE
            SHOW error message

    DISPLAY SignUpPage
        INPUT name, email, password, confirm password
        VALIDATE inputs
        SAVE new user to storage then
        NAVIGATE to LoginPage

    DISPALY ForgotPasswordPage
        INPUT email
        SEND reset link or instructions

  After Successful Login
    DISPLAY Topbar Navigation
        Links Show
            - Home
            - Applications
            - Stats
	    - Search bar

 Setup Routing
    "/" -> HomePage
    "/applications" -> ApplicationsPage
    "/applications/:id" -> ApplicationDetailsPage
    "/stats" -> StatsPage

End Function

Function HomePage()
    SHOW welcome message
    SHOW summary of applications:
	- Company name
        - Date Applied
        - Status
	- Role 
	- Job Duties

    Function Search()
		INPUT company OR role
        	PDATE URL -> /applications?search=keyword"
        	FILTER list by keyword
        	DISPLAY results
    End Function
    
    Function Filter()
        INPUT job status (Applied, Interviewed, Rejected)
        UPDATE URL  -> /applications?status=value"
        FILTER list by status
        DISPLAY results
    End Function

    Function Sort()
        INPUT sort by date (ascending OR descending)
        UPDATE URL ->/applications?sort=asc" OR "/applications?sort=desc"
        SORT list accordingly
        DISPLAY results
    End Function

End Function

Function ApplicationsPage()
    LOAD applications from storage
    DISPLAY list of applications
        Each item shows:
			- Company name
            		- Job title
           		- Date applied
            		- Status (Applied, Interviewed, Rejected)
			- Job duties
    Allow user to Add new application
        INPUT Company name, Role, Status, Date, Job duties, Company Address, Employement type, Salary range, Company contact details
        SAVE to storage
    Allow user to Click application then
        NAVIGATE to "/applications/:id"

End Function

Function ApplicationDetailsPage(with id parameter)
    LOAD application by id From localStorage
    DISPLAY details:
        	- Role
        	- Company name
		- Company Location
        	- Status
        	- Date Applied
		- Salary range
		- Job Duties
		- Employment type
		- Company Contact details
    Allow user to Update application
    Allow user to Delete application

End Function

Function StatsPage()
    LOAD applications from storage
    CALCULATE totals:
        	- Applied applications
        	- Interviewed applications
        	- Rejected applications
    DISPLAY summary
End Function

Function URL QUERIES()
    IF user visits "/applications?status=Applied"
        FILTER applications Where status = "Applied"
        DISPLAY filtered list

    IF user visits "/applications?search=developer"
        FILTER applications by keyword = developer
        DISPLAY filtered list

    IF user visits "/applications?sort=desc"
        SORT applications by date descending
        DISPLAY sorted list

    ELSE
	SHOW 404 Error page

End Function

Function URL PARAMETERS()
    IF user visits "/applications/123"
        LOAD application with id = 123
        SHOW ApplicationDetailsPage

    Else 
	SHOW 404 Error page
End Function

FINISH PROGRAM
