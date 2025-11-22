import { formatDate } from "../utils/helpers";

const StatsCard = ({ stats }) => {
  return (
    <div className="card">
      <p><strong>Code:</strong> {stats.code}</p>
      <p><strong>Target URL:</strong> {stats.targetUrl}</p>
      <p><strong>Total Clicks:</strong> {stats.clicks}</p>
      <p><strong>Last Clicked:</strong> {formatDate(stats.lastClicked)}</p>
      <p><strong>Created At:</strong> {formatDate(stats.createdAt)}</p>
    </div>
  );
};

export default StatsCard;
