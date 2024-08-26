import "colors";
import faces from "../../../json/faces.json" assert { type: "json" };

function randomFace() {
  const random = Math.round(Math.random() * 1);
  const index = Math.round(Math.random() * 3);
  if (random === 0) {
    return faces.happy.frames[index];
  } else {
    return faces.boring.frames[index];
  }
}

export default (message) => {
  console.log(randomFace().bold, message.bold);
};
