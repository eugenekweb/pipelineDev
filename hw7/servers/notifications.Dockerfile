FROM grpc_base

WORKDIR /app

COPY ./servers/notifications .

CMD ["node", "service.js"]
