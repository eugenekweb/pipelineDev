const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const userService = protoLoader.loadSync('./userService.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(userService).user;

const taskService = protoLoader.loadSync('./taskService.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const taskProto = grpc.loadPackageDefinition(taskService).task;
  
  const user = new userProto.UserService('localhost:36001', grpc.credentials.createInsecure());

user.GetUser({ user_id: 'u1734187100545' }, (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.log(response.message + ' Username: ' + response.username);
  }
});

const task = new taskProto.TaskService('localhost:36002', grpc.credentials.createInsecure());

task.GetTaskStatus({ task_id: 't1' }, (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.log(response.status);
  }
});