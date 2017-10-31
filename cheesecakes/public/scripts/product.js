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
});
