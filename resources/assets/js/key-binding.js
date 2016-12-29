/*
|--------------------------------------------------------------------------
| Key Binding
|--------------------------------------------------------------------------
|
| Authors: Kamarool Karim
| Email: kamarool@coolcode.my
| Date Created: 28 December 2016
|
*/

window.Bindings = Keys.Bindings;
window.Combo = Keys.Combo;
window.Key = Keys.Key;

// Initialize application-wide bindings manager
window.bindings = new Bindings();

// Add a binding to toggle the page background color
bindings.add('toggleBackground', new Combo(Key.B, Key.CTRL));

/**
 * Register background color toggle behavior
 * Toggles always fire on 'keydown'
 */
bindings.registerToggle('toggleBackground', toggleBlack, toggleWhite);
function toggleBlack() {
    $('body').css('background-color', 'black');
    $('h1').css('color', 'white');
}
function toggleWhite() {
    $('body').css('background-color', 'white');
    $('h1').css('color', 'black');
}