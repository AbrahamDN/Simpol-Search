const displayWikiData = function(){

  $("button").click(function(){
    const $linksElement = $('#links');
    const searchString = $("#searchString").val();
    const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ searchString +'&format=json&callback=wikiCallback';

    if (searchString.length > 0) {
      console.log(searchString);
      $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function(res){
          res[1].forEach(function(item){
            let url = 'https://en.wikipedia.org/wiki/' + item;
            $linksElement.append('<li><a href="'+url+'">'+ item + '</a></li>');
          });
        }
      });
    } else {
      searchString = $("#searchString").attr('placeholder', 'Must fill in the box!').focus();
      return false;
    }

    });
};

$('#form').submit(displayWikiData());
