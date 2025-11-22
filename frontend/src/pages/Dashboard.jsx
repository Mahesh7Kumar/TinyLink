import { useLinks } from "../hooks/useLinks";
import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";
import SearchBar from "../components/SearchBar";
import { ChevronDown } from 'lucide-react';

const Dashboard = () => {
  const { links, loading, error, fetchLinks, deleteLink, createLink } = useLinks();

  return (
    <div className="container">
      {/* Page Header with Title and Controls */}
      <div className="page-header">
        <div className="page-title-section">
          <h2 className="page-title">Link Popular</h2>
        </div>

        <div className="header-actions">
          <SearchBar onSearch={fetchLinks} />
        </div>
      </div>

      {/* Link Creation Form */}
      <LinkForm onSubmit={createLink} />

      {/* Loading and Error States */}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Links Table */}
      <LinkTable links={links} onDelete={deleteLink} />

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          <span>Showing</span>
          <select defaultValue="7">
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span>of {links.length}</span>
        </div>

        <div className="pagination-controls">
          <button disabled>Prev</button>
          <button className="page-number active">1</button>
          <button className="page-number">2</button>
          <button className="page-number">3</button>
          <button className="page-number">4</button>
          <button className="page-number">5</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;