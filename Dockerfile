FROM node:20
WORKDIR /app
COPY package.json ./
RUN npm install && npx @puppeteer/browsers install chromium
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
