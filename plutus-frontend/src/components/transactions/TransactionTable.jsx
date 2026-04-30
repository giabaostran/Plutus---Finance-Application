import React from "react";
import transactions from "@/config/transactionData.json";
import TransactionRow from "@/components/transactions/TransactionRow";

export default function TransactionTable() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">All Transactions</div>
          <div className="card-sub">As of today · Sorted by date</div>
        </div>
        <div className="card-action">Export CSV ↗</div>
      </div>

      {/* (toolbar stays here for now — no need to split yet) */}

      <div className="tx-table-wrap">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Category</th>
              <th>Account</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
