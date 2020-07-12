$(window).on('action:ajaxify.end', function (event, data) {
    if (data.tpl_url === 'topic') {
        socket.on('topic-locked', function (dataSocket) {
            if(dataSocket.topic.tid === parseInt($(`.topic-note`).data("tid"))){
                $('button.composer-discard').trigger('click');
                location.reload();
            }
        })
    }
})