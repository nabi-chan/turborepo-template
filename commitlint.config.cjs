const { readdirSync } = require('fs');
const { join } = require('path');

const Configuration = {
  extends: ['@commitlint/config-conventional'],
  utils: { getPackages },
  rules: {
    'scope-enum': (ctx) => getPackages(ctx).then((packages) => [2, 'always', packages]),
  },
};

async function getPackages(context) {
  return Promise.resolve().then(() => {
    const ctx = context || {};
    const cwd = ctx.cwd || process.cwd();

    const appProjects = readdirSync(join(cwd, 'apps'));
    const packageProjects = readdirSync(join(cwd, 'packages'));

    return ['repo', ...appProjects, ...packageProjects];
  });
}

module.exports = Configuration;
