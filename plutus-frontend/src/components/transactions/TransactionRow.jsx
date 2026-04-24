import React from "react";
import { CATEGORY_ICON_CONFIG, TRANSACTION_STATUS_CONFIG } from "@/data/config";
import { formatAmount, formatDate, getAmountClass } from "@/utils/transactions";

export default function TransactionRow({ tx }) {
  const icon = CATEGORY_ICON_CONFIG[tx.category] || "•";
  const status = TRANSACTION_STATUS_CONFIG[tx.status];

  return (
    <tr>
      {/* SHOW MERCHANT NAME AND THEIR CATEGORY ICON WITH BACKGROUND */}
      <td>
        <div className="tx-cell">
          <div className="tx-icon">{icon}</div>
          <div>
            <div className="tx-name">{tx.name}</div>
            <div className="tx-sub">{tx.merchant}</div>
          </div>
        </div>
      </td>

      {/* SHOW TRANSACTION CATEGORY IN TEXT*/}
      <td style={{ color: "var(--text-secondary)" }}>{tx.category}</td>

      {/* SHOW TRANSACTION DATE IN TEXT*/}
      <td
        style={{
          color: "var(--text-secondary)",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
        }}
      >
        {formatDate(tx.date)}
      </td>

      {/* SHOW TRANSACTION STATUS IN TEXT*/}
      <td>
        <span className={`status-pill ${status.class}`}>{status.label}</span>
      </td>

      {/* SHOW TRANSACTION AMOUNT IN TEXT*/}
      <td style={{ textAlign: "right" }}>
        <span className={getAmountClass(tx.amount)}>
          {formatAmount(tx.amount)}
        </span>
      </td>
    </tr>
  );
}
