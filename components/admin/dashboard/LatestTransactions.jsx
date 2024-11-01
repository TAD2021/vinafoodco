const transactions = [
  { name: 'John Doe', status: 'pending', date: '14.02.2023', amount: '$3.200' },
  { name: 'John Doe', status: 'done', date: '14.02.2023', amount: '$3.200' },
  {
    name: 'John Doe',
    status: 'cancelled',
    date: '14.02.2023',
    amount: '$3.200',
  },
  { name: 'John Doe', status: 'pending', date: '14.02.2023', amount: '$3.200' },
  { name: 'John Doe', status: 'done', date: '14.02.2023', amount: '$3.200' },
];

export const LatestTransactions = () => {
  return (
    <div className="col-span-1 md:col-span-2 bg-gray-800 p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Latest Transactions</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Name</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td className="py-2 flex items-center">
                <img
                  alt="User  profile"
                  className="rounded-full w-8 h-8 mr-2"
                  src="https://storage.googleapis.com/a1aa/image/eZwkVHxKW1y3NKXhvxeRcbCOdCwHTV6aThPbl0fik3MgIjWnA.jpg"
                />
                {transaction.name}
              </td>
              <td className="py-2">
                <span
                  className={`bg-${
                    transaction.status === 'pending'
                      ? 'yellow'
                      : transaction.status === 'done'
                      ? 'green'
                      : 'red'
                  }-500 text-black px-2 py-1 rounded`}
                >
                  {transaction.status}
                </span>
              </td>
              <td className="py-2">{transaction.date}</td>
              <td className="py-2">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
