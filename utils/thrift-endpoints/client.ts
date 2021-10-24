import API from "../../src/thrift/API";
import thrift from "thrift";

const clients = ["165.22.212.253", "167.86.117.212", "65.21.204.48"];

//get random clients from
const getRandomClient = () => {
  const randomIndex = Math.floor(Math.random() * clients.length);
  return clients[randomIndex];
};

const getClient = () => {
  var connection = thrift.createConnection(getRandomClient(), 9090, {
    transport: thrift.TBufferedTransport,
    protocol: thrift.TBinaryProtocol,
  });

  return thrift.createClient(API, connection);
};
export default getClient;
