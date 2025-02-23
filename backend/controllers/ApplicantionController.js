const Application = require('../models/ApplicationSchema');

exports.submitApplication = async (req, res, next) => {
    try {
        console.log("Received Form Data:", req.body);
        console.log("Received File:", req.file);

        if (!req.file) {
            console.log("No resume uploaded -- inside controller");
            return res.status(400).json({ message: "No resume uploaded" });
        }

        const {
            name: fullName, 
            email, 
            phone: phoneNumber, 
            education, 
            experience: yearsOfExperience, 
            skills, 
            prevJobTitle, 
            prevCompany: prevCompanyName, 
            prevSalary, 
            linkedIn: linkedProfile, 
            portfolio: portfolioURL
        } = req.body;

        // Validation
        if (!fullName || !email || !phoneNumber || !education || !yearsOfExperience || !skills || !prevJobTitle || !prevCompanyName || !prevSalary || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // resume file path
        const resumePath = req.file.path;

        // create new application
        const newApplication = new Application({
            fullName,
            email,
            phoneNumber,
            education,
            highestEducation: "N/A", 
            yearsOfExperience,
            skills,
            prevJobTitle,
            prevCompanyName,
            prevSalary,
            uploadResume: resumePath, 
            linkedProfile,
            portfolioURL,
        });

        try {
            const savedApplication = await newApplication.save();
            console.log("Application submitted successfully:", savedApplication);
            res.status(201).json({ message: "Application submitted successfully", savedApplication });
        } catch (error) {
            console.error("Error saving application:", error.message);
            res.status(500).json({ message: "Error saving application", error: error.message });
        }
    } catch (error) {
        console.error("Unexpected server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//get all applications for that user
exports.getAllApplications = async (req, res) => {
    const email = req.params.email; 

    console.log("Getting all applications for the user" , email)

    try {
       
        const applications = await Application.find({ email: email });

        if (!applications || applications.length === 0) {
            //return res.status(404).json({ message: "No applications found for this email" });
            return res.status(200).json({ message: "No applications found for this email" });  
        }

        res.status(200).json(applications);
    } catch (err) {
       
        res.status(500).json({ message: "Error fetching applications", error: err });
    }
};
