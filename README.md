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
steps: - name: Checkout
uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - uses: pnpm/action-setup@v3
        name: Install pnpm
        with:
          version: 8
          run_install: false

      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

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
            # Install build tools and tauri-cli requirements
            apt-get install -y libwebkit2gtk-4.0-dev build-essential wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev

      - name: Add ARMv7 target
        run: rustup target add armv7-unknown-linux-gnueabihf

      - name: corresponding linker for armv7
        run: sudo apt-get install -y gcc-arm-linux-gnueabihf

      - name: Configure apt to use a different mirror
        run: |
          sudo sed -i 's/http:\/\/security\.ubuntu\.com\/ubuntu\//http:\/\/archive\.ubuntu\.com\/ubuntu\//g' /etc/apt/sources.list
          sudo apt-get update

      - name: Print Debugging Information
        run: |
          uname -a
          cat /etc/apt/sources.list
          sudo apt-get update

      - name: respective architecture in the package manager
        run: sudo dpkg --add-architecture armhf

      - name: Update package manager
        run: sudo apt-get update

      - name: Install dependencies
        run: sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.0-dev libssl-dev libappindicator3-dev librsvg2-dev libwebkit2gtk-4.0-dev:armhf libssl-dev:armhf

      - name: PKG_CONFIG_SYSROOT_DIR
        run: export PKG_CONFIG_SYSROOT_DIR=/usr/arm-linux-gnueabihf/

      - name: Install dependencies
        run: pnpm install && pnpm tauri build --target armv7-unknown-linux-gnueabihf

      - name: Upload deb bundle
        uses: actions/upload-artifact@v3
        with:
          name: Debian Bundle
          path: ${{ github.workspace }}/src-tauri/target/release/bundle/deb/tauri_1.4_arm64.deb

////////////////

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
steps: - name: Checkout
uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - uses: pnpm/action-setup@v3
        name: Install pnpm
        with:
          version: 8
          run_install: false

      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

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
            apt-get install -y curl
            curl https://sh.rustup.rs -sSf | sh -s -- -y
            . "$HOME/.cargo/env"
            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash
            # Install build tools and tauri-cli requirements
            apt-get install -y libwebkit2gtk-4.0-dev:armhf build-essential wget libssl-dev:armhf libgtk-3-dev:armhf libayatana-appindicator3-dev:armhf librsvg2-dev:armhf

      - name: Add ARMv7 target
        run: rustup target add armv7-unknown-linux-gnueabihf

      - name: Configure apt to use a different mirror
        run: |
          sudo sed -i 's/http:\/\/security\.ubuntu\.com\/ubuntu\//http:\/\/archive\.ubuntu\.com\/ubuntu\//g' /etc/apt/sources.list
          sudo apt-get update

      - name: Print Debugging Information
        run: |
          uname -a
          cat /etc/apt/sources.list
          sudo apt-get update

      - name: Update package manager
        run: sudo apt-get update

      - name: respective architecture in the package manager
        run: sudo dpkg --add-architecture armhf

      - name: Install dependencies
        run: sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.0-dev libssl-dev libappindicator3-dev librsvg2-dev

      - name: Configure pkg-config for cross-compilation
        run: |
          export PKG_CONFIG_ALLOW_CROSS=1
          export PKG_CONFIG_ALLOW_CROSS_armv7_unknown_linux_gnueabihf=1
          export PKG_CONFIG_SYSROOT_DIR=/usr/arm-linux-gnueabihf/
          export PKG_CONFIG_PATH=/usr/arm-linux-gnueabihf/usr/lib/pkgconfig:/usr/arm-linux-gnueabihf/usr/share/pkgconfig
          export PKG_CONFIG=arm-linux-gnueabihf-pkg-config

      - name: Install dependencies
        run: |
          pnpm install
          pnpm tauri build --target armv7-unknown-linux-gnueabihf

      - name: Upload deb bundle
        uses: actions/upload-artifact@v3
        with:
          name: Debian Bundle
          path: ${{ github.workspace }}/src-tauri/target/release/bundle/deb/tauri_1.4_arm64.deb
