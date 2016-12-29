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

/*if (window.addEventListener) {
    document.getElementById('dock').addEventListener('mouseover', addPrevClass, false);
}

document.getElementById('ua-string').innerHTML = navigator.userAgent;*/

// -------------------------------------------- Interact JS ------------------------------------- //

interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "content",
            endOnly: true,
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function(event) {
            var textEl = event.target.querySelector('p');

            textEl && (textEl.textContent = 'moved a distance of ' + (Math.sqrt(event.dx * event.dx +
                    event.dy * event.dy) | 0) + 'px');
        }
    });

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
