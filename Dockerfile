# ───── Stage 1: build the Vite bundle ─────
FROM node:20-alpine AS build
WORKDIR /app

# Install deps with deterministic lockfile
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Build-time secrets — Vite inlines these at build time.
# Set them as Coolify "Build Args" (NOT runtime env vars).
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY
ENV VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID
ENV VITE_EMAILJS_TEMPLATE_ID=$VITE_EMAILJS_TEMPLATE_ID
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

# Copy source and build
COPY . .
RUN npm run build

# ───── Stage 2: serve the static bundle with nginx ─────
FROM nginx:alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
