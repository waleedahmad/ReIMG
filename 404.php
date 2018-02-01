<!DOCTYPE html>
<html>
<?php
include('partials/header.php');
?>
<body>
<?php
include('partials/navbar.php')
?>
<div class="container">
    <div id="app" data-nav-after="<?=isset($_GET['after']) ? $_GET['after'] : 'NULL' ?>">
        <div class="not-found">
            <div class="logo">
                <img src="/src/img/error-404.png" alt="">
            </div>

            <div class="title">
                <h2>
                    Subreddit <b><?= isset($_GET['reddit']) ? $_GET['reddit'] : '' ?></b>  Not Found
                </h2>
            </div>
        </div>
    </div>
</div>

<?php
include('partials/footer.php');
?>
</body>
</html>