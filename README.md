# Hijack Hobbies

## Getting started

To get started, read the following guidelines.

### Dependencies

To install the necessary dependencies, run:

```zsh
yarn install
```

Followed by:

```zsh
yarn build
```

### Run the Starter Template in development mode

```zsh
yarn dev
```

The application is now active at [localhost:3000](http://localhost:3000 'Hijack Hobbies - RC Store').

All necessary dependencies are installed under `node_modules` and any necessary tools can be accessed via npm scripts.

$~$

### Husky & git hooks

This repository makes use of [Husky](https://github.com/typicode/husky) to enforce commit hooks.

The config for both the `pre-commit` and `pre-push` hooks can be found in the `.husky` folder, located in the root of the project.

---

#### Pre-commit

Before allowing a commit, we require a successful result from the TypeScript compiler (`tsc`) and our `lint-staged` script will be run.

This ensures all ESLint and Prettier rules are enforced on the files that are staged to be committed.

The `tsc` command is run separately from the `lint-staged` step because we require the Typescript compiler to sample _all_ files.

This is important to ensure that no deviating types were introduced by the [codegen](./README.md#graphql--code-generation) for example.

---

#### Pre-push

The same two tasks are run for pre-push and for pre-commit.

---

#### Overriding the Husky git hooks

In case of wanting to bypass the `pre-commit` or `pre-push` hooks, pass a `--noVerify` flag to your Git commands.

⚠️ Make sure you only use this if you know why you're using it. ⚠️

$~$

### Contentful API & GraphQL

This project makes use of Contentful's [GraphQL API](https://www.contentful.com/developers/docs/references/graphql/).

API calls made to the Contentful GraphQL endpoint are made through `graphql-request`.

The types are generated from the `.graphql` files located in the `/lib/graphql/` directory:

1. `lib/graphql/[fileName].graphql` is detected by the [codegen](./README.md#graphql--code-generation)
2. `lib/__generated/sdk.ts` is generated
3. Within the generated file, their types and a new `getSdk` function are generated
4. The `getSdk` function can now be imported and used within the `getStaticProps` in the pages files

$~$

### GraphQL & code generation

We use `graphql-codegen` to generate a type-safe API client, utilizing [GraphQLClient](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-graphql-request) as the "client".

The data for the hooks is pre-fetched on the server-side.

---

#### Commands

In order to (re-)generate the GraphQL schema, types and hooks, please use either of the following commands:

- `yarn graphql-codegen:generate` generates a schema, types and code to fetch data from the Contentful APIs
- `yarn graphql-codegen:watch` similar to the `generate` command, but it runs as a watch task which will rerun the steps when changes are made in the `.graphql` files

The first steps of the codegen generate files that contain the GraphQL schema and matching TypeScript types.
They're generated to the `src/lib/__generated` folder and ought to be committed once altered/added to the repository.

Additionally, the codegen watches `.graphql` files in our `src` folder, if it runs successfully it generates a `__generated` folder collocated in the folder where the `.graphql` file was found.

One exception to this rule is the `src/lib/fragments` folder which contains shared GraphQL Fragments that are used in several other queries/fragments.

The TS types for these files are generated in the same location, in a `__generated` folder and like the other files ought to be committed.

---

#### Configuration

The configuration for the codegen can be found in `codegen.ts`, located in the root of the project.

$~$

---

$~$

## Deployment

Deployment occurs using the CI/CD process with Github.

In order to preview your changes, push all local commits to the remote branch and create a merge request.

An open merge request creates a preview environment through the Vercel integration

Successfully merging a pull request will push the new production branch to Vercel before becoming live.

---

## Content preview & live preview

Our Starter Templates are configured to make use of Next.js' [preview mode](https://nextjs.org/docs/advanced-features/preview-mode). To make use of Contentful's Content Preview we requires a few changes to be made in the code, and in Contentful.

### Adjustments in code

1. Set a unique value for `process.env.CONTENTFUL_PREVIEW_SECRET` in your environment variables. This value should be kept secret and only known to the API route and the CMS.
2. Configure the entry preview URLs in Contentful to match the preview API route's URL structure. This can be done in the Contentful web interface under "Settings" for each content type. For more information see: https://www.contentful.com/help/setup-content-preview/#preview-content-in-your-online-environment
3. The preview API route is already written in the app and can be found in `pages/api/preview.js`. This route checks for a valid secret and slug before redirecting to the corresponding page\*.
4. To exit preview mode, use the `clearPreviewData` method and redirect the user back to the index page. This route is already written in the app and can be found in `pages/api/exit-preview.js`.

_\*The `slug` field is optional; When not passed we redirect the page to the root of the domain._

### Adjustments in Contentful

1. Next, you will need to configure your Contentful space to use the correct preview URLs. To do this, go to the "Settings" section of your space, and click on the "Content Preview" tab. From here, you can configure the preview URLs for each of your content models.
2. Edit all content models that need a preview url. We usually expect that to only be the models prefixed with `📄 page -`.
3. Add a new URL with the following format: `https://<your-site>/api/preview?secret=<token>&slug={entry.fields.slug}`. Make sure to replace `<your-site>` with the URL of your Next.js site, and `<token>` with the value of `process.env.CONTENTFUL_PREVIEW_SECRET`. Optionally, a `locale` parameter can be passed.
4. Now, when you view an unpublished entry in Contentful, you should see a "Preview" button that will take you to the preview URL for that entry. Clicking this button should show you a preview of the entry on your Next.js site, using the preview API route that we set up earlier.

### Exiting the Content Preview

Once the preview is enabled, it persists for the [entire session](https://nextjs.org/docs/advanced-features/preview-mode#clear-the-preview-mode-cookies). To exit preview mode, use the `clearPreviewData` method and redirect the user back to the index page. This route is already written in the app and can be found in `pages/api/exit-preview.js`.

For the live preview the basic field tagging for the inspector mode and live updates are already implemented.
For custom components, you can find the instructions at our [guide](https://www.contentful.com/developers/docs/tutorials/general/live-preview/).

$~$

---

$~$

## License

MIT License, see [LICENSE](./LICENSE).

$~$

<!-- FOOTNOTES -->

[^1]: [Next.js docs](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
[^2]: [GraphQL docs](https://graphql.org/learn/)
[^3]: [graphql-codegen](https://www.the-guild.dev/graphql/codegen)
[^4]: [TypeScript](https://www.typescriptlang.org/)
[^note]: [React docs](https://reactjs.org/docs/getting-started.html)
