import { useState } from "react";
import { isValidUrl, isValidCode } from "../utils/helpers";

const LinkForm = ({ onSubmit }) => {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL.");
      return;
    }

    if (code && !isValidCode(code)) {
      setError("Custom code must be 6-8 letters or digits.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await onSubmit(url, code);
      setUrl("");
      setCode("");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Custom Code (optional)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Shorten URL"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LinkForm;
