$(document).ready(function () {
    var key = '729ff5b907f05f0869c0659b055dbbc8';
    var lang = 'en';
    var api = 'https://api.themoviedb.org/3/';
    $('#search').autocomplete({

        source: function (request, response)
        {
            $.ajax({
                url: api+'search/multi?api_key='+key+'&language='+lang+'&query='+$('#search').val(),
                dataType: "json",
                success: function (data)
                {

                    response($.map(data['results'], function (item) {

                        return {
                            label: item.original_title,
                            value: item.id
                        };

                    }));
                }

            });
        },
        select: function (event, ui) {
            $('#hiddenField').val(ui.item.value);
            this.value = ui.item.label;

            return false;
        },
        minlenght: 1,
        autoFocus: true
    });
    $('#getMovie').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: api+'movie/'+$('#hiddenField').val()+'?api_key='+key+'&language='+lang,
            dataType: "json",
            success: function (data)
            {

                $('#movie h2').html(data.title);
                if (data.release_date!=="") {
                    $('#release').html(data.release_date);
                }
                if (data.overview!==null) {
                    $('#overview').html(data.overview);
                }
                if (data.poster_path!==null) {
                    $('#poster').attr('src', 'https://image.tmdb.org/t/p/w500/'+data.poster_path);
                }
                $('#check').attr('href', 'https://www.themoviedb.org/movie/'+data.id+'/');
                $('#movie').show();

            }

        });
    });
});

