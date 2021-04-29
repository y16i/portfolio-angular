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

# with proxy
ng serve --proxy-config proxy.conf.json

# hot reload
ng serve --hmr
```

## Production build
ng build --prod

## CI
Bitbucket pipeline: Inactive
CircleCI: Active

git push -> bitbucket -> CircleCI: Lint/Test/Build

## apache2 config sample
```bash
<VirtualHost *:80>
  ServerName my-domain.com
  DocumentRoot /var/www/portfolio/frontend
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

  <Directory /var/www/portfolio/frontend>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>

  Alias /api /var/www/portfolio/WordPress
  <Directory /var/www/portfolio/WordPress>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```
