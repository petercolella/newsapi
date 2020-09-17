$(document).ready(function () {
  function renderResponse(response) {
    var news = response.news;
    if (news.length) {
      for (var i = 0; i < news.length; i++) {
        var li = $('<li class="list-group-item">');
        var a = $('<a>' + news[i].title + '</a>');
        a.attr('href', news[i].url);
        a.attr('target', '_blank');
        li.append(a);
        $('.list-group').append(li);
      }
    } else {
      $('.list-group').append(
        $('<li class="list-group-item">No results to display</li>')
      );
    }
  }
  function runSearch(searchTerm) {
    var now = new Date();
    var oneYearAgo = now.setFullYear(now.getFullYear() - 1);
    oneYearAgo = new Date(oneYearAgo).toISOString().split('.')[0];

    var apiKey = 'QIuBjFev0Nyb8VP-CwAwvfWQ7EGV7eS-yM9n3GaFqTurugmq';

    var url =
      'https://api.currentsapi.services/v1/search?language=en&type=2&apiKey=' +
      apiKey +
      '&keywords=' +
      searchTerm +
      '&start_date=' +
      oneYearAgo;

    console.log('url:', url);

    $.ajax({
      url: url,
      method: 'GET'
    }).then(function (res) {
      console.log(res);
      $('#loading-span').addClass('d-none');
      $('.spinner-border').addClass('d-none');
      $('#search-span').text('Search');
      renderResponse(res);
    });
  }

  $('#search-button').on('click', function () {
    runSearch($('#search').val());
    $('#search').val('');
    $('.list-group').empty();
    $('#loading-span').removeClass('d-none');
    $('.spinner-border').removeClass('d-none');
    $('#search-span').text('Loading...');
  });
});
