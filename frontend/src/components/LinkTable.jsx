import { Link } from "react-router-dom";
import { Trash2, Copy, ExternalLink, Settings } from "lucide-react";
import { copyToClipboard, truncateUrl, formatDate } from "../utils/helpers";
import { Link2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_PROD || 'http://localhost:5000';

const LinkTable = ({ links, onDelete }) => {
  const formatViews = (clicks) => {
    if (clicks >= 1000) {
      return `${(clicks / 1000).toFixed(0)}k views in a day`;
    }
    return `${clicks} views in a day`;
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Code</th>
          <th>URL</th>
          <th>Type</th>
          <th>Status</th>
          <th style={{ textAlign: 'right' }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.length === 0 && (
          <tr>
            <td colSpan="5" className="empty">
              No links found
            </td>
          </tr>
        )}

        {links.map((link) => (
          <tr key={link.code}>
            <td>
              <div className="link-icon-wrapper">
                <Link2 size={20} />
              </div>
              <div className="link-info">
                <Link to={`/code/${link.code}`} className="link-code">
                  {link.code}
                </Link>
                <span className="link-id">#{link.code.toUpperCase()}</span>
              </div>
            </td>

            <td>
              <span className="link-url" title={link.targetUrl}>
                {truncateUrl(link.targetUrl, 50)}
              </span>
            </td>

            <td>
              <span className="link-type">Link</span>
            </td>

            <td>
              <div className="status-wrapper">
                <div className="status-badge">
                  <span className={`status-dot ${link.clicks > 0 ? 'available' : 'unavailable'}`}></span>
                  <span className={`status-text ${link.clicks > 0 ? 'available' : 'unavailable'}`}>
                    {link.clicks > 0 ? 'Clicked' : 'Unclicked'}
                  </span>
                </div>
                <span className="status-views">{formatViews(link.clicks)}</span>
              </div>
            </td>

            <td className="row-actions">
              {/* Visit short URL */}
              <a
                href={`${API_BASE}/${link.code}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit"
              >
                <ExternalLink size={18} />
              </a>

              {/* Copy short URL */}
              <button onClick={() => copyToClipboard(link.shortUrl)} title="Copy">
                <Copy size={18} />
              </button>


              {/* Delete */}
              <button className="danger" onClick={() => onDelete(link.code)} title="Delete">
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinkTable;