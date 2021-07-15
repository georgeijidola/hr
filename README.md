# HR Backend API Specifications

An HR application that helps us manage our team using REST.

Architecture adapted from my node_mongoose_express_typescript base [project](https://github.com/georgeijidola/node_mongoose_express_typescript).

## Functional Requirements

- A team member has a name and a type the later one can be a full-time employee or a contractor.
  - If it's a contractor, we want to store the the duration of the contract as an integer.
  - If it's a full-time employee, we need to store their job title, for instance: Software Engineer, Project Manager and so on.
- A team member can be tagged, for instance: NodeJS, Angular, Ruby on Rails, Seasoned Leader and so on. Tags will be used as filters later.
- We need to offer a REST CRUD for all the information above.

## Development

I used `node` version `14.16.0`

The first time, you will need to run

```
npm i
```

To run build

```
npm run build
```

For development run

```
npm run dev
```

For production run

```
npm start
```

For test run, powered jest

```
npm test
```

More scripts in the package file.

## API Documentation

Postman documentation can be found [here](https://documenter.getpostman.com/view/4872797/TzeaimAa).

## Modules

There are three main modules within the scope of this project: auth, user and tag.

### Auth

- Authentication using JWT/cookies was implemented.
  - JWT and cookie should expire in 180 days(3 months).
- User registration
  - Only admin can register "employees" and "contractor"
  - Passwords are hashed with NodeJS core module crypto.
  - Employee and contractor validates email and sets password. They can also request for otp to be resent, especially when it expires.
- User login
  - User can logs in with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent.
- Password reset (lost password)
  - User can request to reset password
  - A hashed token will be emailed to the user's registered email address
  - A put request can be made to the generated url to reset password
  - The token will expire after 10 minutes

### Tag

- CRUD functionalities for Tags.
- Tags cannot be updated.
- Tags can only be soft deleted and only by admin.
- Tags are accessible by any logged in user.

### Title

- CRUD functionalities for Titles.
- Titles cannot be updated.
- Titles can only be soft deleted and only by admin.
- Titles are accessible by any logged in user.

### User

- Get Member
  - Route to get the currently logged in user (via token)
  - Admin can also parse in user id to the url to get other members.
- Update user info
  - Only admin can update members
  - There is a separate route to update password and only by logged in user.
- Members can filtered by tag ids. Not text search or regex text search so as to better performance

## Security

- Jsonwebtoken and crypto - Encrypt passwords and reset tokens
- express-mongo-sanitize - Prevented NoSQL injections
- express-rate-limit - Add a rate limit for requests of 30 requests per 10 minutes
- hpp - Protect against http param pollution, cross site scripting and added other security headers
- cors - Used cors to make API public (for now, later will be implemented with API Keys)
- Token and role based routes, thereby stateless.
- Mongoose model was used for the application and model layer validations.

## Scalability

- Used indexing on collections
- Create a separate model for tags and titles for easy retrievals and avoided regex.
- Used node cluster module to take advantage of all cpu power available. Though thread pool size wasn't increased above the default 4 per process or child process as there is no need for it in this project, not cpu-intensive operation.

## Deployment (Heroku)

Check out [Devcenter](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml#getting-started)

## Areas Of Improvements

1. Multi-role admin system.
2. Limit approved IPs with cors.
3. Track last login and last active.
4. More test scenarios(especially negative), load tests and API check test.
5. Update this documentation.
6. Bulk creation for members.
7. Better structure for units and integrations tests.
8. Simplify scripts.
