/*
|--------------------------------------------------------------------------
| Application JS
|--------------------------------------------------------------------------
|
| Authors: Kamarool Karim
| Email: kamarool@coolcode.my
| Date Created: 28 December 2016
|
 */

// -------------------------------------------- Mac OSX Dock (Credit to: Tomomi Imura) ------------------------------------- //

function addPrevClass(e) {
    var target = e.target;
    if (target.getAttribute('src')) {
        var li = target.parentNode.parentNode;
        var prevLi = li.previousElementSibling;
        if (prevLi) {
            prevLi.className = 'prev';
        }

        target.addEventListener('mouseout', function() {
            if (prevLi) {
                prevLi.removeAttribute('class');
            }
        }, false);
    }
}
if (window.addEventListener) {
    document.getElementById('dock').addEventListener('mouseover', addPrevClass, false);
}

document.getElementById('ua-string').innerHTML = navigator.userAgent;