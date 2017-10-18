var $ = jQuery;

$(document).ready(() => {
  const url = new URL(window.location.href);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const sort = url.searchParams.get('sort') || 'id';

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
          <a href="/product.html?id=${item._id}" class="woocommerce-LoopProduct-link woocommerce-loop-product__link"><img src="${item.picture}" class="attachment-shop_catalog size-shop_catalog wp-post-image" alt=""/><h2 class="woocommerce-loop-product__title">${item.name}</h2>
          <span class="price"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>${item.price}</span></span>
          </a></li>`

          $('.products').append(dom);
        }
      },
      catch: (err) => {
        console.log(err);
      }
    });
  }

  $('.orderby').on('change', function (e) {
    const value = $(this).val();
    window.location = `/?sort=${value}&page=${page}`;
  });

  $(`option[value="${sort}"]`).attr('selected', true);

  request(`_sort=${sort}&_start=${(page - 1) * 4}&_limit=4`);

  $.ajax({
    url: `/cake/count`,
    method: 'GET',
    success: (data) => {
      const pages = Math.ceil(data / 4);

      for (let i = 1; i <= pages; i++) {
        const item = (i === page) ? `<li><span class="page-numbers current">${i}</span></li>` : `<li><a class="page-numbers" href="?sort=${sort}&page=${i}">${i}</a></li>`
        $('ul.page-numbers').append(item);
      }

      if (page + 1 <= pages) {
        $('ul.page-numbers').append(`<li><a class="next page-numbers" href="?sort=${sort}&page=${page + 1}">→</a></li>`);
      }

      $('.woocommerce-result-count-show').html(`${(page - 1) * 4 + 1} - ${(page - 1) * 4 + 4} of ${data}`);
    },
    catch: (err) => {
      console.log(err);
    }
  });
});
