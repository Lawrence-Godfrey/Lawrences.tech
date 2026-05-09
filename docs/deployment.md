# Deployment

Production deploys are handled by `.github/workflows/deploy.yml`.

The workflow builds the client in GitHub Actions, packages the built client with the server source, copies the archive to EC2, unpacks it into a timestamped release directory, installs production server dependencies, promotes the release, restarts PM2, reloads nginx, and checks `/api/health`.

Required GitHub environment secrets:

- `HOST`: EC2 hostname or IP address.
- `USERNAME`: SSH user for deployments.
- `SSH_KEY`: private SSH key for the deploy user.
- `KNOWN_HOSTS`: SSH known_hosts entry for the deploy target.

Optional GitHub environment variables:

- `APP_DIR`: release root. Defaults to `/var/www/lawrences.tech`.
- `FRONTEND_ROOT`: nginx frontend root. Defaults to `/var/www/html/client/dist`.
- `HEALTHCHECK_URL`: health check URL. Defaults to `http://127.0.0.1:5050/api/health`.
- `LEGACY_ENV_PATH`: existing server `.env` to copy on first deploy. Optional; if unset, create `APP_DIR/shared/.env` before deploying.
- `PM2_APP_NAME`: PM2 app name. Defaults to `backend`.
- `RELEASES_TO_KEEP`: number of old releases to retain. Defaults to `5`.

The deploy user needs write access to `APP_DIR` and `FRONTEND_ROOT`, permission to run `pm2`, and passwordless sudo for `nginx -t` and `systemctl reload nginx`.