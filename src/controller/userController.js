import User from  "../model/UserModel.js"


const getHomePage = async (req, res) => {
    try {
        res.status(200).render("index", {
            title:"Home Page",
        })
    } catch (error) {
     console.error("Error rendering homepage:", error.message);
     res.status(500).error("error", {
        title: "Error",
        message: "Something went wrong while rendering the homepage."
     })   
    }
}

module.exports = {
    getHomePage
}