#!/bin/sh
echo "Check that we have NEXT_PUBLIC_GOOGLE_MAPS_API_KEY vars"
test -n "$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#PLACEHOLDER_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY#$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY#g"
echo "Starting Nextjs"
exec "$@"
