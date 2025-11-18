export const invalidRouteHandler = (_request, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
};
