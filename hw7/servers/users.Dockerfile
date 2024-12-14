FROM grpc_base

WORKDIR /app

COPY ./servers/users .

CMD ["node", "service.js"]
