<html lang='en-US'>
    <head>
        <title>Msg u later</title>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <link rel='stylesheet' href='./assets/css/main.css'>
    </head>
    <body>
        <header>
            <h1>✉️ Msg u later: scheduled messaging</h1>
            <div>
                <?php 
                    session_start();
                    if(!isset($_SESSION['user'])): 
                ?>
                <button id="login">Log In</button>
                <button id="register">Sign Up</button>
                <?php else: ?>
                <div><?php echo $_SESSION['user'] ?></div>
                <button id='signout'>Sign Out</button>
                <?php endif; ?>
            </div>
        </header>
        <main>
            <p>Sometimes a message shouldn't be sent now, for various reasons: it should be sent later, or when you can't be reached.
            </p>
            <p>
            This is a program that will facilitate this for you.
            </p>
        </main>
        <footer>
            <div>&copy; 2023 by Derrick. All rights reserved.</div>
        </footer>
        <script src='./assets/js/main.js'></script>
    </body>
</html>