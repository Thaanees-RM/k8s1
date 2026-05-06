FROM node:18

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build"]
