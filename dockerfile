FROM node:14-alpine
WORKDIR /misfit-be
COPY . .
RUN npm install
RUN npm install -g nodemon
EXPOSE 3000
CMD ["nodemon", "index.js"]