let $app = $('#app'),
    nav_after_id = $($app).attr('data-nav-after'),
    reddit = $($app).attr('data-reddit'),
    req_params = (nav_after_id !== 'NULL') ? '?after='+nav_after_id : '',
    count = -1,
    post_template = '',
    nav_template = '';

$.get('/partials/post.html', function(template) {
    post_template = template;
});

$.get('/partials/navigation.html', function(template) {
    nav_template = template;
});

if(reddit !== undefined && reddit.length !== 0){
    $.getJSON('https://www.reddit.com/r/'+ reddit + '.json'+ req_params, function(response) {
        $.each(response.data.children, function(i, item) {
            if (item.kind === 't3') {
                if (isImage(item.data.url)) {
                    renderImage(item.data.title, item.data.url, item.data.id);
                } else {
                    if (item.data.domain === 'imgur.com') {
                        renderImageOrAlbum(item);
                    }
                }
            }
        });
        renderNavigation(response.data.after);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        window.location = '/404.php?reddit='+ reddit;
    });
}

function renameListener(e){
    let id = $(this).attr('data-id');
    $(".post-name[data-id='" + id +"']").val(this.value);
}

function renderNavigation(after_id){
    let $nav = Mustache.render(nav_template, {
        after_id : after_id,
        reddit: reddit
    });
    $($app).after($nav);
}

function renderImage(title,url,id) {
    $post = Mustache.render(post_template, {
        title : title,
        url : url,
        id : id,
        save_enable : showSaveOption(window.location.hostname)
    });
    $.when($($app).append($post)).then(function(){
        ++count;
        $('.post-name').eq(count).on('keyup', renameListener);
        $('.save-nsfw').eq(count).on('click', saveImage);
        $('.save-safe').eq(count).on('click', saveImage);
    });
}

function saveImage(e){
    let type = $(this).attr('data-type'),
        $post = $(this).parents('.post'),
        name = $.trim($($post).find('.post-name').val()),
        url = $($post).find('.image-uri').attr('src');

    $.ajax({
        type : 'POST',
        url : '/save.php',
        data : {
            type : type,
            name : name,
            url : url
        },
        success : function(res){
            if(JSON.parse(res) === true){
                $($post).remove();
            }else{
                $(this).on('click', saveImage);
                alert('Unable to save image');
            }
        }.bind(this)
    })
}

function renderImageOrAlbum(item) {

    let albumID = stripAlumbId(item.data.url),
        type = item.data.url.indexOf('/a/') !== -1 ? 'album' : 'image',
        albumAPI = "https://api.imgur.com/3/"+type+"/" + albumID + "/images";

    $.ajax({
        url: albumAPI,
        headers: {
            'Authorization': 'Client-ID fc6952f445a03f3'
        },
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if(response.data.length){
                $.each(response.data, function(i, res){
                    renderImage(item.data.title, res.link, item.data.id);
                });
            }else{
                renderImage(item.data.title, response.data.link, item.data.id)
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function isImage(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
}

function stripAlumbId(url) {
    return /[^/]*$/.exec(url)[0];
}

function showSaveOption(host){
    const hosts = ['127.0.0.1', 'localhost'];
    return hosts.indexOf(host) !== -1;
}