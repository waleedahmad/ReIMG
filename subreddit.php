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
    <?php
        if(isset($_GET['reddit']) && strlen($_GET['reddit'])) {
            ?>
            <div id="app"
                 data-nav-after="<?= isset($_GET['after']) ? $_GET['after'] : 'NULL' ?>"
                 data-reddit="<?= isset($_GET['reddit']) ? $_GET['reddit'] : '' ?>">
            </div>
            <?php
        }
    ?>
</div>

<?php
include('partials/footer.php');
?>
</body>
</html>