var coll = document.querySelectorAll(".my-collapsible");
coll.forEach(btn => {
  btn.addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    content.style.display = (content.style.display === "block") ? "none" : "block";
  });
});
