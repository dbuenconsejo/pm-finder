# Development Notes

## Docker Commands - Important

When running Docker commands that generate/create files (like `artisan make:*` commands), the container runs as root. After creating files, **fix permissions** on the host to ensure proper file ownership:

```bash
# After running make commands, fix permissions on host:
sudo chown -R $(whoami):$(whoami) app/ database/ resources/

# Example make commands (files will be owned by root initially):
docker compose exec app php artisan make:model Example -m
docker compose exec app php artisan make:controller ExampleController
```

### Why?
Files created inside the Docker container will be owned by root (container's default user), causing permission issues when trying to edit them on the host machine.

### Commands that create files (run chown after):
- `php artisan make:model`
- `php artisan make:controller`
- `php artisan make:migration`
- `php artisan make:seeder`
- `php artisan make:factory`
- `php artisan make:policy`
- `php artisan make:request`
- `php artisan make:resource`
- `php artisan make:middleware`
- `php artisan make:command`
- Any other command that creates files

### Commands that don't need permission fix:
- `php artisan migrate`
- `php artisan db:seed`
- `php artisan tinker`
- `php artisan route:list`
- `php artisan config:cache`
- `php artisan cache:clear`
- Commands that only read or execute without creating files

---

## AI Agent Instructions

**For any AI agent working on this project:**

1. After running `docker compose exec app php artisan make:*` commands, run:
   ```bash
   sudo chown -R $(whoami):$(whoami) app/ database/ resources/
   ```
2. This prevents file permission issues in the development environment
