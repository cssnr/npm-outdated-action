const fs = require('fs')
const core = require('@actions/core')
const exec = require('@actions/exec')
const github = require('@actions/github')

const { createHash } = require('crypto')
const { markdownTable } = require('markdown-table')

const { Pull } = require('./api')

const maps = {
    n: { align: 'l', col: 'Package&nbsp;Name' },
    c: { align: 'c', col: 'Current' },
    w: { align: 'c', col: 'Wanted' },
    l: { align: 'c', col: 'Latest' },
    d: { align: 'l', col: 'Dependent' },
    p: { align: 'l', col: 'Location' },
}

;(async () => {
    try {
        core.info(`🏳️ Starting NPM Outdated Check`)

        // Debug
        core.startGroup('Debug: github.context')
        console.log(github.context)
        core.endGroup() // Debug github.context
        core.startGroup('Debug: process.env')
        console.log(process.env)
        core.endGroup() // Debug process.env

        // Get Config
        const config = getConfig()
        core.startGroup('Get Config')
        console.log(config)
        core.endGroup() // Config

        // try {
        //     await exec.exec('npm', ['ls'])
        //     console.log('NPM Install Already Run, skipping...')
        // } catch (e) {
        //     console.log('Running NPM Install...')
        //     await exec.exec('npm', ['i'])
        // }

        // let ci, cie

        // let results
        // try {
        //     // if (!fs.existsSync('node_modules')) {
        //     core.startGroup('Running: npm ci')
        //     // await exec.exec('npm', ['ci'])
        //     // [ci, cie] = await checkOutput('npm', ['ci'])
        //     results = await checkOutput('npm', ['ci'])
        //     console.log('results:', results)
        //     core.endGroup() // npm install
        //     // }
        // } catch (e) {
        //     console.log('e:', e)
        //     console.log('results:', results)
        //     core.endGroup() // npm install
        // }

        const results = await checkOutput('npm', ['ci'], true)
        const ci = results.length > 1 ? results[1] : ''
        console.log('-----------')
        console.log('ci:', ci)
        // return

        let outdated = ''
        if (!ci) {
            core.startGroup('Running: npm outdated')
            const npmOutdated = await checkOutput('npm', ['outdated', '--json'])
            core.endGroup() // npm outdated

            core.startGroup('Outdated JSON')
            console.log(npmOutdated)
            core.endGroup() // Outdated JSON

            /** @type {{current: string, wanted: string, latest: string, dependent: string, location: string}} **/
            outdated = JSON.parse(npmOutdated)
            core.startGroup('Outdated Object')
            console.log(outdated)
            core.endGroup() // Outdated Object
        }

        let ncu = ''
        if (!ci) {
            core.startGroup('Running: npx npm-check-updates')
            const npxNcu = await checkOutput('npx', ['npm-check-updates'])
            ncu = npxNcu.split('\n').slice(2, -2).join('\n')
            console.log('-----------')
            console.log(ncu)
            console.log('-----------')
            core.endGroup() // npx npm-check-updates
        }

        let update = ''
        if (!ci) {
            core.startGroup('Running: npm update --dry-run')
            const npmUpdate = await checkOutput('npm', ['update', '--dry-run'])
            update = !npmUpdate.trim().startsWith('up to date')
                ? npmUpdate.substring(0, npmUpdate.lastIndexOf(' in'))
                : ''
            console.log('-----------')
            console.log(update)
            console.log('-----------')
            console.log(JSON.stringify(update))
            console.log('-----------')
            core.endGroup() // npm update --dry-run
        }

        core.startGroup('Generate Table')
        const table = genTable(config, outdated)
        core.endGroup() // Generate Table
        core.startGroup('Table Outdated')
        console.log(table)
        core.endGroup() // Table Outdated

        const hasOutdated =
            ci ||
            !!Object.entries(outdated).length ||
            !!(config.ncu && ncu) ||
            !!(config.update && update)
        console.log('hasOutdated:', hasOutdated)

        const markdown = genMarkdown(
            config,
            hasOutdated,
            ci,
            table,
            ncu,
            update
        )
        core.startGroup('Markdown String')
        console.log(markdown)
        core.endGroup() // Markdown String

        console.log('comments:', github.context.payload.pull_request?.comments)
        let comment
        if (
            github.context.eventName === 'pull_request' &&
            (github.context.payload.pull_request?.comments || hasOutdated)
        ) {
            core.startGroup(`Processing PR: ${github.context.payload.number}`)
            comment = await updatePull(config, markdown, hasOutdated)
            console.log('Complete.')
            core.endGroup() // Processing PR
        } else {
            console.log('Not PR AND (No Comments OR Outdated Packages)')
        }

        // Outputs
        core.info('📩 Setting Outputs')
        core.setOutput('outdated', JSON.stringify(outdated))
        core.setOutput('ncu', ncu)
        core.setOutput('update', update)
        core.setOutput('markdown', markdown)

        // Summary
        if (config.summary) {
            core.info('📝 Writing Job Summary')
            try {
                await addSummary(config, markdown, comment)
            } catch (e) {
                console.log(e)
                core.error(`Error writing Job Summary ${e.message}`)
            }
        }

        if (config.fail && hasOutdated) {
            core.info(`⛔ \u001b[31;1mUpdates Found`)
            core.setFailed('Updates found and fail is set to true.')
        } else {
            core.info(`✅ \u001b[32;1mFinished Success`)
        }
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()

/**
 * Update PR
 * @param {Config} config
 * @param {String} markdown
 * @param {Boolean} changes
 * @return {Promise<Object|undefined>}
 */
async function updatePull(config, markdown, changes) {
    if (!github.context.payload.pull_request?.number) {
        throw new Error('Unable to determine the Pull Request number!')
    }

    const newHex = createHash('sha256').update(markdown).digest('hex')
    const id = `<!-- npm-outdated-action ${newHex} -->`
    const body = `${id}\n${markdown}`

    const pull = new Pull(github.context, config.token)

    // Step 1 - Check for Current Comment
    let comment = await pull.getComment('<!-- npm-outdated-action')
    console.log('comment:', comment)
    if (!comment && !changes) {
        console.log('No comment AND no changes, skipping...')
        return comment
    }

    // Step 2 - Update Comment: Skip, Edit, or Add
    if (comment) {
        // Step 2A - Comment Found ...
        console.log('Comment Found:', comment.id)
        const oldHex = comment.body.split(' ', 3)[2]
        console.log('oldHex:', oldHex)
        console.log('newHex:', newHex)
        if (oldHex === newHex) {
            // Step 2A-1 - Valid Hex - Skip
            console.log('Comment Valid Hex - Skip')
            return comment
        } else {
            // Step 2A-2 - Invalid Hex - Edit
            console.log('Comment Invalid Hex - Edit')
            const response = await pull.updateComment(comment.id, body)
            // TODO: Add error handling
            console.log('response.status:', response.status)
            return comment
        }
    } else {
        // Step 2B - Not Found - Add
        console.log('Not Found - Add')
        const response = await pull.createComment(body)
        // TODO: Add error handling
        console.log('response.status:', response.status)
        return response.data
    }
}

/**
 * Check Command Output
 * @param {String} commandLine
 * @param {String[]} [args]
 * @param {Boolean} [error]
 * @return {Promise<String|String[]>}
 */
async function checkOutput(commandLine, args = [], error = false) {
    // options = { ...{ ignoreReturnCode: true }, ...options }
    // console.log('options:', options)
    const options = { ignoreReturnCode: true }
    let myOutput = ''
    let myError = ''
    options.listeners = {
        stdout: (data) => {
            myOutput += data.toString()
        },
        stderr: (data) => {
            myError += data.toString()
        },
    }
    await exec.exec(commandLine, args, options)
    console.log('myError:', myError)
    if (error) {
        return [myOutput.trim(), myError.trim()]
    } else {
        return myOutput.trim()
    }
}

/**
 * Generate Markdown
 * @param {Config} config
 * @param {Boolean} changes
 * @param {String} ci
 * @param {Array[]} data
 * @param {String} ncu
 * @param {String} update
 * @return {String}
 */
function genMarkdown(config, changes, ci, data, ncu, update) {
    const open = config.open ? ' open' : ''
    let result = `${config.heading}\n\n`

    if (!changes) {
        result += '✅ All packages are up-to-date.\n\n'
    }
    if (ci) {
        result += `⛔ Error running install: \`npm ci\`\n\n`
        result += `\`\`\`text\n${ci}\n\`\`\`\n\n`
    }

    if (data.length) {
        const [cols, align] = [[], []]
        config.columns.forEach((c) => cols.push(maps[c].col))
        config.columns.forEach((c) => align.push(maps[c].align))
        console.log('cols, align:', cols, align)

        const table = markdownTable([cols, ...data], { align })
        console.log('table:\n', table)
        result += `<details${open}><summary>npm outdated</summary>\n\n${table}\n\n</details>\n\n`
    }

    if (config.ncu && ncu) {
        result += `<details${open}><summary>npm-check-updates</summary>\n\n\`\`\`text\n${ncu}\n\`\`\`\n\n</details>\n\n`
    }

    if (config.update && update) {
        result += `<details${open}><summary>npm update --dry-run</summary>\n\n\`\`\`text\n${update}\n\`\`\`\n\n</details>\n\n`
    }

    return result
}

/**
 * Generate Table Array
 * @param {Config} config
 * @param {Object} outdated
 * @return {*[]}
 */
function genTable(config, outdated) {
    // TODO: Ensure order of returned data
    const results = []
    for (const [name, data] of Object.entries(outdated)) {
        // console.log(name, data)
        if (!config.latest && data.wanted !== data.latest) {
            core.notice(`Skipping outdated package "${name}" on latest: false`)
            continue
        }
        // TODO: Add option to show latest version if same as wanted
        const latest = data.wanted !== data.latest ? data.latest : '-'
        const packageName = config.link
            ? `[${name}](https://www.npmjs.com/package/${name})`
            : name
        const pkg = {
            n: packageName,
            c: data.current,
            w: data.wanted,
            l: latest,
            d: data.dependent,
            p: data.location,
        }
        // console.log('pkg:', pkg)
        const result = []
        config.columns.forEach((k) => result.push(pkg[k]))
        results.push(result)
    }
    return results
}

/**
 * Add Summary
 * @param {Config} config
 * @param {String} markdown
 * @param {Object} comment
 * @return {Promise<void>}
 */
async function addSummary(config, markdown, comment) {
    core.summary.addRaw('## NPM Outdated Action\n\n')
    if (comment) {
        const url = `https://github.com/${github.context.repo.owner}/${github.context.repo.repo}/pull/${github.context.payload.number}#issuecomment-${comment.id}`
        core.summary.addRaw(
            `PR Comment: [#${github.context.payload.number}](${url}) \n\n`
        )
    } else {
        core.summary.addRaw('No PR Comment Found.\n\n')
    }

    core.summary.addRaw(`---\n\n${markdown}\n\n---\n\n`)

    delete config.token
    const yaml = Object.entries(config)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join('\n')
    core.summary.addRaw('<details><summary>Config</summary>')
    core.summary.addCodeBlock(yaml, 'yaml')
    core.summary.addRaw('</details>\n')

    const text = 'View Documentation, Report Issues or Request Features'
    const link = 'https://github.com/cssnr/npm-outdated-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
    await core.summary.write()
}

/**
 * Get Config
 * @typedef {Object} Config
 * @property {String[]} columns
 * @property {Boolean} latest
 * @property {String} heading
 * @property {Boolean} summary
 * @property {Boolean} open
 * @property {Boolean} ncu
 * @property {Boolean} update
 * @property {Boolean} fail
 * @property {Boolean} link
 * @property {String} token
 * @return {Config}
 */
function getConfig() {
    return {
        columns: core.getInput('columns', { required: true }).split(','),
        latest: core.getBooleanInput('latest'),
        heading: core.getInput('heading'),
        open: core.getBooleanInput('open'),
        ncu: core.getBooleanInput('ncu'),
        update: core.getBooleanInput('update'),
        link: core.getBooleanInput('link'),
        fail: core.getBooleanInput('fail'),
        summary: core.getBooleanInput('summary'),
        token: core.getInput('token', { required: true }),
    }
}
