var $ = jQuery;

$(document).ready(() => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');

  // Get single cake data and template product.html file.
  $.ajax({
    url: `/cake/${id}`,
    method: 'GET',
    success: (data) => {
      $('.entry-title').html(data.name);
      $('.amount').html(`$${data.price}`);
      $('.woocommerce-product-details__short-description p').html(data.description);
      $('.single_add_to_cart_button').attr('href', data.link);
      $('.woocommerce-product-gallery__image img').attr('src', data.picture);
      const category = (data.category) ? data.category.name : 'None';
      $('.posted_in').append(`Category: ${category}`);

      $('.woocommerce-Reviews-title').html(`${data.reviews.length} review${data.reviews.length > 0 ? 's' : ''} for ${data.name}`);

      for (let i = 0; i < data.reviews.length; i++) {
        let review = data.reviews[i];

        $('.commentlist').append(`
          <li class="comment even thread-even depth-1" id="li-comment-29">
            <div id="comment-29" class="comment_container">
              <div class="comment-text">
                <p class="meta">
                  <strong class="woocommerce-review__author" itemprop="author">${review.author ? review.author.username : 'Unknow'}</strong>
                </p>

                <div class="description">
                  <p>${review.content}</p>
                </div>
              </div>
            </div>
          </li>
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
      $('.site-title a').html(data.name);
      $('.site-description span').html(data.description);
    }
  });

  $('#commentform').on('submit', function (e) {
    e.preventDefault();

    if (!auth) {
      return $('.message-form').html('You have to be authenticated to submit a review !');
    }

    const pseudo = $('#author').val();
    const content = $('#comment').val();

    $.ajax({
      url: '/review/submit',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.jwt}`
      },
      data: {
        content,
        cake: id
      },
      success: (data) => {
        $('#comment').val('');

        $('.message-form').html('Review has been submited. Waiting for approvment !');
      }
    });
  });

  // Manage authentification to submit review
  let auth = localStorage.getItem('auth');

  if (auth) {
    auth = JSON.parse(auth);
    $('[action="auth"]').remove();
    $('#author').val(auth.user.username);
  } else {
    $('[action="login"]').on('click', () => {
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
          $('[action="auth"]').remove();
          auth = data;
          localStorage.setItem('auth', JSON.stringify(auth));
          $('#author').val(auth.user.username);
        },
        error: (data) => {
          alert(data.responseJSON.message);
        }
      });
    });

    $('[action="register"]').on('click', () => {
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
          $('[action="auth"]').remove();
          auth = data;
          localStorage.setItem('auth', JSON.stringify(auth));
          $('#author').val(auth.user.username);
        },
        error: (data) => {
          alert(data.responseJSON.message);
        }
      });
    });
  }
});
