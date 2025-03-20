const github = require('@actions/github')

class Pull {
    /**
     * Create API Instance
     * @param {object} context
     * @param {string} token
     */
    constructor(context, token) {
        this.repo = context.repo
        this.pull_request = context.payload.pull_request
        this.octokit = github.getOctokit(token)
    }

    /**
     * Get Comment by startsWith
     * TODO: Process additional pages, max per_page is 100
     * @param {String} start
     * @return {Promise<Object|undefined>}
     */
    async getComment(start) {
        if (this.pull_request.comments && start) {
            const comments = await this.octokit.rest.issues.listComments({
                ...this.repo,
                issue_number: this.pull_request.number,
                per_page: 100,
            })
            // TODO: Add error handling
            console.log('comments.status:', comments.status)
            // console.log('comments.data:', comments.data)
            if (comments.data.length) {
                for (const comment of comments.data) {
                    // console.log('comment:', comment)
                    if (comment.body.startsWith(start)) {
                        return comment
                    }
                }
            }
        }
    }

    /**
     * Update Comment
     * @param {string} comment_id
     * @param {string} body
     * @return {Promise<object>}
     */
    async updateComment(comment_id, body) {
        return await this.octokit.rest.issues.updateComment({
            ...this.repo,
            comment_id,
            body,
        })
    }

    /**
     * Update Comment
     * @param {string} body
     * @return {Promise<object>}
     */
    async createComment(body) {
        return await this.octokit.rest.issues.createComment({
            ...this.repo,
            issue_number: this.pull_request.number,
            body,
        })
    }
}

module.exports = { Pull }
