let note_add = function () {
    $(`.topic-note[data-tid="${$('#note-input').data("tid")}"] #note-input`).val($('#note').data('note'));
    socket.on('note-edit', function (data) {
        console.log(data);
        $(`.topic-note[data-tid="${data.tid}"] #note-input`).val(data.content);
        $(`.topic-note[data-tid="${data.tid}"] #note`).text(data.content);
        $(`.topic-note[data-tid="${data.tid}"] #note-adder a`).text(data.usernameAddNote)
            .attr('href', `/${window.config.relative_path}user/${data.userslugAddNote}`);
        if (parseInt($(`.topic-note`).data("tid")) === parseInt(data.tid)) {
            $(`.topic-note[data-tid="${data.tid}"] #note-adder`).removeClass("hidden")
            $(`.topic-note[data-tid="${data.tid}"]`).removeClass("empty")
            app.alert({
                type: 'success',
                title: '<i class="fa fa-1x fa fa-pencil"></i> [[thesiscustom:add-note-success]]',
                timeout: 3000
            });
        }
    })
    $('#note-submit').click(function () {
        let content  = $('#note-input').val();
        let oldContent = $('#note').data('note');
        if (content!==oldContent){
            socket.emit('modules.submitNote',
                {
                    tid: $('#note-input').data("tid"),
                    content: content
                }, function (err, result) {
                    if (err) {
                        app.alertError('[[thesiscustom:add-note-fail]]')
                    } else {
                        $('a[data-target="#note-editor"]').trigger("click");
                    }
                });
        }else{
            $('a[data-target="#note-editor"]').trigger("click");
        }
    })
}

$(window).on('action:ajaxify.end', function (event, dataOr) {
    if (dataOr.tpl_url === 'topic') {
        note_add()
    }
})