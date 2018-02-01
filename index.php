<!DOCTYPE html>
<html>
<?php
include('partials/header.php');
?>
<body>
<?php
include('partials/navbar.php');
?>

<div class="container">
    <div id="app" data-nav-after="<?= isset($_GET['after']) ? $_GET['after'] : 'NULL' ?>">
        <div class="search">
            <div class="logo">
                <img src="/src/img/reddit.png" alt="">
            </div>

            <div class="input col-xs-12 col-sm-12 col-md-10 col-lg-7">
                <form action="/subreddit.php">
                    <div class="input-group input-group-lg">
                        <span class="input-group-addon" id="sizing-addon1">reddit.com/r/</span>
                        <input type="text" name="reddit" class="form-control"
                               placeholder="Search your favorite Subreddit" aria-describedby="sizing-addon1">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php
include('partials/footer.php');
?>
</body>
</html>