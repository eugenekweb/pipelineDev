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
  
const newUser = new userProto.UserService('localhost:36001', grpc.credentials.createInsecure());

const newTask = new taskProto.TaskService('localhost:36002', grpc.credentials.createInsecure());

newUser.RegisterUser({ username: 'User-1', password: '123456' }, (err, response) => {
  let newUserId;
  if (err) {
    console.error(err);
  } else {
    newUserId = response.user_id;
    console.log('Create new User! ID: ' + newUserId);
    console.log('Response: ', response.message);
  }

  newTask.CreateTask({ user_id: newUserId, description: 'New Task: Todo something...' }, (err, taskResponse) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`\nCreate new task for new User[${newUserId}]`);
      console.log('TaskService Response:', taskResponse);
    }
  });
});



