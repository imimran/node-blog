//error function
export default (error, req, res, next) => {
    res.status(500).json({ message: "Server error" });
    console.log(error.message);
    next(error);
  };