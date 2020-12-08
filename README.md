## Requirements

### Simple contact application

#### Data model

One contact belongs to an account, and one account can have many contacts. Each account has the following fields:
- Account name
- Physical address (or billing address)
- Industry (Agriculture, Apparel, Banking, Biotechnology, Chemicals, Communications, Consulting,
Education, Electronics, Energy, Entertainment, Environmental, Finance, Food & Beverage, Government, Healthcare, Insurance, Manufacturing, Media, Recreation, Retail, Shipping, Technology, Telecommunications, Transportation, Utilities, and Other)
- Annual revenue
- Rating (Hot, Warm, or Cold)
- Established date

Each contact has the following fields:
- Name
- Phone
- Email
- Lead source (Web, Phone, Partner Referral, Purchased List, and Other)

#### Initial UI

There is a table view of all the accounts. Each row in this table is an account record, which can be expanded to display all the contacts who belong to this account. It is possible that an account does not have any contacts yet.
Features
Note: There is no more UI suggestion on how to manage accounts and their contacts. It is completely up to you.
Users should be able to
- create a new account
- update and delete existing accounts
- add new contacts to an existing account
- update and delete contacts from an existing account
Users should be able to filter the account table by
- Account name (substring match)
- Physical address (in certain state)
- Industry (exact match)
- Annual revenue (range match with minimum and maximum revenue)
- Rating (exact match)
- Established date (date range match)
Multiple filters can be combined as &&
Make the UI responsive.
Please implement a professional user interface that will be used by real customers. Please follow the UI design principles and pay attention to details.
Implementation
Please develop the front-end using either ReactJS or Vanilla JS. You can choose any technology and programming language for the backend development.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

