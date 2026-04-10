import Resume from '../models/Resume.js';

// @desc    Get user resumes
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Public (if resume is public) or Private (if owned by user)
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if public
    if (resume.public) {
      return res.json(resume);
    }

    // If not public, must be authorized and own the resume
    if (req.user && resume.userId.toString() === req.user.id) {
      return res.json(resume);
    }

    res.status(401).json({ message: 'Not authorized to view this private resume' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req, res) => {
  try {
    const resume = new Resume({
      userId: req.user.id,
      ...req.body
    });

    const createdResume = await resume.save();
    res.status(201).json(createdResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Ensure user owns the resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Ensure user owns the resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await resume.deleteOne();
    res.json({ message: 'Resume removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
