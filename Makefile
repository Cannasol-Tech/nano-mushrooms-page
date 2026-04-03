# Cannasol Nano Mushrooms Landing Page - Makefile
# ================================================

.PHONY: help install preview dev build build-fast test clean deploy deploy-standalone

# Default target
help:
	@echo ""
	@echo "Cannasol Nano Mushrooms Landing Page"
	@echo "======================================"
	@echo ""
	@echo "Available targets:"
	@echo "  make install   - Install dependencies"
	@echo "  make preview   - Start dev server and open in browser"
	@echo "  make dev       - Start dev server (no auto-open)"
	@echo "  make build     - Build for production"
	@echo "  make clean     - Remove build artifacts and node_modules"
	@echo "  make build-fast - Build without prerendering (faster, no Puppeteer)"
	@echo "  make test      - Run tests"
	@echo "  make deploy    - Build and copy into kava site for deployment"
	@echo "  make deploy-standalone - Build and deploy directly to Firebase"
	@echo ""


claude-code:
	claude --allow-dangerously-skip-permissions

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Start dev server and open browser
preview:
	@echo "Starting preview server..."
	@echo "Opening http://localhost:3001 in your browser..."
	npm run dev -- --open

# Start dev server without opening browser
dev:
	@echo "Starting development server..."
	npm run dev

# Build for production
build:
	@echo "Building for production..."
	npm run build
	@echo ""
	@echo "Build complete! Output in ./dist/"

# Build without prerendering (faster, no Puppeteer)
build-fast:
	@echo "Building for production (no prerender)..."
	SKIP_PRERENDER=1 npm run build
	@echo ""
	@echo "Build complete! Output in ./dist/"

# Run tests
test:
	npm run test

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist
	rm -rf node_modules
	rm -rf .vite
	@echo "Clean complete!"

KAVA_DIR = ../nano-kava-react-page

# Build and copy into kava site's dist for deployment
deploy: build
	@echo "Copying mushrooms build into kava dist..."
	@if [ ! -d "$(KAVA_DIR)/dist" ]; then \
		echo "Error: $(KAVA_DIR)/dist not found. Build the kava site first."; \
		exit 1; \
	fi
	rm -rf $(KAVA_DIR)/dist/mushrooms
	cp -r dist $(KAVA_DIR)/dist/mushrooms
	@echo ""
	@echo "Done! Deploy from the kava repo:"
	@echo "  cd $(KAVA_DIR) && firebase deploy"

# Build and deploy directly to the nano-mushrooms-page Firebase project
deploy-standalone: build
	@echo "Deploying to Firebase (nano-mushrooms-page)..."
	firebase deploy --project nano-mushrooms-page
	@echo ""
	@echo "Deployed to https://nano-mushrooms-page.web.app"
