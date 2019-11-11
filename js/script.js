document.addEventListener('DOMContentLoaded', function() {
  // Aktivasi Sidebar Nav
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadNav();

  // Function loadNav
  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status != 200) return;

        // Muat daftar menu
        document.querySelectorAll('.topnav, .sidenav').forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap menu
        document.querySelectorAll('.topnav a, .sidenav a').forEach(function(elm) {
          elm.addEventListener('click', function(event) {
            // Tutup sidenav
            var sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            // Tampilkan halaman yang di panggil
            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open('GET', 'navbar.html', true);
    xhttp.send();
  }

  // Tampilkan page
  var page = window.location.hash.substr(1);
  if (page === '') page = 'home';
  loadPage(page);

  // Function loadPage
  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        var content = document.querySelector('#body-content');
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 400) {
          content.innerHTML = '<p>Halaman tidak di temukan</p>';
        } else {
          content.innerHTML = '<p>Ups... halaman tidak bisa di akses.</p>';
        }
      }
    };
    xhttp.open('GET', 'pages/' + page + '.html', true);
    xhttp.send();
  }
});
