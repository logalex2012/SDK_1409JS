#!/usr/bin/env bash
set -euo pipefail

DOMAIN="https://sdk.my1409.ru"

echo "=== Deploy SDK 1409 ==="

# замена локальных путей на продакшен
sed -i '' 's|href="static/main.css"|href="'$DOMAIN'/static/main.css"|g' demo.html
sed -i '' 's|src="main.js"|src="'$DOMAIN'/main.js"|g' demo.html

echo "→ Пути заменены на $DOMAIN"

# Здесь будет rsync/scp/s3cmd загрузка на сервер
# rsync -avz --delete ./ "$USER@$HOST:/var/www/sdk.my1409.ru/"
echo "→ Загрузка на сервер (добавьте команду)"

# откат локальных путей после деплоя
sed -i '' 's|href="'$DOMAIN'/static/main.css"|href="static/main.css"|g' demo.html
sed -i '' 's|src="'$DOMAIN'/main.js"|src="main.js"|g' demo.html

echo "→ Пути восстановлены"
echo "=== Done ==="
