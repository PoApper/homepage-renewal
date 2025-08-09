FROM node:lts-alpine AS base
WORKDIR /app

# By copying only the package.json and package-lock.json here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm ci --omit=dev && \
    npm cache clean --forc

FROM base AS build-deps
RUN npm ci

FROM build-deps AS build
COPY . .
RUN npm run build

FROM base AS runtime
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