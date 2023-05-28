export function checkStatusColor(id: number) {
  switch (id) {
    case 1: {
      return "blue";
    }
    case 2: {
      return "teal";
    }
    case 3: {
      return "red";
    }
    case 4: {
      return "orange";
    }
    default: {
      return "blue";
    }
  }
}
