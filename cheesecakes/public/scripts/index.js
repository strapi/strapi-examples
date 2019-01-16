var $ = jQuery;

$(document).ready(() => {
  // Get url params
  const url = new URL(window.location.href);
  const page = parseInt(url.searchParams.get('page')) || 1;
  const sort = url.searchParams.get('sort') || 'id';

  const col = 3;

  // Get cake data.
  const request = (params = '') => {
    $('.products').html('');

    // Params can be:
    // _sort=id || _sort=price:asc || _sort=price:description -> To order results
    // _start=0&_limit=4 -> To get data from 0 to 4, usefull for pagination
    $.ajax({
      url: `/cakes?${params}`,
      method: 'GET',
      success: (data) => {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];

          const dom = `
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card">
                <a href="/product.html?id=${item._id}">
                  <img class="card-img-top" src="${item.picture}" alt="">
                </a>
                <div class="card-body">
                  <h4 class="card-title">
                    <a href="/product.html?id=${item._id}">${item.name}</a>
                  </h4>
                  <h5>${item.price}</h5>
                </div>
              </div>
            </div>
          `;

          $('.products').append(dom);
        }
      },
      catch: (err) => {
        console.log(err);
      }
    });
  }

  // Handle sort type.
  $('.orderby').on('change', function (e) {
    const value = $(this).val();
    window.location = `/?sort=${value}&page=${page}`;
  });

  // Auto select active sort type.
  $(`option[value="${sort}"]`).attr('selected', true);

  // Call custom route to get cake count to create pagination.
  $.ajax({
    url: `/cakes/count`,
    method: 'GET',
    success: (data) => {
      const pages = Math.ceil(data / col);

      for (let i = 1; i <= pages; i++) {
        const item = (i === page) ? `<li class="page-item active"><a class="page-link">${i}</a></li>` : `<li class="page-item"><a class="page-link" href="?sort=${sort}&page=${i}">${i}</a></li>`
        $('ul.pagination').append(item);
      }

      $('.nav-info').html(`Display cake ${(page - 1) * col + 1} to ${(page - 1) * col + col} on total of ${data} cakes`);
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

  // Call get data with parmas.
  request(`_sort=${sort}&_start=${(page - 1) * col}&_limit=${col}`);
});
