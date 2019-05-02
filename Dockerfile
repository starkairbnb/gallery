FROM node:10.15.3
WORKDIR /gallery
COPY . .
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "start"]