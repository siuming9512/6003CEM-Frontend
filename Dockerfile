FROM node:19.4.0-alpine
EXPOSE 3001
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN yarn
CMD ["yarn", "start"]