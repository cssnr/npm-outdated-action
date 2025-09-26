[![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/npm-outdated-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/npm-outdated-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/npm-outdated-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/npm-outdated-action/releases)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/npm-outdated-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/npm-outdated-action/releases/latest)
[![GitHub Dist Size](https://img.shields.io/github/size/cssnr/npm-outdated-action/dist%2Findex.js?logo=bookstack&logoColor=white&label=dist%20size)](https://github.com/cssnr/npm-outdated-action/blob/master/src)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/npm-outdated-action/release.yaml?logo=cachet&label=release)](https://github.com/cssnr/npm-outdated-action/actions/workflows/release.yaml)
[![Workflow Test](https://img.shields.io/github/actions/workflow/status/cssnr/npm-outdated-action/test.yaml?logo=cachet&label=test)](https://github.com/cssnr/npm-outdated-action/actions/workflows/test.yaml)
[![Workflow lint](https://img.shields.io/github/actions/workflow/status/cssnr/npm-outdated-action/lint.yaml?logo=cachet&label=lint)](https://github.com/cssnr/npm-outdated-action/actions/workflows/lint.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_npm-outdated-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cssnr_npm-outdated-action)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/npm-outdated-action?logo=github&label=updated)](https://github.com/cssnr/npm-outdated-action/pulse)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/cssnr/npm-outdated-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/cssnr/npm-outdated-action)
[![GitHub Contributors](https://img.shields.io/github/contributors/cssnr/npm-outdated-action?logo=github)](https://github.com/cssnr/npm-outdated-action/graphs/contributors)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/npm-outdated-action?logo=bookstack&logoColor=white&label=repo%20size)](https://github.com/cssnr/npm-outdated-action?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/npm-outdated-action?logo=htmx)](https://github.com/cssnr/npm-outdated-action)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/npm-outdated-action?style=flat&logo=github)](https://github.com/cssnr/npm-outdated-action/forks)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/npm-outdated-action?logo=github)](https://github.com/cssnr/npm-outdated-action/discussions)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/npm-outdated-action?style=flat&logo=github)](https://github.com/cssnr/npm-outdated-action/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# NPM Outdated Check

- [Inputs](#Inputs)
  - [Permissions](#Permissions)
- [Outputs](#Outputs)
- [Comment Options](#Comment-Options)
- [Comment Examples](#Comment-Examples)
- [Examples](#Examples)
- [Tags](#Tags)
- [Features](#Features)
  - [Planned](#Planned)
- [Support](#Support)
- [Contributing](#Contributing)

Action to report `npm outdated` packages on a pull request and add a [customizable comment](#Comment-Options),
also includes output of `npm-check-updates` and `npm update --dry-run`.

This action will comment on a PR if packages are outdated. As packages are updated, the comment is updated.
No comment is added on pulls when everything is up-to-date to reduce spam.

You can customize the heading, column visibility, column order, and reporting on wanted or latest.
Check out the [Comment Examples](#Comment-Examples) to see more.

> [!NOTE]  
> This action is under active development.  
> Please [request any features](https://github.com/cssnr/npm-outdated-action/discussions/categories/feature-requests)
> you would like to see and [report any issues](https://github.com/cssnr/npm-outdated-action/issues) you find.

## Inputs

| Input   | Req. | Default&nbsp;Value       | Input&nbsp;Description                                  |
| :------ | :--: | :----------------------- | :------------------------------------------------------ |
| columns |  -   | `n,c,w,l`                | Customize Table Columns [⤵️](#Comment-Options)          |
| latest  |  -   | `true`                   | Report if Latest > Wanted [⤵️](#Comment-Options)        |
| heading |  -   | `### NPM Outdated Check` | Comment Heading [⤵️](#Comment-Options)                  |
| open    |  -   | `true`                   | Details Open by Default [⤵️](#Comment-Options)          |
| ncu     |  -   | `true`                   | Show npm-check-updates Output [⤵️](#Comment-Options)    |
| update  |  -   | `true`                   | Show npm update --dry-run Output [⤵️](#Comment-Options) |
| link    |  -   | `true`                   | Use Hyperlink for Names [⤵️](#Comment-Options)          |
| exclude |  -   | -                        | CSV of Package Names to Exclude [⤵️](#Comment-Options)  |
| fail    |  -   | `false`                  | Fail Job if Updates are Found [⤵️](#Comment-Options)    |
| summary |  -   | `true`                   | Add Workflow Job Summary \*                             |
| token   |  -   | `github.token`           | For use with a PAT                                      |

**summary:** Will add result details to the job summary on the workflow run.

<details><summary>👀 View Example Job Summary</summary>

---

PR Comment: [#4](https://github.com/cssnr/npm-outdated-action/pull/4#issuecomment-2742441847)

_PR Comment will Appear Here_

<details><summary>Config</summary><pre lang="yaml"><code>columns: ["n","c","w","l"]
latest: true
heading: "### NPM Outdated Check"
open: true
ncu: true
update: true
link: true
summary: true</code></pre>
</details>

---

</details>

At a minimum, you need to checkout the repository. The workspace should also be somewhat "clean".
The action will run a npm clean-install `npm ci`. If this fails it will report the errors and skip the checks.

```yaml
- name: 'Checkout'
  uses: actions/checkout@v4

- name: 'NPM Outdated Check'
  uses: cssnr/npm-outdated-action@master
  continue-on-error: true
```

Note: `continue-on-error: true` is used to prevent the workflow from failing if the action fails.

If you want the job to fail, remove `continue-on-error` and set `fail: true`.

See the [Comment Options](#Comment-Options) for more details on inputs.

You can also view more [Examples](#Examples) below.

### Permissions

This action requires the following permissions to add pull request comments:

```yaml
permissions:
  pull-requests: write
```

Permissions documentation for [Workflows](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/controlling-permissions-for-github_token) and [Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication).

## Outputs

| Output   | Empty | Output&nbsp;Description   |
| :------- | :---: | :------------------------ |
| outdated | `{}`  | Outdated JSON Object      |
| ncu      |  ` `  | NPM Check Updates Output  |
| update   |  ` `  | NPM Update Dry Run Output |
| markdown |   -   | Results Markdown Output   |

This outputs the `outdated` JSON object string, `ncu` output, `npm update` output, and the `markdown` results.

```yaml
- name: 'NPM Outdated Check'
  id: outdated
  uses: cssnr/npm-outdated-action@master

- name: 'Echo Output'
  env:
    OUTDATED: ${{ steps.outdated.outputs.outdated }}
    NCU: ${{ steps.outdated.outputs.ncu }}
    UPDATE: ${{ steps.outdated.outputs.update }}
    MARKDOWN: ${{ steps.outdated.outputs.markdown }}
  run: |
    echo "outdated: '${{ env.OUTDATED }}'"
    echo "ncu: '${{ env.NCU }}'"
    echo "update: '${{ env.UPDATE }}'"
    echo "markdown: '${{ env.MARKDOWN }}'"
```

Note: due to the way `${{}}` expressions are evaluated, multi-line output gets executed in a run block.

<details><summary>JSON Schema</summary>

```json
{
  "@package/name": {
    "current": "1.0.0",
    "wanted": "1.0.1",
    "latest": "2.0.0",
    "dependent": "npm-outdated-action",
    "location": "node_modules/name"
  }
}
```

</details>

> More Output Examples Coming Soon...

## Comment Options

**latest:** To disable reporting of latest and ONLY show wanted, set this to `false`.

**heading:** You can customize the `heading` or set to an empty string to remove it.

**open:** Set to `false` for sections to be closed (collapsed/not open) by default.

**ncu:** Set this to `false` to disable reporting the output of `npx npm-check-updates`.

**update:** Set this to `false` to disable reporting the output of `npm update --dry-run`.

**link:** Set this to `false` to use plain text for package names instead of hyperlinks.

**exclude:** Packages to ignore/omit when running checks; example `@eslint/js,tsparticles`.

**fail:** Set this to `true` to fail if updates are found to enforce this through status checks.

**columns:** Customize column visibility and order.  
This must be a perfectly formatted CSV with any combination of these keys:

Default value: `n,c,w,l`

| Key | Column       | Description       |
| :-: | :----------- | :---------------- |
| `n` | Package Name | Name of Package   |
| `c` | Current      | Current Version   |
| `w` | Wanted       | Wanted Version    |
| `l` | Latest       | Latest Version    |
| `d` | Dependent    | Dependent Package |
| `p` | Location     | Path of Package   |

<details><summary>👀 View the Column Map</summary>

```javascript
const maps = {
  n: { align: 'l', col: 'Package&nbsp;Name' },
  c: { align: 'c', col: 'Current' },
  w: { align: 'c', col: 'Wanted' },
  l: { align: 'c', col: 'Latest' },
  d: { align: 'l', col: 'Dependent' },
  p: { align: 'l', col: 'Location' },
}
```

</details>

## Comment Examples

_Note: the examples are generated with no heading and default options._

<details open><summary>🔷 Full Example Closed</summary>

---

<!-- npm-outdated-action 68d31bb9e0cb9283e3c6302dd252b976db6b179aa691a498a147f5de79fac6ec -->

<details><summary>npm outdated</summary>

| Package&nbsp;Name                            | Current | Wanted | Latest |
| :------------------------------------------- | :-----: | :----: | :----: |
| [axios](https://www.npmjs.com/package/axios) |  1.8.3  | 1.8.4  |   -    |

</details>
<details><summary>npm-check-updates</summary>

```text
 @eslint/js  ^9.20.0  →  ^9.22.0
 axios        ^1.8.3  →   ^1.8.4
```

</details>
<details><summary>npm update --dry-run</summary>

```text
change undici 5.28.5 => 5.29.0
change axios 1.8.3 => 1.8.4
change @pkgr/core 0.1.1 => 0.1.2
change @octokit/types 13.8.0 => 13.10.0
change @octokit/openapi-types 23.0.1 => 24.2.0
change @octokit/core 5.2.0 => 5.2.1

changed 6 packages in 4s

32 packages are looking for funding
  run `npm fund` for details
```

</details>

---

</details>
<details><summary>🔷 Full Example Open</summary>

---

<!-- npm-outdated-action 68d31bb9e0cb9283e3c6302dd252b976db6b179aa691a498a147f5de79fac6ec -->

<details open><summary>npm outdated</summary>

| Package&nbsp;Name                            | Current | Wanted | Latest |
| :------------------------------------------- | :-----: | :----: | :----: |
| [axios](https://www.npmjs.com/package/axios) |  1.8.3  | 1.8.4  |   -    |

</details>
<details open><summary>npm-check-updates</summary>

```text
 @eslint/js  ^9.20.0  →  ^9.22.0
 axios        ^1.8.3  →   ^1.8.4
```

</details>
<details open><summary>npm update --dry-run</summary>

```text
change undici 5.28.5 => 5.29.0
change axios 1.8.3 => 1.8.4
change @pkgr/core 0.1.1 => 0.1.2
change @octokit/types 13.8.0 => 13.10.0
change @octokit/openapi-types 23.0.1 => 24.2.0
change @octokit/core 5.2.0 => 5.2.1

changed 6 packages in 4s

32 packages are looking for funding
  run `npm fund` for details
```

</details>

---

</details>
<details><summary>🔷 Only One Outdated Package</summary>

---

<details open><summary>npm outdated</summary>

| Package&nbsp;Name                                                    | Current | Wanted  | Latest |
| :------------------------------------------------------------------- | :-----: | :-----: | :----: |
| [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) | 17.1.15 | 17.1.16 |   -    |

</details>

<details open><summary>npm-check-updates</summary>

```text
 npm-check-updates  ^17.1.15  →  ^17.1.16
```

</details>

<details open><summary>npm update --dry-run</summary>

```text
change npm-check-updates 17.1.15 => 17.1.16

changed 1 package
```

</details>

---

</details>
<details><summary>🔷 After Everything Updated</summary>

---

✅ All packages are up-to-date.

---

Note: this only appears if a previous comment is edited and does not show up on a new PR with no outdated packages.

</details>

> More Comment Examples Coming Soon...

## Examples

💡 _Click on an example heading to expand or collapse the example._

<details open><summary>Custom Heading</summary>

```yaml
- name: 'Package Changelog Action'
  uses: cssnr/npm-outdated-action@master
  continue-on-error: true
  with:
    heading: '**NPM Changelog**'
```

</details>
<details><summary>Remove Heading</summary>

```yaml
- name: 'Package Changelog Action'
  uses: cssnr/npm-outdated-action@master
  continue-on-error: true
  with:
    heading: ''
```

This puts latest before current and adds dependent.

</details>
<details><summary>Fail Status Check if Outdated</summary>

```yaml
- name: 'Package Changelog Action'
  uses: cssnr/npm-outdated-action@master
  with:
    fail: true
```

</details>
<details open><summary>Custom Column Order</summary>

```yaml
- name: 'Package Changelog Action'
  uses: cssnr/npm-outdated-action@master
  continue-on-error: true
  with:
    columns: 'n,l,c,w,d'
```

This puts latest before current and adds dependent.

</details>
<details><summary>Disable NCU Check</summary>

```yaml
- name: 'Package Changelog Action'
  uses: cssnr/npm-outdated-action@master
  continue-on-error: true
  with:
    ncu: false
```

This puts latest before current and adds dependent.

</details>
<details><summary>Disable Update Check</summary>

```yaml
- name: 'Package Changelog Action'
  uses: cssnr/npm-outdated-action@master
  continue-on-error: true
  with:
    update: false
```

This puts latest before current and adds dependent.

</details>
<details><summary>Full Workflow Example</summary>

If you don't have a pull_request workflow already you can use this one.  
Simply create a file called `pull.yaml` in the `.github/workflows` directory: `.github/workflows/pull.yaml`  
Then add the below content to the file, save, commit, and create a PR...

```yaml
name: 'Pull'

on:
  pull_request:

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  pull:
    name: 'Pull'
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      pull-requests: write

    steps:
      - name: 'Checkout'
        uses: actions/checkout@v4

      - name: 'NPM Outdated Check'
        uses: cssnr/npm-outdated-action@master
```

</details>

> More Examples Coming Soon...

## Tags

The following rolling [tags](https://github.com/cssnr/npm-outdated-action/tags) are maintained.

| Version&nbsp;Tag                                                                                                                                                                                                       | Rolling | Bugs | Feat. |   Name    |  Target  | Example  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :-------: | :------: | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/npm-outdated-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/cssnr/npm-outdated-action/releases/latest) |   ✅    |  ✅  |  ✅   | **Major** | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/npm-outdated-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/cssnr/npm-outdated-action/releases/latest) |   ✅    |  ✅  |  ❌   | **Minor** | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/cssnr/npm-outdated-action?style=for-the-badge&label=%20&color=red)](https://github.com/cssnr/npm-outdated-action/releases/latest)                           |   ❌    |  ❌  |  ❌   | **Micro** | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/cssnr/npm-outdated-action/releases) page.

The **Major** tag is recommended. It is the most up-to-date and always backwards compatible.
Breaking changes would result in a **Major** version bump. At a minimum you should use a **Minor** tag.

## Features

- Automatically report npm outdated packages on a PR and add a comment.
- Report wanted and latest with option to only report wanted.
- Option to exclude packages by name from being reported.
- Option to customize columns visibility and columns order.
- Option to display results expanded or collapsed.
- Option to display `npx npm-check-updates` output.
- Option to display `npm update --dry-run` output.
- Outputs outdated, ncu, update, and markdown results.

### Planned

- Custom Column Alignment
- Custom Column Titles
- Custom Section Text

Want to show package changes on release notes? Check out: [cssnr/package-changelog-action](https://github.com/cssnr/package-changelog-action?tab=readme-ov-file#readme)  
Want to automatically updated tags on release? Check out: [cssnr/update-version-tags-action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)

If you would like to see a new feature, please [submit a feature request](https://github.com/cssnr/npm-outdated-action/discussions/categories/feature-requests).

# Support

For general help or to request a feature, see:

- Q&A Discussion: https://github.com/cssnr/npm-outdated-action/discussions/categories/q-a
- Request a Feature: https://github.com/cssnr/npm-outdated-action/discussions/categories/feature-requests

If you are experiencing an issue/bug or getting unexpected results, you can:

- Report an Issue: https://github.com/cssnr/npm-outdated-action/issues
- Chat with us on Discord: https://discord.gg/wXy6m2X8wY
- Provide General Feedback: [https://cssnr.github.io/feedback/](https://cssnr.github.io/feedback/?app=Update%20Release%20Notes)

For more information, see the CSSNR [SUPPORT.md](https://github.com/cssnr/.github/blob/master/.github/SUPPORT.md#support).

# Contributing

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

If you would like to submit a PR, please review the [CONTRIBUTING.md](#contributing-ov-file).

Additionally, you can support other GitHub Actions I have published:

- [Stack Deploy Action](https://github.com/cssnr/stack-deploy-action?tab=readme-ov-file#readme)
- [Portainer Stack Deploy](https://github.com/cssnr/portainer-stack-deploy-action?tab=readme-ov-file#readme)
- [VirusTotal Action](https://github.com/cssnr/virustotal-action?tab=readme-ov-file#readme)
- [Mirror Repository Action](https://github.com/cssnr/mirror-repository-action?tab=readme-ov-file#readme)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action?tab=readme-ov-file#readme)
- [Cloudflare Purge Cache Action](https://github.com/cssnr/cloudflare-purge-cache-action?tab=readme-ov-file#readme)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action?tab=readme-ov-file#readme)
- [Docker Tags Action](https://github.com/cssnr/docker-tags-action?tab=readme-ov-file#readme)
- [Package Changelog Action](https://github.com/cssnr/package-changelog-action?tab=readme-ov-file#readme)
- [NPM Outdated Check Action](https://github.com/cssnr/npm-outdated-action?tab=readme-ov-file#readme)
- [Label Creator Action](https://github.com/cssnr/label-creator-action?tab=readme-ov-file#readme)
- [Algolia Crawler Action](https://github.com/cssnr/algolia-crawler-action?tab=readme-ov-file#readme)
- [Upload Release Action](https://github.com/cssnr/upload-release-action?tab=readme-ov-file#readme)
- [Check Build Action](https://github.com/cssnr/check-build-action?tab=readme-ov-file#readme)
- [Web Request Action](https://github.com/cssnr/web-request-action?tab=readme-ov-file#readme)

<details><summary>❔ Unpublished Actions</summary>

These actions are not published on the Marketplace, but may be useful.

Generic Actions:

- [cssnr/draft-release-action](https://github.com/cssnr/draft-release-action) - Keep a draft release ready to publish.
- [cssnr/env-json-action](https://github.com/cssnr/env-json-action) - Convert env file to json or vice versa.
- [cssnr/get-commit-action](https://github.com/cssnr/get-commit-action) - Get the current commit with full details.

Specific Actions:

- [cssnr/push-artifacts-action](https://github.com/cssnr/push-artifacts-action) - Sync's artifacts to a remote host.
- [smashedr/update-release-notes-action](https://github.com/smashedr/update-release-notes-action) - Update release notes.

---

</details>

<details><summary>📝 Template Actions</summary>

These are basic action templates that I use for creating new actions.

- [js-test-action](https://github.com/smashedr/js-test-action?tab=readme-ov-file#readme) - JavaScript
- [py-test-action](https://github.com/smashedr/py-test-action?tab=readme-ov-file#readme) - Python
- [ts-test-action](https://github.com/smashedr/ts-test-action?tab=readme-ov-file#readme) - TypeScript
- [docker-test-action](https://github.com/smashedr/docker-test-action?tab=readme-ov-file#readme) - Docker Image

Note: The `docker-test-action` builds, runs and pushes images to [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

---

</details>

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)
