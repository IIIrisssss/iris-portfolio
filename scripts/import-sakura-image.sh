#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${1:-}"
DEST="$ROOT/public/radiance-works/spring-sakura-shiratama.jpg"

if [[ -z "$SRC" || ! -f "$SRC" ]]; then
  echo "Usage: ./scripts/import-sakura-image.sh /path/to/your-3240x3915.jpg"
  exit 1
fi

mkdir -p "$(dirname "$DEST")"
cp "$SRC" "$DEST"

echo "Imported to: $DEST"
sips -g pixelWidth -g pixelHeight "$DEST"
