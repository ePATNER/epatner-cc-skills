module.exports = {
  branches: ['main'],
  plugins: [
    ['@semantic-release/exec', { verifyConditionsCmd: './scripts/release-preflight.sh' }],
    ['@semantic-release/commit-analyzer', {
      parserOpts: { noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE', 'BREAKING'] },
      releaseRules: [
        { breaking: true, release: 'major' },
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'revert', release: 'patch' },
        { type: 'docs', release: 'patch' },
        { type: 'chore', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'test', release: 'patch' },
        { type: 'build', release: 'patch' },
        { type: 'ci', release: 'patch' },
      ],
    }],
    ['@semantic-release/release-notes-generator', {
      parserOpts: { noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE', 'BREAKING'] },
    }],
    ['@semantic-release/exec', { prepareCmd: 'node scripts/sync-versions.mjs ${nextRelease.version}' }],
    '@semantic-release/changelog',
    ['@semantic-release/git', {
      assets: [
        'CHANGELOG.md',
        'package.json',
        'plugin.json',
        'marketplace.json',
        'plugins/**/plugin.json',
        'README.md'
      ],
      message: 'chore(release): ${nextRelease.version} [skip ci]'
    }],
    ['@semantic-release/github', {
      successComment: false,
      failComment: false,
      releasedLabels: false,
      addReleases: false,
    }],
  ],
};
