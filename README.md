# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Get Started

pnpm i
pnpm tauri dev --- this runs app locally
pnpm tauri build --- build

source "$HOME/.cargo/env"
rustup update

name: ARMv7 Linux Build
on:
push:
tags: - "v\*"
workflow_dispatch:

env:
APP_NAME: "KIOSK"

jobs:
changelog:
runs-on: ubuntu-latest
steps: - name: Checkout repository
uses: actions/checkout@v4

      - name: Build changelog
        id: build_changelog
        run: |
          PREV_TAG=$(git tag --list v* | tail -n2 | head -n1)
          echo "changelog=$(git log $PREV_TAG...${{ github.ref_name }} --pretty=format:"- %s")" >> $GITHUB_OUTPUT
    outputs:
      changelog: ${{ steps.build_changelog.outputs.changelog }}

release:
strategy:
fail-fast: false
matrix:
platform: [ubuntu-latest]
runs-on: ${{ matrix.platform }}
needs: changelog
steps: - name: Checkout repository
uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: latest

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      - name: Setup Rust
        run: |
          rustup update --no-self-update

      - name: Install Ubuntu dependencies
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt update
          xargs sudo apt install -y < environment/apt_packages.txt

      - name: Setup ARM build environment
        uses: pguyot/arm-runner-action@v2.5.2
        with:
          base_image: raspios_lite:latest
          cpu: cortex-a7
          bind_mount_repository: true
          image_additional_mb: 10240
          optimize_image: false
          commands: |
            # Rust complains (rightly) that $HOME doesn't match eid home
            export HOME=/root
            # Workaround to CI worker being stuck on Updating crates.io index
            export CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse
            # Install setup prerequisites
            apt-get update -y --allow-releaseinfo-change
            apt-get upgrade -y
            apt-get autoremove -y
            apt-get install curl
            curl https://sh.rustup.rs -sSf | sh -s -- -y
            . "$HOME/.cargo/env"
            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash
            # Install framework specific packages
            apt-get install -y nodejs
            # Install build tools and tauri-cli requirements
            apt-get install -y libwebkit2gtk-4.0-dev build-essential wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
            # cargo install tauri-cli
            # Install frontend dependencies
            npm cache clean --force
            rm -rf
            pnpm install -g @tauri-apps/cli
            pnpm install --force
            # Build the application
            pnpm tauri build --target armv7-unknown-linux-gnueabihf
      - name: Upload deb bundle
        uses: actions/upload-artifact@v3
        with:
          name: Debian Bundle
          path: ${{ github.workspace }}/src-tauri/target/release/bundle/deb/tauri_1.4_arm64.deb

      - name: Change directory back
        run: |
          cd ..

      - name: Install Tauri
        run: |
          npm install
          npm i @tauri-apps/cli-linux-x64-gnu

      - name: Build Tauri app for ARMv7 Linux
        uses: tauri-apps/tauri-action@v0
        env:
          CI: true
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          TAURI_PRIVATE_KEY: ${{ secrets.TAURI_PRIVATE_KEY }}
          TAURI_KEY_PASSWORD: ${{ secrets.TAURI_KEY_PASSWORD }}
          TARGET: armv7-unknown-linux-gnueabihf
        with:
          tagName: ${{ github.ref_name }}
          releaseName: "${{ env.APP_NAME }} v__VERSION__"
          releaseBody: |
            ${{needs.changelog.outputs.changelog}}
            See the assets to download this version and install.
          releaseDraft: true
          prerelease: false
