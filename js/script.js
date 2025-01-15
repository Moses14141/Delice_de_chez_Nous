// Toggle hamburger menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}
const hamburger = document.getElementById('hamburger');





// Get the h2 element inside home-content
const homeContentH2 = document.querySelector('.home-content h2');

// Add the 'visible' class immediately to trigger the animation
window.addEventListener('DOMContentLoaded', function() {
homeContentH2.classList.add('visible'); // Add the class to trigger animation
});



hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('active');
});

// Animate Home Content on Scroll (when it becomes visible)
const homeHeading = document.querySelector('.home-content h2');
const homeContent = document.querySelector('.home-content p');
const homeSection = document.querySelector('.home-section');

function checkVisibility() {
  const rect = homeSection.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    homeHeading.classList.add('visible');
    homeContent.classList.add('visible');
  } 
}



// Add smooth scroll behavior on page load and scroll
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Smooth scroll for internal links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});











  // Select the button element
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Function to show the button when scrolling
function handleScroll() {
if (window.scrollY > 300) { // Show button after scrolling 300px
  scrollToTopBtn.style.display = "block";  // Show the button
} else {
  scrollToTopBtn.style.display = "none";  // Hide the button
}
}

// Function to hide the button when not scrolling
let scrollTimeout;
function resetScroll() {
// Hide the button after 2 seconds of inactivity
clearTimeout(scrollTimeout);
scrollTimeout = setTimeout(() => {
  scrollToTopBtn.style.display = "none"; // Hide the button
}, 2000); // 2 seconds delay after scrolling stops
}

// Add scroll event listener to show/hide button
window.addEventListener("scroll", () => {
handleScroll();
resetScroll();
});

// Scroll to top functionality
scrollToTopBtn.addEventListener("click", () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});




















// Configuration et initialisation de Firebase (uniquement une fois)
const firebaseConfig = {
  apiKey: "votre-clé-api",
  authDomain: "votre-domaine-auth",
  projectId: "votre-id-projet",
  storageBucket: "votre-bucket-storage",
  messagingSenderId: "votre-id-messaging-sender",
  appId: "votre-id-app"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Le formulaire d'avis sera lié à Firebase
const form = document.getElementById('review-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const review = document.getElementById('review').value;

  if (!rating) {
      alert('Veuillez sélectionner une note !');
      return;
  }

  // Ajouter l'avis à Firebase Firestore
  db.collection('reviews').add({
      name: name,
      rating: rating,
      review: review,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
      alert('Votre avis a été soumis !');
      form.reset(); // Réinitialise les champs du formulaire
  })
  .catch(error => {
      console.error('Erreur lors de la soumission de l\'avis : ', error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
  });
});

// Récupérer les avis depuis Firebase Firestore et les afficher
const reviewsList = document.getElementById('reviews-list');

// Fonction pour récupérer les avis depuis Firestore et les afficher
function fetchReviews() {
  // Afficher un message de chargement
  reviewsList.innerHTML = '<p>Chargement des avis...</p>';

  db.collection('reviews').orderBy('timestamp', 'desc').get()
      .then(snapshot => {
          reviewsList.innerHTML = ''; // Effacer le message de chargement
          snapshot.forEach(doc => {
              const reviewData = doc.data(); // Récupérer les données de chaque document
              const reviewElement = createReviewElement(reviewData); // Créer l'élément HTML
              reviewsList.appendChild(reviewElement); // Ajouter l'élément à la liste des avis
          });
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des avis : ', error);
          reviewsList.innerHTML = '<p>Erreur de chargement des avis. Veuillez réessayer plus tard.</p>';
      });
}

// Créer l'élément HTML pour un avis unique
function createReviewElement(data) {
  const reviewItem = document.createElement('div');
  reviewItem.classList.add('review-item'); // Ajouter une classe pour le style

  // Ajouter le contenu de l'avis
  reviewItem.innerHTML = `
      <h3>${data.name}</h3>
      <div class="rating">${getStars(data.rating)}</div>
      <p>${data.review}</p>
  `;

  return reviewItem;
}

// Générer des étoiles en fonction de la note
function getStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
      if (i < rating) {
          stars += '&#9733;'; // étoile pleine
      } else {
          stars += '&#9734;'; // étoile vide
      }
  }
  return stars;
}

// Appeler la fonction pour récupérer et afficher les avis lors du chargement de la page
window.onload = fetchReviews;
