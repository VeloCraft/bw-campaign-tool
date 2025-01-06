# Bike Worcester Campaign Tool

This project is a web application that allows users to create and share campaigns to improve cycling infrastructure in Worcester. The application is built using [Next.js](https://nextjs.org/), [Firebase](https://firebase.google.com/) and [Radix UI](https://www.radix-ui.com/).

## Getting Started

Install the latest stable version of node.js from [nodejs.org](https://nodejs.org/). This project requires node.js version 23 or higher.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Storybook

This project uses `storybook` to develop and test components in isolation. To run storybook, use the following command:

```bash
npm run storybook
```

## Managing components

### To add a new component

```bash
npm run add-component <ComponentDir>/<ComponentName>
```

This script uses `plop` to generate the following files:

- `components/ComponentDir/ComponentName.tsx`
- `stories/ComponentDir/ComponentName.stories.ts`
  using preset templates found in `plop-templates/`.

### To remove a component

```bash
npm run remove-component <ComponentDir>/<ComponentName>
```

## Developing and testing components

After adding a new component, you can develop it in isolation using `storybook`. Once you are satisfied with the component, `storybook` provides its own testing mechanise to confirm that the component is working as expected.

To test all components, use the following command:

```bash
npm run test-storybook
```

and to test a specific component or components, use one of the following commands:

```bash
npm run test-storybook -t stories/<ComponentDir>/<ComponentName>
npm run test-storybook -t stories/<ComponentDir>/<ComponentName1> -t stories/<ComponentDir2>/<ComponentName2>
npm run test-storybook -t stories/<ComponentDir>/{ComponentName1,ComponentName2}.*
```

## Committing changes

This project uses `husky` to run tests before committing changes. If the tests fail, the commit will be aborted. To bypass this, use the `--no-verify` flag when committing changes:

```bash
git commit -m "Commit message" --no-verify
```
