const signoutController = (req, res) => {
  try {
    res.cookie("jwt_token", "", { maxAge: 0 });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error!" });
  }
};

export default signoutController;
