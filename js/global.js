// Header code
var headerObject = document.getElementsByTagName("header")[0];
var headerImages = headerObject.getElementsByClassName("header-image");

var headerMaximized = false;
maximizeHeader();

var lastScrollValue = undefined;

headerObject.addEventListener("mouseenter", maximizeHeader);

document.addEventListener("scroll", function ()
{
    var currentScrollValue = window.scrollY;
    if (lastScrollValue == undefined) lastScrollValue = currentScrollValue;

    if (currentScrollValue > lastScrollValue) minimizeHeader();
    else if (currentScrollValue < lastScrollValue) maximizeHeader();

    lastScrollValue = currentScrollValue;
})

function minimizeHeader()
{
    if (!headerMaximized) return; // Already minimized, we don't need to do it again.

    headerObject.style.height = "2.5vw";

    for (var i = 0; i < headerImages.length; i++)
    {
        var image = headerImages[i];
        image.style.borderRadius = "0.3vw";
        image.style.height = "3vw";
        image.style.marginLeft = "10vw";
        image.style.padding = "0.25vw";
        image.style.width = "3vw";
    }

    headerMaximized = false;
}
function maximizeHeader()
{
    if (headerMaximized) return; // Already maximized, we don't need to do it again.

    headerObject.style.height = "3.75vw";

    for (var i = 0; i < headerImages.length; i++)
    {
        var image = headerImages[i];
        image.style.borderRadius = "0.5vw";
        image.style.height = "5vw";
        image.style.marginLeft = "7.5vw";
        image.style.padding = "1vw";
        image.style.width = "5vw";
    }

    headerMaximized = true;
}

function animateInIntro()
{
    
}
