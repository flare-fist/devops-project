FROM node:16-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

EXPOSE 5000

CMD ["npm", "start"]