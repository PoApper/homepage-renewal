FROM node:lts-alpine AS base
WORKDIR /app

# By copying only the package.json and package-lock.json here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm ci --omit=dev && \
    npm cache clean --force

FROM base AS build-deps
RUN npm ci

# Build-time commit SHA (optional)
ARG PUBLIC_COMMIT_SHA=""
ENV PUBLIC_COMMIT_SHA=${PUBLIC_COMMIT_SHA}

FROM build-deps AS build
COPY . .
# Ensure env is available to the build (Astro reads import.meta.env.PUBLIC_*)
ENV PUBLIC_COMMIT_SHA=${PUBLIC_COMMIT_SHA}
RUN npm run build

FROM base AS runtime
# Persist commit SHA in runtime
ENV PUBLIC_COMMIT_SHA=${PUBLIC_COMMIT_SHA}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Expose port
EXPOSE 4321

# Use JSON array format for CMD (best practice)
CMD ["node", "./dist/server/entry.mjs"]