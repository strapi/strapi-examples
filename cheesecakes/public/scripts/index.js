var $ = jQuery;

$(document).ready(() => {
  const request = (params = '') => {
    $('.products').html('');

    $.ajax({
      url: `/cake?${params}`,
      method: 'GET',
      success: (data) => {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          const col = 4;

          const first = (i % col === 0) ? 'first' : '';
          const last = (i % col === col - 1) ? 'last' : '';

          const dom = `<li class="entry product publish author-hwijaya has-excerpt post-37 has-post-thumbnail product_cat-clothing product_cat-t-shirts  instock shipping-taxable purchasable product-type-simple ${first} ${last}">
          <a href="${item.link}" class="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img src="${item.picture}" class="attachment-shop_catalog size-shop_catalog wp-post-image" alt=""/><h2 class="woocommerce-loop-product__title">${item.name}</h2>
          <span class="price"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>${item.price}</span></span>
          </a></li>`

          $('.products').append(dom);
        }

        $('.woocommerce-result-count-show').html(data.length);
      },
      catch: (err) => {
        console.log(err);
      }
    });
  }

  $('.orderby').on('change', function (e) {
    const value = $(this).val();
    request(value);
  });

  request($('.orderby').val());
});
