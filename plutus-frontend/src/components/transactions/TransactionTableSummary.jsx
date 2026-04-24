import React from "react";
import transactions from "@/data/transactionData.json";
import TransactionRow from "@/components/transactions/TransactionRow";

export default function RecentTransactionTable() {
  const recent = transactions.slice(0, 5);

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Recent Transactions</div>
          <div className="card-sub">
            Last 7 days · {recent.length} transactions
          </div>
        </div>
        <div className="card-action">
          <a href="transactions">View all →</a>
        </div>
      </div>

      <div className="tx-table-wrap">
        <table className="tx-table">
          <tbody>
            {recent.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
