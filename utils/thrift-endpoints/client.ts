import API from "../../src/thrift/API";
import thrift from "thrift";

const getClient = () => {
  var connection = thrift.createConnection("165.22.212.253", 9090, {
    transport: thrift.TBufferedTransport,
    protocol: thrift.TBinaryProtocol,
  });

  return thrift.createClient(API, connection);
};
export default getClient;
