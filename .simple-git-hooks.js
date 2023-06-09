module.exports = {
  'prepare-commit-msg': `grep -qE '^[^#]' .git/COMMIT_EDITMSG || (exec < /dev/tty && yarn cz --hook || true)`,
  'pre-commit': './node_modules/.bin/nano-staged',
};
