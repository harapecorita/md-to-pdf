FROM node:20
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install && npx @puppeteer/browsers install chromium
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
