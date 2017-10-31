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
                  <strong class="woocommerce-review__author" itemprop="author">${review.pseudo}</strong>
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

    const pseudo = $('#author').val();
    const content = $('#comment').val();

    $.ajax({
      url: '/review',
      method: 'POST',
      data: {
        pseudo,
        content,
        cake: id
      },
      success: (data) => {
        $('#author').val('');
        $('#comment').val('');

        $('.message-form').html('Review have been submited. Waiting for approuvment !');
      }
    });
  });
});
