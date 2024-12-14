FROM node:18

WORKDIR /app

COPY ./package*.json .
RUN npm install

COPY ./*.proto .

# Expose ports
EXPOSE 36001 36002 36003
