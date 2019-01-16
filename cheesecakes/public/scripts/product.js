var $ = jQuery;

$(document).ready(() => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');

  // Get single cake data and template product.html file.
  $.ajax({
    url: `/cakes/${id}`,
    method: 'GET',
    success: (data) => {
      $('.card-title').html(data.name);
      $('h4').html(`$${data.price}`);
      $('.card-text').html(data.description);
      $('.img-holder img').attr('src', data.picture);

      for (let i = 0; i < data.reviews.length; i++) {
        let review = data.reviews[i];

        $('.card-outline-secondary .card-body').prepend(`
          <p>${review.content}</p>
					<small class="text-muted">Posted by ${review.author ? review.author.username : 'Anonymous'}</small>
					<hr>
        `);
      }
    },
    catch: (err) => {
      console.log(err);
    }
  });

  // Set header infos
  $.ajax({
    url: '/info',
    method: 'GET',
    success: (data) => {
      $('.navbar-brand').html(data.name);
    }
  });

  $('.review').on('click', function (e) {
    e.preventDefault();

    if (!auth) {
      return alert('You have to be authenticated to submit a review !');
    }

    const content = prompt('Comment:');

    $.ajax({
      url: '/reviews/submit',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.jwt}`
      },
      data: {
        content,
        cake: id
      },
      success: (data) => {
        alert('Review has been submited. Waiting for approvment !');
      }
    });
  });

  // Manage authentification to submit review
  let auth = localStorage.getItem('auth');


  const clean = () => {
    $('.post-review p').remove();
    $('.card-header a.auth').remove();
    $('.card-header a.logout').removeClass('d-none');
    $('.post-review a').removeClass('d-none');
  };

  $('.logout').on('click', () => {
    localStorage.removeItem('auth');
    location.reload();
  });


  if (auth) {
    auth = JSON.parse(auth);
    clean();
  } else {
    $('.login').on('click', () => {
      const identifier = prompt('Login:');
      const password = prompt('Password:');

      $.ajax({
        url: '/auth/local',
        method: 'POST',
        data: {
          identifier,
          password
        },
        success: (data) => {
          auth = data;
          localStorage.setItem('auth', JSON.stringify(auth));
          clean();
        },
        error: (data) => {
          alert(data.responseJSON.message);
        }
      });
    });

    $('.register').on('click', () => {
      const username = prompt('Username:');
      const email = prompt('Email:');
      const password = prompt('Password:');

      $.ajax({
        url: '/auth/local/register',
        method: 'POST',
        data: {
          username,
          email,
          password
        },
        success: (data) => {
          auth = data;
          localStorage.setItem('auth', JSON.stringify(auth));
          clean();
        },
        error: (data) => {
          alert(data.responseJSON.message);
        }
      });
    });
  }
});
