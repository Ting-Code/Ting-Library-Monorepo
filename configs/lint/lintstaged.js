module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'pnpm --filter @config/lint exec eslint --fix',
    'pnpm --filter @config/lint exec prettier --write'
  ],
  '*.vue': [
    'pnpm --filter @config/lint exec eslint --fix',
    'pnpm --filter @config/lint exec prettier --write'
  ],
  '*.{scss,less,styl,html}': ['pnpm --filter @config/lint exec prettier --write']
}
