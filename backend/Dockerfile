FROM node:18

WORKDIR /app

# Copy only package files first
COPY package*.json ./

RUN npm install

# Then copy rest
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
