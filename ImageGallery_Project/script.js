// Images list. Change these to your own photos if you want.
// (put them in an "images" folder and use "images/photo1.jpg" as src)
const images = [
  { src: "https://picsum.photos/id/10/1200/800",   title: "Forest path",      category: "nature" },
  { src: "https://picsum.photos/id/1015/1200/800", title: "River valley",     category: "nature" },
  { src: "https://picsum.photos/id/1018/1200/800", title: "Mountain view",    category: "nature" },
  { src: "https://picsum.photos/id/1039/1200/800", title: "Waterfall",        category: "nature" },
  { src: "https://picsum.photos/id/237/1200/800",  title: "Black puppy",      category: "animals" },
  { src: "https://picsum.photos/id/1025/1200/800", title: "Pug",              category: "animals" },
  { src: "https://picsum.photos/id/1074/1200/800", title: "Lion",             category: "animals" },
  { src: "https://picsum.photos/id/1084/1200/800", title: "Fox in the grass", category: "animals" },
  { src: "https://picsum.photos/id/1031/1200/800", title: "Old street",       category: "places" },
  { src: "https://picsum.photos/id/1048/1200/800", title: "City lights",      category: "places" },
  { src: "https://picsum.photos/id/164/1200/800",  title: "Quiet town",       category: "places" },
  { src: "https://picsum.photos/id/1067/1200/800", title: "Harbour",          category: "places" }
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const caption = document.getElementById("caption");
const filterBtns = document.querySelectorAll(".filter-btn");

let visible = [];   // images currently shown (after filter)
let current = 0;    // index inside "visible"

// build the gallery
function buildGallery() {
  images.forEach((img, i) => {
    const div = document.createElement("div");
    div.className = "item";
    div.dataset.category = img.category;
    div.dataset.index = i;
    div.innerHTML = `
      <img src="${img.src.replace("/1200/800", "/600/400")}" alt="${img.title}" loading="lazy">
      <div class="title">${img.title}</div>
    `;
    div.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(div);
  });
  visible = images.slice();
}

// filter by category
function filterGallery(category) {
  const items = document.querySelectorAll(".item");

  items.forEach(item => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
      // small delay so the transition actually plays
      setTimeout(() => item.classList.remove("hide"), 10);
    } else {
      item.classList.add("hide");
      setTimeout(() => {
        if (item.classList.contains("hide")) item.style.display = "none";
      }, 400);
    }
  });

  visible = images.filter(img => category === "all" || img.category === category);
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterGallery(btn.dataset.filter);
  });
});

// lightbox
function showImage() {
  const img = visible[current];
  lightboxImg.classList.add("fade");
  setTimeout(() => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.title;
    caption.textContent = `${img.title} (${current + 1} of ${visible.length})`;
    lightboxImg.classList.remove("fade");
  }, 200);
}

function openLightbox(indexInAll) {
  // find the clicked image inside the filtered list
  current = visible.indexOf(images[indexInAll]);
  lightbox.classList.add("open");
  showImage();
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

function nextImage() {
  current = (current + 1) % visible.length;
  showImage();
}

function prevImage() {
  current = (current - 1 + visible.length) % visible.length;
  showImage();
}

document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("prevBtn").addEventListener("click", prevImage);
document.getElementById("closeBtn").addEventListener("click", closeLightbox);

// click on the dark area to close
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

// keyboard
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeLightbox();
});

buildGallery();
