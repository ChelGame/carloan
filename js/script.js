$(function() {
    $('.arrow').click(function() {
        $('.header_menu').toggleClass('l0');
    });

    $('.menu_item > a').click(function(e) {
        e.preventDefault();
        const id = $(this).attr('href');
        const top = $(id).offset().top;

        $('body,html').animate({scrollTop: top}, 800);
        $('.header_menu').toggleClass('l0');
    });

    $('.button').click(function(e) {
        e.preventDefault();
        const id = $(this).attr('name');
        const top = $(id).offset().top;

        $('body,html').animate({scrollTop: top}, 800);
        $('.header_menu').toggleClass('l0');
    });

    $("#form_submit").click(function(){
        let form = $('.approval_form');
        let error = false;

        if (!error) {
            let data = form.serialize();
            $.ajax({
                type: 'POST',
                url: 'php/handler.php',
                dataType: 'json',
                data: data,
                beforeSend: function(data) {
                    form.find('button[type="submit"]').attr('disabled', 'disabled');
                },
                success: function(data){
                    if (data['error']) {
                        $('.pop_up_error').css({'display': 'flex', 'opacity': 1} );
                        console.log(data['error']);
                    } else {
                        $('.pop_up_success').css({'display': 'flex', 'opacity': 1});
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
                    $('.pop_up_error').css({'display': 'flex', 'opacity': 1} );
                    console.log(xhr +','+ ajaxOptions +','+ thrownError);
                },
                complete: function(data) {
                    form.find('button[type="submit"]').prop('disabled', false);
                }

            });
        }
        $('input').val('');
        return false;
    });

    $(document).click(function (e){
        let a = $(".pop_up_con");

        if (
            !a.is(e.target) &&
            a.has(e.target).length === 0
        ) {
            $('.pop_up').animate({'opacity': 0}, 300, 'linear', function() {
                $('.pop_up').css({'display': 'none'});
            });
        }
    });
});
