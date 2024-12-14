const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./notifyService.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;

const notificationService = {
  SendNotification: (call, callback) => {
    const atNow = (new Date()).toISOString();
    console.log(`${atNow}:\tNotification sent to user ${call.request.user_id}: ${call.request.message}`);
    callback(null, { success: true });
  },
};

function main() {
  const server = new grpc.Server();
  server.addService(notificationProto.NotificationService.service, notificationService);
  server.bindAsync('0.0.0.0:36003', grpc.ServerCredentials.createInsecure(), () => {
    console.log('NotificationService is running on port 36003');
    server.start();
  });
}

main();
