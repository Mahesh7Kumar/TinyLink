const LinkModel = require('../models/linkModel');
const { validateUrl } = require('../utils/urlValidator');
const { generateCode, isValidCodeFormat } = require('../utils/codeGenerator');

// Create new short link
exports.createLink = async (req, res) => {
  try {
    const { url, code } = req.body;

    // Validate URL
    const urlValidation = validateUrl(url);
    if (!urlValidation.valid) {
      return res.status(400).json({ 
        success: false,
        error: urlValidation.error 
      });
    }

    let shortCode = code?.trim();

    // Handle custom code
    if (shortCode) {
      if (!isValidCodeFormat(shortCode)) {
        return res.status(400).json({ 
          success: false,
          error: 'Code must be 6-8 alphanumeric characters' 
        });
      }

      const exists = await LinkModel.codeExists(shortCode);
      if (exists) {
        return res.status(409).json({ 
          success: false,
          error: 'This code is already taken. Please try another.' 
        });
      }
    } else {
      // Generate unique code
      let attempts = 0;
      do {
        shortCode = generateCode(6);
        attempts++;
        if (attempts > 10) {
          throw new Error('Unable to generate unique code');
        }
      } while (await LinkModel.codeExists(shortCode));
    }

    // Create link
    await LinkModel.create(shortCode, urlValidation.url);
    const link = await LinkModel.findByCode(shortCode);

    res.status(201).json({
      success: true,
      data: {
        code: link.code,
        targetUrl: link.target_url,
        shortUrl: `${process.env.BASE_URL}/${link.code}`,
        clicks: link.clicks,
        createdAt: link.created_at
      }
    });

  } catch (error) {
    console.error('Create link error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create link' 
    });
  }
};

// Get all links
exports.getAllLinks = async (req, res) => {
  try {
    const { search } = req.query;
    
    let links;
    if (search) {
      links = await LinkModel.search(search);
    } else {
      links = await LinkModel.findAll();
    }

    const formatted = links.map(link => ({
      code: link.code,
      targetUrl: link.target_url,
      shortUrl: `${process.env.BASE_URL}/${link.code}`,
      clicks: link.clicks,
      lastClicked: link.last_clicked,
      createdAt: link.created_at
    }));

    res.json({ success: true, data: formatted });

  } catch (error) {
    console.error('Get links error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch links' 
    });
  }
};

// Get single link stats
exports.getLinkStats = async (req, res) => {
  try {
    const { code } = req.params;
    
    const link = await LinkModel.findByCode(code);
    
    if (!link) {
      return res.status(404).json({ 
        success: false,
        error: 'Link not found' 
      });
    }

    res.json({
      success: true,
      data: {
        code: link.code,
        targetUrl: link.target_url,
        shortUrl: `${process.env.BASE_URL}/${link.code}`,
        clicks: link.clicks,
        lastClicked: link.last_clicked,
        createdAt: link.created_at
      }
    });

  } catch (error) {
    console.error('Get link stats error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch link stats' 
    });
  }
};

// Delete link
exports.deleteLink = async (req, res) => {
  try {
    const { code } = req.params;
    
    const deleted = await LinkModel.delete(code);
    
    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        error: 'Link not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Link deleted successfully' 
    });

  } catch (error) {
    console.error('Delete link error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete link' 
    });
  }
};

// Handle redirect
exports.handleRedirect = async (req, res) => {
  try {
    const { code } = req.params;

    let link = await LinkModel.findByCode(code);

    if (!link) {
      return res.status(404).send("Link not found");
    }

    // Get updated record
    link = await LinkModel.incrementClicks(code);

    return res.redirect(302, link.target_url);

  } catch (error) {
    console.error("Redirect error:", error);
    return res.status(500).send("Server error");
  }
};





