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

// Smooth URL Code
var transitioner = document.getElementById("url-transitioner");
transitioner.hidden = true;
transitioner.style.backgroundColor = "rgba(255, 255, 255, 0)";

window.addEventListener("popstate", function (event)
{
    if (event.state == undefined || event.state == null) return;
    urlTransition(event.state, false);
});

function urlTransition(url, push = true)
{
    transitioner.hidden = false;

    setTimeout(function ()
    {
        transitioner.style.backgroundColor = "rgba(255, 255, 255, 1)";
        setTimeout(function ()
        {
            const http = new XMLHttpRequest();
            http.onreadystatechange = function ()
            {
                if (http.readyState != http.DONE) return;
                if (http.status != 200)
                {
                    console.error(`Error code ${http.status} trying to load ${url}: ${http.statusText}`);
                    return;
                }

                if (push) history.pushState(document.URL, "", url);
                document.documentElement.innerHTML = http.response;

                transitioner = document.getElementById("url-transitioner");
                transitioner.hidden = false;
                transitioner.style.backgroundColor = "rgba(255, 255, 255, 1)";
                transitioner.style.transition = "all 0.5s";

                setTimeout(function ()
                {
                    transitioner.style.backgroundColor = "rgba(255, 255, 255, 0)";
                    setTimeout(function ()
                    {
                        transitioner.hidden = true;
                    }, 500);
                }, 10);
            };

            http.open("GET", url);
            http.send();
        }, 500);
    }, 10);
}
