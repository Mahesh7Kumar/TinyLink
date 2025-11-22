import { Link2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link2 size={32} />
          <h1>TinyLink</h1>
        </div>
        <p className="tagline">Create short, memorable links in seconds</p>
      </div>
    </header>
  );
};

export default Header;