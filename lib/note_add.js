$(window).on('action:ajaxify.end', function (event, data) {
    if (data.tpl_url == 'topic') {
        $(`.topic-note[data-tid="${$('#note-input').data("tid")}"] #note-input`).val($('#note').text());
        socket.on('note-edit', function (data) {
            $(`.topic-note[data-tid="${data.tid}"] #note-input`).val(data.content);
            $(`.topic-note[data-tid="${data.tid}"] #note`).text(data.content);
        })
        $('#note-submit').click(function () {
            socket.emit('modules.submitNote',
                {
                    tid: $('#note-input').data("tid"),
                    content: $('#note-input').val()
                }, function (err, result) {
                    if(err){
                        app.alertError('[[pindealbee:alert-unpin-fail]]')
                    }
                    else{
                        $('a[data-target="#note-editor"]').trigger("click");
                    }
                });
        })
    }
})