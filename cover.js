const LOG_PREFIX = "[ani-cover] ";

let jsInitChecktimer;
let artUrl;

function checkForR18 () {
    if (document.getElementsByClassName("R18").length != 0) {
        clearInterval (jsInitChecktimer);
        setCoverArt(artUrl);
    }
}


function setCoverArt (src) {
    console.log(LOG_PREFIX + "In setCoverArt");
    let r18s = document.getElementsByClassName("R18");
    if (r18s.length != 1) {
        console.log(LOG_PREFIX + "Invalid R18 count: " + r18s.length);
        return;
    }
    console.log(LOG_PREFIX + "Injecting styles...");
    let r18 = r18s[0];
    r18.style.display = "flex";
    r18.style.justifyContent = "center";
    r18.style.alignItems = "center";
    r18.style.overflow = "hidden"

    console.log(LOG_PREFIX + "Injecting img obj...");

    let imgObj = document.createElement('img');
    imgObj.src = src;
    imgObj.style

    imgObj.style.flexShrink = "0";
    imgObj.style.minWidth = "100%";
    imgObj.style.minHeight = "100%";

    // Sanitize inserted element
    cleanImgObj = new DOMParser().parseFromString(DOMPurify.sanitize(imgObj), 'text/html').body.childNodes[0];

    r18.appendChild(cleanImgObj);
}

let url = window.location.href;
if (url.includes("animeVideo.php")) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sn = urlParams.get("sn");
    const urlGet = "https://api.gamer.com.tw/mobile_app/anime/v4/video.php?sn="+sn;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            artUrl = JSON.parse(this.responseText).data.video.cover;
            jsInitChecktimer = setInterval(checkForR18, 100);
        }
    };
    xhttp.open("GET", urlGet, true);
    xhttp.send();
}

browser.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status == "complete") {
        console.log(LOG_PREFIX+"load complete")
    }
})

// <a href="https://www.flaticon.com/free-icons/dragon" title="dragon icons">Dragon icons created by Icongeek26 - Flaticon</a>



