[![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/npm-outdated-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/npm-outdated-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/npm-outdated-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/npm-outdated-action/tags)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/npm-outdated-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/npm-outdated-action/releases/latest)
[![GitHub Dist Size](https://img.shields.io/github/size/cssnr/npm-outdated-action/dist%2Findex.js?label=dist%20size)](https://github.com/cssnr/npm-outdated-action/blob/master/src/index.js)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/npm-outdated-action/release.yaml?logo=github&label=release)](https://github.com/cssnr/npm-outdated-action/actions/workflows/release.yaml)
[![Workflow Test](https://img.shields.io/github/actions/workflow/status/cssnr/npm-outdated-action/test.yaml?logo=github&label=test)](https://github.com/cssnr/npm-outdated-action/actions/workflows/test.yaml)
[![Workflow lint](https://img.shields.io/github/actions/workflow/status/cssnr/npm-outdated-action/lint.yaml?logo=github&label=lint)](https://github.com/cssnr/npm-outdated-action/actions/workflows/lint.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_npm-outdated-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cssnr_npm-outdated-action)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/npm-outdated-action?logo=github&label=updated)](https://github.com/cssnr/npm-outdated-action/graphs/commit-activity)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/cssnr/npm-outdated-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/cssnr/npm-outdated-action)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/npm-outdated-action?logo=htmx)](https://github.com/cssnr/npm-outdated-action)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/npm-outdated-action?style=flat&logo=github)](https://github.com/cssnr/npm-outdated-action/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/npm-outdated-action?style=flat&logo=github)](https://github.com/cssnr/npm-outdated-action/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# NPM Outdated Check

- [Inputs](#Inputs)
  - [Permissions](#Permissions)
- [Outputs](#Outputs)
- [Table Options](#Table-Options)
  - [Table Examples](#Table-Examples)
- [Examples](#Examples)
- [Tags](#Tags)
- [Features](#Features)
  - [Planned](#Planned)
- [Support](#Support)
- [Contributing](#Contributing)

Action to report npm outdated packages on a pull request and comment with a table.

This action will comment on a PR if packages are outdated. As packages are updated, the comment is updated.

You can customize the heading, column visibility, column order, and reporting on wanted or latest.

For more details see the [Table Examples](#Table-Examples).

## Inputs

| Input   | Req. | Default&nbsp;Value         | Input&nbsp;Description                         |
| :------ | :--: | :------------------------- | :--------------------------------------------- |
| columns |  -   | `n,c,w,l`                  | Customize Table Columns [⤵️](#Table-Options)   |
| latest  |  -   | `true`                     | Report if Latest > Wanted [⤵️](#Table-Options) |
| heading |  -   | `### Package Changes`      | Release Notes Heading [⤵️](#Table-Options)     |
| toggle  |  -   | `Click to Toggle Packages` | Toggle Text for Summary [⤵️](#Table-Options)   |
| open    |  -   | `true`                     | Summary Open by Default [⤵️](#Table-Options)   |
| summary |  -   | `true`                     | Add Workflow Job Summary \*                    |
| token   |  -   | `github.token`             | For use with a PAT                             |

**summary:** Will add result details to the job summary on the workflow run.

<details><summary>👀 View Example Job Summary</summary>

---

Coming Soon...

---

</details>

At a minimum, you need to checkout the repository.
The action will run a npm clean install if the `node_modules` directory is not present.

```yaml
- name: 'Checkout'
  uses: actions/checkout@v4

- name: 'NPM Outdated Check'
  uses: cssnr/npm-outdated-action@master
  continue-on-error: true
```

Note: `continue-on-error: true` is used to prevent the workflow from failing if the action fails.

You can view more [Examples](#Examples) below.

### Permissions

This action requires the following permissions to add pull request comments:

```yaml
permissions:
  pull-requests: write
```

Permissions documentation for [Workflows](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/controlling-permissions-for-github_token) and [Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication).

## Outputs

| Output   | Output&nbsp;Description |
| :------- | :---------------------- |
| json     | Chnages JSON Object     |
| markdown | Changes Markdown Table  |

This outputs the changes `json` object and the `markdown` table.

```yaml
- name: 'NPM Outdated Check'
  id: outdated
  uses: cssnr/npm-outdated-action@master

- name: 'Echo Output'
  env:
    JSON: ${{ steps.outdated.outputs.json }}
    MARKDOWN: ${{ steps.outdated.outputs.markdown }}
  run: |
    echo "json: '${{ env.JSON }}'"
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

More Output Examples Coming Soon...

### Table Options

**latest:** To disable reporting of latest and ONLY show wanted, set this to `false`.

**heading:** You can customize the `heading` or set to an empty string to remove it.

**toggle:** The `toggle` must be set to a non-empty string if changing this input.

**open:** Set results to be open by default (note the first example below is open).

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

### Table Examples

<details open><summary>🔷 View Basic Example</summary>

---

<details open><summary>Click to Toggle Packages</summary>

| Package&nbsp;Name                            | Current | Wanted | Latest |
| :------------------------------------------- | :-----: | :----: | :----: |
| [axios](https://www.npmjs.com/package/axios) |  1.8.3  | 1.8.4  |   -    |

</details>

Update packages with: `npm update --save`

---

</details>

More Table Examples Coming Soon...

## Examples

💡 _Click on an example heading to expand or collapse the example._

<details open><summary>Custom Heading</summary>

```yaml
- name: 'Package Changelog Action'
  uses: cssnr/npm-outdated-action@master
  with:
    heading: '**NPM Changelog**'
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

More Examples Coming Soon...

## Tags

The following rolling [tags](https://github.com/cssnr/npm-outdated-action/tags) are maintained.

| Version&nbsp;Tag                                                                                                                                                                                                       | Rolling | Bugs | Feat. |   Name    |  Target  | Example  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :-------: | :------: | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/npm-outdated-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/cssnr/npm-outdated-action/releases/latest) |   ✅    |  ✅  |  ✅   | **Major** | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/npm-outdated-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/cssnr/npm-outdated-action/releases/latest) |   ✅    |  ✅  |  ❌   | **Minor** | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/cssnr/npm-outdated-action?style=for-the-badge&label=%20&color=red)](https://github.com/cssnr/npm-outdated-action/releases/latest)                           |   ❌    |  ❌  |  ❌   | **Micro** | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/cssnr/cloudflare-purge-cache-action/releases) page.

The **Major** tag is recommended. It is the most up-to-date and always backwards compatible.
Breaking changes would result in a **Major** version bump. At a minimum you should use a **Minor** tag.

## Features

- Automatically report npm outdated packages on a PR with a Markdown table.
- Report wanted and latest with option to only report wanted.
- Option to customize columns visibility and columns order.
- Option to display results expanded or collapsed.
- Outputs changes in JSON and markdown.

### Planned

- Packages Exclude List
- Custom Column Alignment
- Custom Column Titles
- Custom Section Text

Want to show package changes on release notes? Check out: [cssnr/package-changelog-action](https://github.com/cssnr/package-changelog-action)

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

Currently, the best way to contribute to this project is to star this project on GitHub.

For more information, see the CSSNR [CONTRIBUTING.md](https://github.com/cssnr/.github/blob/master/.github/CONTRIBUTING.md#contributing).

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

For a full list of current projects to support visit: [https://cssnr.github.io/](https://cssnr.github.io/)
