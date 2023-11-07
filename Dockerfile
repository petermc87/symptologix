# Use official Node.js runtime
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy just the package.json since we are using pnpm.
COPY package.json ./

# Install the app dependencies.
RUN pnpm install

# Copy the app source code
COPY . .

RUN npm run build

# Expose the nextjs port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]