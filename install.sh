#!/usr/bin/env bash
set -e
if [ "$1" = "setup" ]
then
    echo "🔌    APP SETUP     🔌"
    echo "----------------------------------"
    echo "📝 Copying configuration files..."
    cp .env.example .env
    echo "⛏ Installing dependencies..."
    yarn
    echo "✅ Setup complete. Happy coding ♥️."
fi
