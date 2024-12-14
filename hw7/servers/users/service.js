const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { ReflectionService } = require('@grpc/reflection');

const packageDefinition = protoLoader.loadSync('./userService.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;
const atNow = (new Date()).toISOString();

const users = {
  'u12345678': { username: 'Admin', password: '@dmin' },
};

const userService = {
  RegisterUser: (call, callback) => {
    const userId = `u${Date.now()}`;
    users[userId] = {username: call.request.username, password: call.request.password};
    callback(null, { user_id: userId, message: `User ${users[userId].username} registered successfully! (at ${atNow})` });
  },
  GetUser: (call, callback) => {
    const userId = call.request.user_id;
    const user = users[userId];

    if (!user) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: `User with ID ${userId} not found`,
      });
      return;
    }

    callback(null, {
      username: user.username,
      message: `User ${user.username} retrieved successfully!`,
    });
  },
};

function main() {
  const server = new grpc.Server();
  server.addService(userProto.UserService.service, userService);
  const reflection = new ReflectionService(packageDefinition);
  reflection.addToServer(server);
  server.bindAsync('0.0.0.0:36001', grpc.ServerCredentials.createInsecure(), () => {
    console.log('UserService is running with reflection on port 36001');
    server.start();
  });
}

main();
