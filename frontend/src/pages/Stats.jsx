import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { linkAPI } from "../services/api";
import StatsCard from "../components/StatsCard";
import { ChevronDown } from 'lucide-react';

const Stats = () => {
  const { code } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await linkAPI.getStats(code);
        setStats(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [code]);

  if (loading) return (
    <div className="container">
      <p className="loading">Loading...</p>
    </div>
  );
  
  if (error) return (
    <div className="container">
      <p className="error">{error}</p>
    </div>
  );

  return (
    <div className="container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-section">
          <h2 className="page-title">Stats for: {code}</h2>
        </div>
      </div>

      {/* Stats Content */}
      <StatsCard stats={stats} />
    </div>
  );
};

export default Stats;