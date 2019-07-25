# react-testing

Examples of various approaches and libraries for testing React applications. Written by Zach Schneider for a July 2019 talk at the [Cleveland React meetup](https://www.meetup.com/Cleveland-React/events/263066228).

## Setup

1. Clone the repository: `git clone https://github.com/schneidmaster/react-testing.git`

2. Install dependencies: `yarn install`

3. To run the app locally: start the mock API with `yarn api`; in a separate terminal, start the React app with `yarn start`; and visit [http://localhost:3000](http://localhost:3000) in your browser

4. To run the tests: `yarn test`. To open Cypress for running integration tests: `yarn cy:open`.

## Commit walkthrough

I'm generally walking through the commits in order for the talk -- here's a quick guide.

1. [903a9c4](https://github.com/schneidmaster/react-testing/commit/903a9c455fef2faa8fe43604a60d89015cd54b86) -- implements the app that we'll be testing, a simple todo list
2. [650366e](https://github.com/schneidmaster/react-testing/commit/650366ec069b541accf3d5a79b16f3963140cf17) -- adds Enzyme and a suite of example Enzyme tests
3. [bb6ef0d](https://github.com/schneidmaster/react-testing/commit/bb6ef0dace0b8da2418ae51b210481f5ebf7f78a) -- adds @testing-library/react and a suite of example react-testing-library tests
4. [d0013f4](https://github.com/schneidmaster/react-testing/commit/d0013f4f4d7350fdc9d37c346e050388a5bd0435) -- refactor one of our app components to be functional instead of class-based, to demonstrate a common footgun with testing implementation details
5. [3edcaa3](https://github.com/schneidmaster/react-testing/commit/3edcaa3eca6b16db235f21ce915c0ed28cbee0ed) -- moving forward with react-testing-library. Removes Enzyme and adds react-testing-library tests for our AddTodo form component, to demonstrate more features of react-testing-library
6. [ddd4755](https://github.com/schneidmaster/react-testing/commit/ddd4755152b0d2cc9662b762861a0d0a153cbf8a) -- refactors AddTodo to use React hooks instead of being class-based; note that the tests require no changes :thumbsup:
7. [585f804](https://github.com/schneidmaster/react-testing/commit/585f80428f72ccd07028b53babb1bd5c074e8037) -- adds Cypress and an example end-to-end integration test
