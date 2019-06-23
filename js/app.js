const displayWikiData = function(){

    const $linksElement = $('#links');
    const searchString = $("#searchString").val();
    const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ searchString +'&format=json&callback=wikiCallback';

    if (searchString.length > 0) {
      console.log(searchString);
      $('html').css('height', 'fit-content');
      $('body').css('height', 'fit-content');
      $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function(res){
          res[1].forEach(function(item){
            let url = 'https://en.wikipedia.org/wiki/' + item

              $linksElement.append('<li><a href="'+url+'">'+ item + '</a></li>');
              $('button').on('click', function(){
                $linksElement.has('li').empty();
              });
              $('input').keypress(function(e){
                if (e.which == 13) {
                  $linksElement.has('li').empty();
                  e.preventDefault();
                }
              });

          });
        }
      });
    } else {
      searchString = $("#searchString").attr('placeholder', 'Must fill in the box!').focus();
      return false;
    }

};

$('input').keypress(function(e){
  if (e.which == 13) {
    $('#form').submit(displayWikiData());
    e.preventDefault();
  }
});

$('button').click(function(){
  $('#form').submit(displayWikiData());
});
