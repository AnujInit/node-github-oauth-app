const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get('token');

// Show an element
const show = (selector) => {
  document.querySelector(selector).style.display = 'block';
};

// Hide an element
const hide = (selector) => {
  document.querySelector(selector).style.display = 'none';
};

//console.log(TOKEN);
if (TOKEN) {
  hide('#logIn');
  show('#loggedIn');
} else {
  hide('#loggedIn');
  show('#logIn');
}
