import { skillsData } from "./constant.js";

const mainContent = document.getElementById('mainContent');
const boxes = Array.from(document.querySelectorAll('.skillpara'));

if (boxes.length > 0) {
  // Build content map
  const contentMap = new Map(
    boxes.map(box => [
      box,
      skillsData[box.getAttribute('data-content')]
    ])
  );

  const showContent = ({ target }) => {
    mainContent.innerHTML = contentMap.get(target);
    mainContent.classList.add('active');
  };

  const hideContent = () => {
    mainContent.classList.remove('active');
  };

  const container = boxes[0].parentElement;

  container.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('skillpara')) {
      showContent(e);
    }
  });

  container.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('skillpara')) {
      hideContent();
    }
  });
}
