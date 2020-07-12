$(window).on('action:ajaxify.end', function (event, dataOr) {
    if (dataOr.tpl_url === 'topic') {
        $(`.topic-note[data-tid="${$('#note-input').data("tid")}"] #note-input`).val($('#note').text());
        socket.on('note-edit', function (data) {
            $(`.topic-note[data-tid="${data.tid}"] #note-input`).val(data.content);
            $(`.topic-note[data-tid="${data.tid}"] #note`).text(data.content);
            if (parseInt($(`.topic-note`).data("tid")) === parseInt(data.tid))
            {
                app.alert({
                    type: 'success',
                    title: '<i class="fa fa-1x fa fa-pencil"></i> [[thesiscustom:add-note-success]]',
                    timeout: 3000
                });
            }
        })
        $('#note-submit').click(function () {
            socket.emit('modules.submitNote',
                {
                    tid: $('#note-input').data("tid"),
                    content: $('#note-input').val()
                }, function (err, result) {
                    if(err){
                        app.alertError('[[thesiscustom:add-note-fail]]')
                    }
                    else{
                        $('a[data-target="#note-editor"]').trigger("click");
                    }
                });
        })
    }
})