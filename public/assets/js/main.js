//Get the button:
var mybutton = document.getElementById("backtop");
var scroll = document.getElementsByClassName("content")
// var linemenu = document.getElementById("menu");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
    // scrollmenu()
    // if ($(window).width() > 769) {
    //
    // }
};

$(scroll).scroll(function() {
    if ($(scroll).scrollTop() > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
});
function scrollFunction() {

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrollmenu() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        linemenu.classList.remove("invisible")

    } else {
        linemenu.classList.add("invisible")
    }
}

// When the user clicks on the button, scroll to the top of the document
function backtotop() {
    $('.content').animate({scrollTop:0}, '300');
}

// mute-video-toggle
var x = $("#myVideo, #myVideo-mb");
x.prop("autoplay", true);

function changeMuteStatus() {
    var isMuted = x.prop("muted");
    var icon = $('.btn-mute');
    if (isMuted) {
        x.prop("muted", false);
        icon.addClass('fa-volume-up');
        icon.removeClass('fa-volume-mute');
    } else {
        x.prop("muted", true);
        icon.addClass('fa-volume-mute');
        icon.removeClass('fa-volume-up');
    }
}

changeMuteStatus();
$('.intro .btn-vol').on('click', changeMuteStatus);


// youtube video autoplay
$(document).ready(function(){
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var url = $("#intro").attr('src');

    /* Remove iframe src attribute on page load to
    prevent autoplay in background */
    $("#intro").attr('src', '');

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed */
    $("#intro-vid").on('shown.bs.modal', function(){
        $("#intro").attr('src', url);
    });

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#intro-vid").on('hide.bs.modal', function(){
        $("#intro").attr('src', '');
    });
});

//active-link
jQuery(function ($) {
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $('.tag-bg .nav-pills .nav-link').each(function () {
        if (this.href === path) {
            $(this).addClass('active');
        }
    });
});

// slider
$(document).ready(function () {
    $('.responsive').slick({
        // dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1000,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 8,
                slidesToScroll: 1,
                // centerMode: true,

            }
        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                infinite: true,

            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                infinite: true,

            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        }, {
            breakpoint: 320,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        }]
    });
    $('.game-slide').slick({
        // dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                // centerMode: true,

            }
        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,

            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,

            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        }, {
            breakpoint: 320,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        }]
    });
});

//click to copy
function clickcopy(text) {
    /* Get the text field */
    var copyText = document.getElementById(text);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}

// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//     return new bootstrap.Tooltip(tooltipTriggerEl)
// })
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})

// $('[data-go-to-target]').click((e) => {
//     console.log(e.);
//     setTimeout(() => {
//         window.location.href='#selling';
//     }, 500)
// })

// var myOffcanvas = document.getElementById('menu')
// myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
//     var childs = myOffcanvas.childNodes;
//     console.log('childs',childs);
//     console.log(12121)
//     menuRedirect()
// })
// async function menuRedirect(href){
//     var myOffcanvas = document.getElementById('menu')
//     var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
//     await bsOffcanvas.hide()
//     $('#menu').removeClass('show')
//     $('.offcanvas-backdrop').remove()
// }

// Set the date we're counting down to
var countDownDate = new Date("July 5, 2023").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("date-countdown").innerHTML = days + " : " + hours + " : "
    + minutes + " : " + seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
