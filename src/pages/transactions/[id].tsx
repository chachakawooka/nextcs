import { useRouter } from "next/router";

const Transaction = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Transaction: {id}</p>;
};

export default Transaction;
