# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Serverless](https://serverless.com/) as a serverless framework
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.

### `client:deploy`, `client:deploy:nc`

Deploy the project build from `dist` folder to configured in `serverless.yml` AWS S3 bucket with or without confirmation.

### `client:build:deploy`, `client:build:deploy:nc`

Combination of `build` and `client:deploy` commands with or without confirmation.

### `cloudfront:setup`

Deploy configured in `serverless.yml` stack via CloudFormation.

### `cloudfront:domainInfo`

Display cloudfront domain information in console.

### `cloudfront:invalidateCache`

Invalidate cloudfront cache.

### `cloudfront:build:deploy`, `cloudfront:build:deploy:nc`

Combination of `client:build:deploy` and `cloudfront:invalidateCache` commands with or without confirmation.

### `cloudfront:update:build:deploy`, `cloudfront:update:build:deploy:nc`

Combination of `cloudfront:setup` and `cloudfront:build:deploy` commands with or without confirmation.

### `serverless:remove`

Remove an entire stack configured in `serverless.yml` via CloudFormation.

Module 2 
Implementation Notes

Manual Deployment to S3
1. Created a public bucket my-first-live-app
2. Properties: Enabled static website hosting, set index.html
3. Object ownership: ACLs enabled
4. ACL: everyone - List
5. Bucket policy - policy generator: S3 bucket policy, Effect: Allow, Principal: *, Actions: GetObject, set ARN/*
6. URL: http://my-first-live-app.s3-website-us-east-1.amazonaws.com
￼
Serving with CloudFront
1. S3 - create bucket - my-second-live-app (private), upload files. Trying to access file within the bucket gives AccessDenied error
2. ClouldFront - distribution. Origin access: origin access control settings.
3. Create new OAC (sign requests). WAF: disabled. Default root object: index.html. Create distribution.
4. S3 bucket policy needs to be updated reminder - copy policy - go to s3 bucket permissions. Paste to bucket policy.
5. URL https://d1yk8xz3gtf71c.cloudfront.net 

Automated deployment
1. Setup serverless.yml for a new bucket my-sls-live-app
2. Removed AccessControl: PublicRead because of the error "Bucket cannot have ACLs set with ObjectOwnership's BucketOwnerEnforced setting”
3. Run cloudfront:setup (sls deploy) to configure
4. Run cloudfront:build:deploy - to build, deploy and invalidate cache 
5. URL https://d1rhxecdyslfzz.cloudfront.net/ 
