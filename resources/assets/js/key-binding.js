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

// Add binding to display an alert
bindings.add('displayAlert', new Combo(Key.A, Key.SHIFT));

// Register display alert behavior using inferred name/eventType notation
bindings.registerHandler(displayAlert);
/**
 *  If you want to use a specific eventType (default is 'keydown'):
bindings.registerHandler('keyup', displayAlert);

 *  Or if you want to use a named function for a binding with a different name:
bindings.registerHandler('sayHello', displayAlert);

 *  Or if you want to use an anonymous function for the handler:
bindings.registerHandler('displayAlert', function() {
    alert('Hello!');
});

 *  Or if you want to specify everything at once:
bindings.registerHandler('displayAlert', 'keyup', displayAlert);

 */
function displayAlert() {
    alert('Hello!');
}