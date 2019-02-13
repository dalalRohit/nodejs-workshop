$('.loader').fadeOut();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
function handleForm(e) {
    e.preventDefault();

    //Show spinner till response loads
    if ($('.main-result').has('show')) {
        $('.main-result').fadeOut();
    }
    $('.loader').fadeIn();

    //Take city entered
    var city = $('#city').val().trim();
    var unit = $('#units').val();
    console.log(city, unit);
    // alert(city);
    if (city.length === 0) {
        //do
        $('.myerror').addClass('alert alert-danger').html('Please enter city!');
        $('.loader').fadeOut();

    }
    else {
        axios.post('/data', { city: city, units: unit })
            .then((res) => {
                if ($('.myerror').has('alert')) {
                    $('.myerror').fadeOut();
                }

                //load data to DOM
                $('#res-city').html(city);
                $('#temp').html(res.data.temp);
                $('#max-temp').html(res.data.temp_max);
                $('#min-temp').html(res.data.temp_min);

                $('.main-result').addClass('show').fadeIn();
                $('.loader').fadeOut();

            })
            .catch((err) => {
                if (err.request) {
                    console.log(err.response);
                    if ($('.main-result').has('show')) {
                        $('.main-result').fadeOut();
                    }
                    $('.loader').fadeOut();
                    $('.myerror').addClass('alert alert-danger').html(`Weather result for city <i> ${city} </i> not found!`).fadeIn();
                }
                else if (err.response) {
                    console.log(err.response)
                }
                else {
                    console.log(err.message);
                }
            })
    }
}

function handleInputChange() {

}