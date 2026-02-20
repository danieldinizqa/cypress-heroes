![Cypress](https://img.shields.io/badge/-cypress-%23E9E9E9?style=for-the-badge&logo=cypress&logoColor=30E3CA)

Cypress Heroes - E2E Testing Automation 
This repository contains an End-to-End (E2E) testing suite developed with Cypress. The project was structured to ensure the resilience of the Cypress Heroes system, covering everything from database cleanup to full character registration with media.

 What does this test do?
The script executes a complete and independent flow:

Authentication: Automatically performs administrative login.

Cleanup: Identifies existing heroes and deletes them to avoid duplication, ensuring the environment starts "fresh".

Bulk Registration: Automates the registration of a full list of heroes, validating:

Photo uploads via Fixtures.

Power selection from dropdowns.

Database persistence.

 Environment Requirements (Important)
For the tests to run, the system ecosystem must be active. Pay attention to the directories:

Frontend (Client): Must be running on port 3000.

Backend (Server): Must be running on port 3001 (usually in a separate repository or folder).

Database: Ensure the database service (e.g., Prisma/SQLite) is active.

🏁 Step-by-Step Execution

1. Clone the Repository
Open the terminal in the folder where you want to save the project:

Bash

git clone https://github.com/danieldinizqa/cypress-heroes.git

2. Open the Correct Folder

⚠️ VERY IMPORTANT: To avoid path errors, open your VS Code or Terminal directly in the automation project's root folder:

Bash

cd cypress-heroes

3. Install Dependencies and Start
Install the necessary libraries:

Bash

npm install

To run the project in development mode (if required):

Bash

npm run dev

4. Run the Tests
With the Client and Server already running in their respective terminals, execute Cypress:

Visual Interface (Recommended):

Bash

npx cypress open

Headless Mode (Fast execution via terminal):

Bash

npx cypress run
 Project Structure
cypress/e2e/: Main test scripts (.cy.js).

cypress/fixtures/: Images and static files for upload testing.

cypress.config.ts/js: Global environment and base URL configurations.

⭐ Developed by Daniel Diniz for his QA Automation portfolio.