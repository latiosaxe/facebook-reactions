var ExtraPoints = 0;
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
        testAPI();
    } else {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '151133782112742',
        cookie     : true,  // enable cookies to allow the server to access
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    // console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        // console.log('Successful login for: ' + response.name);
        // document.getElementById('status').innerHTML =
        //     'Thanks for logging in, ' + response.name + '!';
    });

    callReactios();

    var call = setInterval(function () {
        callReactios();
    }, 5000);
}

$("#extraPoints").blur(function () {
    ExtraPoints = parseInt($(this).val());
    console.log(ExtraPoints);
});

function addExtraPoints() {
    ExtraPoints = parseInt($("#extraPoints").val());
    console.log(ExtraPoints);
}

function callReactios(){
    FB.api(
        "10154726948770983?fields=     reactions.type(LIKE).summary(total_count).limit(0).as(like),     reactions.type(LOVE).summary(total_count).limit(0).as(love),     reactions.type(WOW).summary(total_count).limit(0).as(wow),     reactions.type(HAHA).summary(total_count).limit(0).as(haha),     reactions.type(SAD).summary(total_count).limit(0).as(sad),     reactions.type(ANGRY).summary(total_count).limit(0).as(angry)",
        function (response) {
            console.log(response, ExtraPoints);
            if (response && !response.error) {
                $("#likesCount").html('Likes <strong>'+ (response.like.summary.total_count + ExtraPoints) +'</strong>')
            }
        }
    );
}