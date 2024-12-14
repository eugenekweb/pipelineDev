FROM grpc_base

WORKDIR /app

COPY ./servers/tasks .

CMD ["node", "service.js"]
