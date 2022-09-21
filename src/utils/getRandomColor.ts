const colors = Array(
  "dark",
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "green",
  "lime",
  "yellow",
  "orange",
  "teal"
);

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
