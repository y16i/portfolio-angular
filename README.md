## ESLint
```bash
ng lint
```

## unit tests
```bash
# single run
ng test

# with watcher
ng test --watch=true
```

## Dev
```bash
ng serve

# hot reload
ng serve --hmr
```

## Production build
npm run build --env=production

## CI
Bitbucket pipeline: Disabled
CircleCI: Enabled

git push -> bitbucket -> CircleCI: Lint/Test/Build
