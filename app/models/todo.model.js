module.exports = (mongoose) => {
  const Todo = mongoose.model(
    "todo",
    mongoose.Schema(
      {
        title: String,
        status: Boolean
      },
      { timestamps: true }
    )
  );

  return Todo;
};
