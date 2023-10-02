export function initSignOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('token')
    document.getElementById('loggedInAs').innerHTML ='<h4 className="text-end" id="loggedInAs"><a href="login" data-navigo>Sign In&nbsp;</a><a  href="signUp" data-navigo className="mr-4">Sign Up</a></h4>'
}