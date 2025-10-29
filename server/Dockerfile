FROM node:16-alpine

WORKDIR /app

# Copy package files first
COPY package.json .
COPY package-lock.json .

# Install dependencies using npm
RUN npm install

# Copy source code
COPY . .

EXPOSE 5000

CMD [\"npm\", \"start\"]
