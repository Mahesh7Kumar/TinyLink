import { useState, useEffect, useCallback } from 'react';
import { linkAPI } from '../services/api';

export const useLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLinks = useCallback(async (searchTerm = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await linkAPI.getAll(searchTerm);
      setLinks(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching links:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const createLink = async (url, code) => {
    const response = await linkAPI.create(url, code);
    await fetchLinks(); // Refresh list
    return response;
  };

  const deleteLink = async (code) => {
    await linkAPI.delete(code);
    await fetchLinks(); // Refresh list
  };

  return {
    links,
    loading,
    error,
    fetchLinks,
    createLink,
    deleteLink
  };
};