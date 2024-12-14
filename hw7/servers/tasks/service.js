const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { ReflectionService } = require('@grpc/reflection');

const packageDefinition = protoLoader.loadSync('./taskService.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const taskProto = grpc.loadPackageDefinition(packageDefinition).task;

const notificationProtoDefinition = protoLoader.loadSync('./notifyService.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const notificationProto = grpc.loadPackageDefinition(notificationProtoDefinition).notification;

const notificationClient = new notificationProto.NotificationService(
  'notification_service:36003', grpc.credentials.createInsecure()
);

const taskService = {
  CreateTask: (call, callback) => {
    const userId = call.request.user_id;
    const description = call.request.description;
    const taskId = `t${Date.now()}`; 
    const createdAt = new Date().toISOString();
    callback(null, { task_id: taskId, message: `Task ${taskId}: {${description}} created for user ${userId} (at ${createdAt})` });

    notificationClient.SendNotification({
      user_id: userId,
      message: `Task ${taskId} created successfully at ${createdAt}!`,
  }, (err, notificationResponse) => {
      if (err) {
          console.error('Notification error:', err);
      } else {
          console.log('Notification sent:', notificationResponse.success);
      }
  });
  },
  GetTaskStatus: (call, callback) => {
    const taskId = call.request.task_id;
    let status = '404 - No such task.';
    if (taskId === 't12345678') {
      status = 'InProgress';
    }
    callback(null, { status: 'Task status: ' + status });
  }
};

function main() {
  const server = new grpc.Server();
  server.addService(taskProto.TaskService.service, taskService);
  const reflection = new ReflectionService(packageDefinition);
  reflection.addToServer(server);
  server.bindAsync('0.0.0.0:36002', grpc.ServerCredentials.createInsecure(), () => {
    console.log('TaskService is running with reflection on port 36002');
    server.start();
  });
}

main();
