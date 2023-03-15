import { Octokit } from "octokit"
import { readFileSync } from 'fs';
const args = process.argv;
const octokit = new Octokit({
    auth：args[2]
});
const owner = args[3]
const repo = args[4]
try {
    console.log(args)
    const changelog = readFileSync('CHANGELOG.md', { encoding: 'utf-8' })
    const loglines = changelog.split('\n')
    const version = /🚀(.*?) /.exec(loglines[0])[1]
    const name = loglines[0].replace(/#/g, '').trim()
    let body = ''
    for (let i = 0; i < loglines.length; i++) {
        const line = loglines[i];
        if (line.startsWith('#')) {
            if (i > 1) break;
            continue;
        }
        body += line + '\n'
    }
    const latestRelease = await octokit.request(`GET /repos/${owner}/${repo}/releases/latest`, {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    const lastVersion = latestRelease.data.tag_name;
    // 当版本不等于最后一个版本时
    if (lastVersion !== version) {
        await octokit.request(`POST /repos/${owner}/${repo}/releases`, {
            owner,
            repo,
            tag_name: version,
            target_commitish: 'main',
            name,
            body,
            draft: false,
            prerelease: false,
            generate_release_notes: false,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log('发布版本成功!');
    }
    else console.log("无需发布");
} catch (error) {
    console.log(error)
    console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
}
